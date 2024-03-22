import { body, param } from "express-validator";

export default (method: string) => {
  switch (method) {
    case "emailPassword": {
      return [
        body("name").optional(),
        body("email")
          .exists()
          .withMessage("Email is required")
          .isEmail()
          .withMessage("Invalid email"),
        body("password")
          .exists()
          .withMessage("Password is required")
          .isLength({ min: 6 })
          .withMessage("Invalid password"),
      ];
    }
    case "id": {
      return [
        param("id")
          .exists()
          .withMessage("id is required in url")
      ];
    }
    case "product": {
      return [
        body("description").optional(),
        body("name").exists().withMessage("name is required"),
        body("price")
          .exists()
          .withMessage("price is required")
          .isInt()
          .withMessage("Price must be interger"),
      ];
    }
    default:
      return [];
  }
};

import { Request, Response } from "express";
import { Product } from "../models/product";
import { ErrorResponse, SuccessResponse } from "../utils/responses";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return SuccessResponse(res, 201, "product created sucessfully", product);
  } catch (error) {
    return ErrorResponse(res, 400, "create failed", error);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return ErrorResponse(res, 404, "product not found", null);
    }
    return SuccessResponse(res, 200, "product retrieved", product);
  } catch (error) {
    return ErrorResponse(res, 500, "could not retrieve product", error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return ErrorResponse(res, 404, "product not found", null);
    }
    return SuccessResponse(res, 200, "product updated", product);
  } catch (error) {
    return ErrorResponse(res, 500, "update failed", error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return ErrorResponse(res, 404, "product not found", null);
    }
    return SuccessResponse(res, 200, "product deleted", product);
  } catch (error) {
    return ErrorResponse(res, 500, "could not delete product", error);
  }
};

export const listAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    return SuccessResponse(res, 200, "products retrieved", products);
  } catch (error) {
    return ErrorResponse(res, 500, "could not retrieve products", error);
  }
};

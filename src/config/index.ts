import dotenv from "dotenv";
import Joi from "joi";


type configTypes = {
    NODE_ENV: string;
    PORT: number;
    MONGO_URI: string;
    JWT_SECRET: string;
};

const configSchema = {
  NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
  PORT: Joi.number().default(3000),
  MONGO_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
};


dotenv.config();

const Validator = (schema: any) => Joi.object().keys(schema).unknown().required();
const envVars = Validator(configSchema);

const { error, value: env } = envVars.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config: configTypes = {
  NODE_ENV: env.NODE_ENV,
  PORT: env.PORT,
  MONGO_URI: env.MONGO_URI,
  JWT_SECRET: env.JWT_SECRET,
};

export default config;

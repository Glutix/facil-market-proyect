import User from "./models/User";
import Review from "./models/Review";
import Category from "./models/Category";
import Product from "./models/Product";
import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
  throw new Error("Falta alguna variable de entorno requerida");
}

const database = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
  models: [User, Product, Category, Review],
  logging: false,
  native: false,
});

export default database;

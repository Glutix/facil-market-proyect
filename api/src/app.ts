import express from "express";
import log from "./Middleware/log";
import cors from "cors";
import morgan from "morgan";

import user from "./routes/users.routes";
import product from "./routes/products.routes";
import auth from "./routes/auth.routes";
import paymentRouter from "./routes/payments.routes";
import category from "./routes/category.routes";
import review from "./routes/review.routes";
const server = express();

//! Middlewares
server.use(express.json());
server.use(morgan("dev"));
server.use(cors());
server.use(log);

//! rutas
server.use("/user", user);
server.use("/product", product);
server.use("/auth", auth);
server.use("/payment", paymentRouter);
server.use("/category", category);
server.use("/review", review);


export default server;

import postOrder from "../handlers/payments/postOrder";
import receivedWebhook from "../handlers/payments/webhook";

import { Router } from "express";
const paymentRouter = Router();

//! routes Create
paymentRouter.post("/order", postOrder);
paymentRouter.post("/webhook", receivedWebhook);

//! routes Read
paymentRouter.get("/success", (req, res) => res.send("success"));
paymentRouter.get("/failure", (req, res) => res.send("failure"));
paymentRouter.get("/pending", (req, res) => res.send("pending"));

//! routes Update

//! routes Delete
paymentRouter.post("/payment", postOrder);
paymentRouter.post("/payment/webhook", receivedWebhook);
paymentRouter.get("/payment/success", (req, res) => res.send("success"));
paymentRouter.get("/payment/failure", (req, res) => res.send("failure"));
paymentRouter.get("/payment/pending", (req, res) => res.send("pending"));

export default paymentRouter;

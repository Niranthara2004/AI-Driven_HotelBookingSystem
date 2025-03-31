import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import connectDB from "./infrastructure/db";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import bookingsRouter from "./api/booking";
import hotelsRouter from "./api/hotel";
import globalErrorHandlingMiddleware from "./api/middlewares/global-error-handling-middleware";
import { handleWebhook } from "./application/payment";
import bodyParser from "body-parser";
import paymentsRouter from "./api/payment";

const app = express();

app.use(clerkMiddleware());
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.post(
  "/api/stripe/webhook",
  bodyParser.raw({ type: "application/json" }),
  handleWebhook
);

app.use(express.json());

app.use("/api/hotels", hotelsRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/payments", paymentsRouter);

app.use((req: Request, res: Response) => {
  console.log(`Unhandled request: ${req.method} ${req.url}`);
  res.status(404).json({ error: "Route not found" });
});

app.use(globalErrorHandlingMiddleware);

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to start server due to DB connection error:", err);
    process.exit(1);
  });
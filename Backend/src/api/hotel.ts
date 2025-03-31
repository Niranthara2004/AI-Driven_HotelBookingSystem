import express, { Request, Response, NextFunction } from "express";
import {
  createHotel,
  deleteHotel,
  generateResponse,
  getAllHotels,
  getHotelById,
  updateHotel,
} from "./../application/hotel";
import { isAuthenticated } from "./middlewares/authentication-middleware";
import { isAdmin } from "./middlewares/authorization-middleware";
import { createEmbeddings } from "../application/embedding";
import { retrieve } from "../application/retrieve";

const hotelsRouter = express.Router();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

hotelsRouter.route("/create").post(isAuthenticated, isAdmin, asyncHandler(createHotel));

hotelsRouter.route("/:id([0-9a-fA-F]{24})")
  .get(asyncHandler(getHotelById))
  .put(isAuthenticated, isAdmin, asyncHandler(updateHotel))
  .delete(isAuthenticated, isAdmin, asyncHandler(deleteHotel));

hotelsRouter.route("/")
  .get(asyncHandler(getAllHotels));

hotelsRouter.route("/embeddings/create").post(asyncHandler(createEmbeddings));
hotelsRouter.route("/search/retrieve").get(asyncHandler(retrieve));
hotelsRouter.route("/generate").post(asyncHandler(generateResponse));

export default hotelsRouter;
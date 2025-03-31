import { Request, Response, NextFunction } from "express";
import Hotel from "../infrastructure/schemas/Hotel";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import { CreateHotelDTO } from "../domain/dtos/hotel";
import mongoose from "mongoose";
import OpenAI from "openai";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllHotels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const getHotelById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hotelId = req.params.id;

    // Validate that hotelId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      throw new NotFoundError("Invalid hotel ID");
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }

    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const createHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotel = CreateHotelDTO.safeParse(req.body);
    // Validate the request data

    if (!hotel.success) {
      throw new ValidationError(hotel.error.message);
    }

    // Add the hotel
    await Hotel.create({
      name: hotel.data.name,
      location: hotel.data.location,
      image: hotel.data.image,
      price: hotel.data.price,
      description: hotel.data.description,
    });

    // Return the response
    res.status(201).send();
    return;
  } catch (error) {
    next(error);
  }
};
export const updateHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hotelId = req.params.id;
    const updatedHotel = req.body;

    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      throw new NotFoundError("Invalid hotel ID");
    }

    if (
      !updatedHotel.name ||
      !updatedHotel.location ||
      !updatedHotel.image ||
      !updatedHotel.price ||
      !updatedHotel.description
    ) {
      throw new ValidationError("Invalid hotel data");
    }

    const hotel = await Hotel.findByIdAndUpdate(hotelId, updatedHotel, { new: true });
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }

    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hotelId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      throw new NotFoundError("Invalid hotel ID");
    }

    const hotel = await Hotel.findByIdAndDelete(hotelId);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }

    res.status(200).json({ message: "Hotel deleted" });
  } catch (error) {
    next(error);
  }
};

export const generateResponse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { prompt } = req.body;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      store: true,
    });

    res.status(200).json({
      message: {
        role: "assistant",
        content: completion.choices[0].message.content,
      },
    });
  } catch (error) {
    next(error);
  }
};
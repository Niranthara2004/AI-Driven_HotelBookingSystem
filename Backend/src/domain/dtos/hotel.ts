import { z } from "zod"

// DTO means Domain Transfer Object
// Change price to number to match the MongoDB schema
export const CreateHotelDTO = z.object({
    name: z.string(),
    location: z.string(),
    image: z.string(),
    price: z.number(), // Changed from string to number
    description: z.string()
});
import { z } from "zod";

export const Position = z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
})

export const NewWishSchema = z.object({
    link: z.string().url().optional(),
    photo: z.string().url().optional(),
    description: z.string().optional(),
    location: Position.optional(),
})

export const WishSchema = z.object({
    checked: z.boolean(),
    link: z.string().url().optional(),
    photo: z.string().url().optional(),
    description: z.string().optional(),
    location: Position.optional(),
})
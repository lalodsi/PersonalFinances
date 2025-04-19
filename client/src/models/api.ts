import { z } from "zod";

export const serverResponseSchema = z.object({
    message: z.string()
})

export type ServerResponse = z.infer<typeof serverResponseSchema>
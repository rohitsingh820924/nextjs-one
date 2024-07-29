import { z } from "zod";

export const todoSchema = z.object({
    content: z.string()
    .min(10, "content must be atleast 10 characters")
    .max(300, "content must be no longer then 300 characters")

})
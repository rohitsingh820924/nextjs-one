import { z } from "zod";

export const acceptTodo = z.object({
    acceptTodos: z.boolean()

})
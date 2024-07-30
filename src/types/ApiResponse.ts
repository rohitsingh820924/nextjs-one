import {Todo} from "@/model/User"

export interface ApiResponse {
    success: boolean;
    todos: string;
    isAcceptingTodos?: boolean;
    todo?:Array<Todo>
}
import { AppError } from "./AppError";

export class UnathorizedError extends AppError {
    constructor (message = "Unathorized") {
        super(message, 401);
    }
}
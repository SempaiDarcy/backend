import { validationResult, ValidationError, FieldValidationError } from "express-validator";
import { Request, Response, NextFunction } from "express";

type ErrorDto = { field: string; message: string };

const formatErrors = (error: ValidationError): ErrorDto => {
    if ("path" in error) {
        return { field: (error as FieldValidationError).path, message: error.msg };
    }
    return { field: "unknown", message: error.msg };
};

export const inputValidationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req).formatWith(formatErrors).array({ onlyFirstError: true });

    if (errors.length > 0) {
        return res.status(400).json({ errorsMessages: errors });
    }

   return next();
};

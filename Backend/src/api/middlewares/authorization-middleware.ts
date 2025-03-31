import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../../domain/errors/forbidden-error";
import { clerkClient } from "@clerk/express";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    // Fix the condition - check if role IS admin, not IS NOT admin
    if (req?.auth?.sessionClaims?.metadata?.role !== "admin") {
        throw new ForbiddenError("Forbidden: Admin role required");
    }
    next();
};
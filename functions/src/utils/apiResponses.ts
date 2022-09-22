import { Response } from "express";
import { ErrorResponse } from "../types/response.type";

export function unauthorizedUser({
  res,
  message,
}: {
  res: Response;
  message?: string;
}) {
  res.status(403).send({
    message: message ?? "Authorization Error",
  } as ErrorResponse);
}

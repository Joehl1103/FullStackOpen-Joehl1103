import type { Request, Response, NextFunction } from "express";


export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  res.status(400).send({ error: err.message });
}
;

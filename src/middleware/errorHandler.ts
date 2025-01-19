import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(err.stack);
  res.status(500).json({
    error: {
      message: err.message || 'Internal server error',
      status: 500
    }
  });
}
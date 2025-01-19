import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const forecastQuerySchema = Joi.object({
  policyRound: Joi.string().pattern(/^\d{4}:[1-4]$/), //Example: '2024:1' Regex: Four numbers followed by a ':' and a number between 1-4
  series: Joi.string(),
});

export function validateForecastQuery(req: Request, res: Response, next: NextFunction): void {
  const { error } = forecastQuerySchema.validate(req.query);
  if (error) {
    res.status(400).json({
      error: {
        message: 'Invalid query parameters',
        details: error.details.map(detail => detail.message)
      }
    });
    return;
  }
  next();
}
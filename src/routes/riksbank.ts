import express, { Router } from 'express';
import { getRiksbankData, getRiksbankForecasts } from '../services/riksbank.js';
import { validateForecastQuery } from '../middleware/validation.js';
import { ForecastParams } from '../types/riksbank.js';

export const riksbankRouter: Router = express.Router();

riksbankRouter.get('/series', async (req, res, next) => {
  try {
    const result = await getRiksbankData();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

riksbankRouter.get('/forecasts', validateForecastQuery, async (req, res, next) => {
  try {
    const params: ForecastParams = {
      policyRound: req.query.policyRound as string,
      series: req.query.series as string
    };
    const result = await getRiksbankForecasts(params);
    res.json(result);
  } catch (error) {
    next(error);
  }
});
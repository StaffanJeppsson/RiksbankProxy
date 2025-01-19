var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { getRiksbankData, getRiksbankForecasts } from '../services/riksbank.js';
import { validateForecastQuery } from '../middleware/validation.js';
export const riksbankRouter = express.Router();
riksbankRouter.get('/series', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield getRiksbankData();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
riksbankRouter.get('/forecasts', validateForecastQuery, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            policyRound: req.query.policyRound,
            series: req.query.series
        };
        const result = yield getRiksbankForecasts(params);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));

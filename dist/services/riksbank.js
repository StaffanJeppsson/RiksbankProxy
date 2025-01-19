var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
const RIKSBANK_API_URL = 'https://api.riksbank.se/monetary_policy_data/v1';
export function getRiksbankData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get(`${RIKSBANK_API_URL}/forecasts/series_ids`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            return response.data;
        }
        catch (error) {
            throw handleApiError(error);
        }
    });
}
export function getRiksbankForecasts(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const queryParams = new URLSearchParams();
            if (params.policyRound)
                queryParams.append('policy_round_name', params.policyRound);
            if (params.series)
                queryParams.append('series', params.series);
            const response = yield axios.get(`${RIKSBANK_API_URL}/forecasts?${queryParams.toString()}`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            return response.data;
        }
        catch (error) {
            throw handleApiError(error);
        }
    });
}
function handleApiError(error) {
    if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
            return new Error(`Riksbank API error: ${axiosError.response.status} - ${JSON.stringify(axiosError.response.data)}`);
        }
    }
    return new Error('Failed to fetch data from Riksbank API');
}

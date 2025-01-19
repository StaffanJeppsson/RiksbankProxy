import axios, { AxiosError } from 'axios';
import { ForecastParams, SeriesResponse, ForecastResponse } from '../types/riksbank.js';

const RIKSBANK_API_URL = 'https://api.riksbank.se/monetary_policy_data/v1';

export async function getRiksbankData(): Promise<any> {
  try {
    const response = await axios.get<any>(`${RIKSBANK_API_URL}/forecasts/series_ids`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getRiksbankForecasts(params: ForecastParams): Promise<any> {
  try {
    const queryParams = new URLSearchParams();
    if (params.policyRound) queryParams.append('policy_round_name', params.policyRound);
    if (params.series) queryParams.append('series', params.series);

    const response = await axios.get<any>(`${RIKSBANK_API_URL}/forecasts?${queryParams.toString()}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

function handleApiError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return new Error(`Riksbank API error: ${axiosError.response.status} - ${JSON.stringify(axiosError.response.data)}`);
    }
  }
  return new Error('Failed to fetch data from Riksbank API');
}
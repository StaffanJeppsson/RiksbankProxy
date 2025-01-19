import express from "express";
import axios from "axios";
import { riksbankRouter } from "../routes/riksbank";
import { getRiksbankForecasts } from "../services/riksbank";

const request = require("supertest");

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const app = express();
app.use(express.json());
app.use("/api/riksbank", riksbankRouter);

describe("Riksbank API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /series', () => {
    it('should return series data successfully', async () => {
      const mockSeriesData = [
        { seriesId: 'testId', unit: 'Test unit', description: 'Test description' }
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockSeriesData });

      const response = await request(app)
        .get('/api/riksbank/series')
        .expect(200);

      expect(response.body).toEqual(mockSeriesData);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.riksbank.se/monetary_policy_data/v1/forecasts/series_ids',
        expect.any(Object)
      );
    });
  });

  describe("GET /forecasts", () => {

    it("should return forecast data", async () => {
      const mockForecastData = [
        {
          startDate: "1990-01-01",
          seriesId: "testId",
          description: "Test description",
          unit: "Test unit",
          observations: []
        },
      ];
      mockedAxios.get.mockResolvedValueOnce({ data: mockForecastData });

      const response = await request(app)
        .get("/api/riksbank/forecasts")
        .expect(200);

      expect(response.body).toEqual(mockForecastData);
    });

    it("should return forecast data with valid parameters", async () => {
      const mockForecastData = [
        {
          startDate: "1990-01-01",
          seriesId: "testId",
          description: "Test description",
          unit: "Test unit",
          observations: []
        },
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockForecastData });

      const response = await request(app)
        .get("/api/riksbank/forecasts")
        .query({
          policyRound: "2024:1",
          series: "SEQGDPNAASA"
        })
        .expect(200);

      expect(response.body).toEqual(mockForecastData);
    });

    it("should fail validation with invalid policy round", async () => {
      const response = await request(app)
        .get("/api/riksbank/forecasts")
        .query({
          policyRound: "2024:99", //Invalid policy round
          series: "SEQGDPNAASA"
        })
        .expect(400);

      expect(response.body.error.message).toBe("Invalid query parameters");
    });
  });
});

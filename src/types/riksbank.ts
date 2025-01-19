export interface SeriesResponse {
    seriesId: string;
    description: string;
    unit: string;
}

export interface ForecastParams {
    policyRound?: string;
    series?: string;
}

export interface ForecastResponse {
    startDate: string;
    seriesId: string;
    description: string;
    unit: string;
    observations: Observation[];
}

interface Observation {
    dt: string;  // Date string in YYYY-MM-DD format
    value: number;
}

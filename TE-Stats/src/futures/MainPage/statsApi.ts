import axios from "axios";
import { HistoricalStats, SelectedStats } from "src/types/types.ts";

const instance = axios.create({
    baseURL: "https://api.tradingeconomics.com/",
});
const api_key = "fc7f338a72644f0:sf9v8q1c9wkzrcy";

export const statsApi = {
    getSelectedCountries: (selectedCountries: string, category: string | null) => {
        if (category) {
            return instance.get<SelectedStats[]>(`country/${selectedCountries}?f=json&c=${api_key}&group=${category}`);
        } else {
            return instance.get<SelectedStats[]>(`country/${selectedCountries}?f=json&c=${api_key}`);
        }
    },
    getPositionHistory: (selectedCountries: string, indicator: string, startDate: string) => {
        return instance.get<HistoricalStats[]>(
            `historical/country/${selectedCountries}/indicator/${indicator}/${startDate}?f=json&c=${api_key}`,
        );
    },
};

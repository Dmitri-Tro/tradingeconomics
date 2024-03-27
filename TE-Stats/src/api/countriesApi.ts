import axios from "axios";
import { Country } from "src/types/types.ts";

const instance = axios.create({
    baseURL: "https://api.tradingeconomics.com/",
});
const api_key = "fc7f338a72644f0:sf9v8q1c9wkzrcy";

export const countriesApi = {
    getCountries: () => {
        return instance.get<Country[]>(`country?f=json&c=${api_key}`);
    },
};

import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "src/utils/createAppAsyncThunk.ts";
import { thunkTryCatch } from "src/utils/thunkTryCatch.ts";
import { ChartData, HistoricalStats, SelectedStats } from "src/types/types.ts";
import { statsApi } from "src/futures/MainPage/statsApi.ts";
import { handleServerAppError } from "src/utils/error-utils.ts";
import { setChartData } from "src/utils/setChartData.ts";

const slice = createSlice({
    name: "Stats",
    initialState: {
        interestedCountry: "",
        comparisonCountry: "",
        interestedStats: [] as SelectedStats[],
        comparisonStats: [] as SelectedStats[],
        interestedChartData: {} as ChartData,
        comparisonChartData: {} as ChartData,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSelectedCountries.fulfilled, (state, action) => {
                state.interestedCountry = action.payload.interestedCountry;
                state.comparisonCountry = action.payload.comparisonCountry;
                state.interestedStats = action.payload.interestedStats;
                state.comparisonStats = action.payload.comparisonStats;
            })
            .addCase(getPositionHistory.fulfilled, (state, action) => {
                state.interestedChartData = setChartData(action.payload.interestedHistoricalStats);
                state.comparisonChartData = setChartData(action.payload.comparisonHistoricalStats);
            });
    },
});

const getSelectedCountries = createAppAsyncThunk<GetSelectedCountriesReturned, GetSelectedCountriesProps>(
    `${slice.name}/getSelectedCountries`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        const interestedCountry = arg.selectedCountries[0];
        const comparisonCountry = arg.selectedCountries[1];
        const countries = `${interestedCountry}` + "," + `${comparisonCountry}`;
        return thunkTryCatch(thunkAPI, async () => {
            const res = await statsApi.getSelectedCountries(countries, arg.category);
            if (Array.isArray(res.data)) {
                const interestedStats = res.data.filter((c) => c.Country === interestedCountry);
                const comparisonStats = res.data.filter((c) => c.Country === comparisonCountry);
                if (interestedStats.length && comparisonStats.length) {
                    return {
                        interestedCountry,
                        comparisonCountry,
                        interestedStats,
                        comparisonStats,
                    };
                } else {
                    handleServerAppError(
                        "No Access to this country as free user. Free users have the following countries available: Sweden, Mexico, New Zealand and Thailand. To upgrade your plan please contact support@tradingeconomics.com.",
                        dispatch,
                    );
                    return rejectWithValue(null);
                }
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        });
    },
);

const getPositionHistory = createAppAsyncThunk<GetPositionHistoryReturned, GetPositionHistoryProps>(
    `${slice.name}/getPositionHistory`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue, getState } = thunkAPI;
        const state = getState();
        const interestedCountry = state.stats.interestedCountry;
        const comparisonCountry = state.stats.comparisonCountry;
        const countries = `${interestedCountry}` + "," + `${comparisonCountry}`;
        const date = Date.now() - 1000 * 60 * 60 * 24 * 365 * 10;
        const startDate = new Date(date).toISOString().slice(0, 10);

        return thunkTryCatch(thunkAPI, async () => {
            const res = await statsApi.getPositionHistory(countries, arg.indicator, startDate);
            if (Array.isArray(res.data)) {
                const interestedHistoricalStats = res.data.filter((c) => c.Country === interestedCountry);
                const comparisonHistoricalStats = res.data.filter((c) => c.Country === comparisonCountry);
                return {
                    interestedHistoricalStats,
                    comparisonHistoricalStats,
                };
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        });
    },
);

export const statsReducer = slice.reducer;
export const statsActions = slice.actions;
export const statsThunks = { getSelectedCountries, getPositionHistory };

// Types
export type StatsState = ReturnType<typeof slice.getInitialState>;

type GetSelectedCountriesProps = { selectedCountries: string[]; category: string | null };
type GetSelectedCountriesReturned = {
    interestedCountry: string;
    comparisonCountry: string;
    interestedStats: SelectedStats[];
    comparisonStats: SelectedStats[];
};

type GetPositionHistoryProps = { indicator: string };
type GetPositionHistoryReturned = {
    interestedHistoricalStats: HistoricalStats[];
    comparisonHistoricalStats: HistoricalStats[];
};

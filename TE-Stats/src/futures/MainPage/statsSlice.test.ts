import { beforeEach, describe, it, expect } from "vitest";
import { ChartData, HistoricalStats, SelectedStats } from "src/types/types.ts";
import { statsReducer, StatsState, statsThunks } from "src/futures/MainPage/statsSlice.ts";
import { setChartData } from "src/utils/setChartData.ts";

describe("statsSlice", () => {
    let initialState = {} as StatsState;
    beforeEach(() => {
        initialState = {
            interestedCountry: "",
            comparisonCountry: "",
            interestedStats: [] as SelectedStats[],
            comparisonStats: [] as SelectedStats[],
            interestedChartData: {} as ChartData,
            comparisonChartData: {} as ChartData,
        };
    });
    it("should set selected countries and stats", () => {
        const interestedCountry = "US";
        const comparisonCountry = "Finland";
        const interestedStats: SelectedStats[] = [
            {
                Country: "US",
                Category: "health",
                Title: "Some title from health category",
                LatestValueDate: "2024-01-01",
                LatestValue: 100,
                Source: "some source 1",
                SourceURL: "some source URL 1",
                Unit: "some unit 1",
                URL: "some URL 1",
                CategoryGroup: "health",
                Adjustment: "some 1",
                Frequency: "monthly",
                HistoricalDataSymbol: "some symbol 1",
                CreateDate: "2021-01-01",
                FirstValueDate: "2021-01-01",
                PreviousValue: 90,
                PreviousValueDate: "2023-12-01",
            },
        ];

        const comparisonStats: SelectedStats[] = [
            {
                Country: "Finland",
                Category: "health",
                Title: "Some title from health category",
                LatestValueDate: "2024-01-01",
                LatestValue: 100,
                Source: "some source 2",
                SourceURL: "some source URL 2",
                Unit: "some unit 2",
                URL: "some URL 2",
                CategoryGroup: "health",
                Adjustment: "some 2",
                Frequency: "monthly",
                HistoricalDataSymbol: "some symbol 2",
                CreateDate: "2021-02-01",
                FirstValueDate: "2021-02-01",
                PreviousValue: 91,
                PreviousValueDate: "2023-12-01",
            },
        ];
        const action = statsThunks.getSelectedCountries.fulfilled(
            {
                interestedCountry,
                comparisonCountry,
                interestedStats,
                comparisonStats,
            },
            "requiredID",
            { selectedCountries: ["US", "Finland"], category: "health" },
        );

        const endState = statsReducer(initialState, action);

        expect(endState.interestedCountry).toBe(interestedCountry);
        expect(endState.comparisonCountry).toBe(comparisonCountry);
        expect(endState.interestedStats[0]).toEqual(interestedStats[0]);
        expect(endState.comparisonStats[0]).toEqual(comparisonStats[0]);
    });
    it("should set selected position historical stats", () => {
        const interestedHistoricalStats: HistoricalStats[] = [
            {
                Country: "US",
                Category: "health",
                DateTime: "2024-01-01",
                Value: 100,
                Frequency: "monthly",
                HistoricalDataSymbol: "some symbol",
                LastUpdate: "2024-01-01",
            },
        ];
        const comparisonHistoricalStats: HistoricalStats[] = [
            {
                Country: "Finland",
                Category: "health",
                DateTime: "2024-01-01",
                Value: 100,
                Frequency: "monthly",
                HistoricalDataSymbol: "some symbol",
                LastUpdate: "2024-01-01",
            },
        ];
        const action = statsThunks.getPositionHistory.fulfilled(
            { interestedHistoricalStats, comparisonHistoricalStats },
            "requiredID",
            { indicator: "health" },
        );

        const interestedChartData = setChartData(interestedHistoricalStats);
        const comparisonChartData = setChartData(comparisonHistoricalStats);

        const endState = statsReducer(initialState, action);

        expect(endState.interestedChartData).toEqual(interestedChartData);
        expect(endState.comparisonChartData).toEqual(comparisonChartData);
    });
});

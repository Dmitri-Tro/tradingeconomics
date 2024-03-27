import { AppRootState } from "src/App/store.ts";

export const selectInterestedStats = (state: AppRootState) => state.stats.interestedStats;
export const selectComparisonStats = (state: AppRootState) => state.stats.comparisonStats;
export const selectInterestedChartData = (state: AppRootState) => state.stats.interestedChartData;
export const selectComparisonChartData = (state: AppRootState) => state.stats.comparisonChartData;

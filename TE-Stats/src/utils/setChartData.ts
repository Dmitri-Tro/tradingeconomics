import { ChartData, HistoricalStats } from "src/types/types.ts";

export const setChartData = (stats: HistoricalStats[]): ChartData => {
    const chartDataArr = stats.map((i) => i.DateTime.slice(0, 10));
    const chartValueArr = stats.map((i) => i.Value);
    const chartCountry = stats[0]?.Country || "no data";
    const chartTitle = stats[0]?.Category || "no data";

    return { chartDataArr, chartValueArr, chartCountry, chartTitle };
};

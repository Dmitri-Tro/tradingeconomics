import { FC, memo } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "src/App/store.ts";
import { selectComparisonChartData, selectInterestedChartData } from "src/futures/MainPage/statsSelectors.ts";
import { ChartData } from "src/types/types.ts";
import { ChartComponent } from "src/futures/ChartComponent/ChartComponent";
import styles from "src/futures/TablePosition/TablePosition.module.css";

type TablePositionProps = {
    chartType: "line" | "bar" | "radar" | "doughnut" | "pie" | "polarArea" | "bubble" | "scatter";
};
export const TablePosition: FC<TablePositionProps> = memo(({ chartType }) => {
    const interestedChartData = useAppSelector(selectInterestedChartData);
    const comparisonChartData = useAppSelector(selectComparisonChartData);
    const chartData: ChartData[] = [interestedChartData, comparisonChartData];

    return !interestedChartData.chartDataArr ? (
        <Navigate to="/" />
    ) : (
        <div className={styles.container}>
            <h1 className={styles.title}>{interestedChartData.chartTitle}</h1>
            <ChartComponent chartData={chartData} chartType={chartType} />
        </div>
    );
});

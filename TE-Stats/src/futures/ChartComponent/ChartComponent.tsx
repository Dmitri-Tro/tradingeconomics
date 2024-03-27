import React, { memo, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ChartData } from "src/types/types.ts";
import styles from "src/futures/ChartComponent/ChartComponent.module.css";

interface Props {
    chartData: ChartData[];
    chartType: "line" | "bar" | "radar" | "doughnut" | "pie" | "polarArea" | "bubble" | "scatter";
}

export const ChartComponent: React.FC<Props> = memo(({ chartData, chartType }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart>();

    useEffect(() => {
        if (chartRef.current && chartData.length > 0) {
            const renderingContext = chartRef.current.getContext("2d");
            if (renderingContext) {
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }

                chartInstanceRef.current = new Chart(renderingContext, {
                    type: chartType,
                    data: {
                        labels: chartData[0]?.chartDataArr,
                        datasets: chartData.map((data, index) => ({
                            label: data.chartCountry,
                            data: data.chartValueArr,
                            backgroundColor: index === 0 ? "rgba(255, 99, 132, 0.2)" : "rgba(54, 162, 235, 0.2)",
                            borderColor: index === 0 ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                        })),
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        }
    }, [chartData, chartType]);

    return <canvas ref={chartRef} className={styles.chart} />;
});

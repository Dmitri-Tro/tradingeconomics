export type Country = {
    Country: string;
    Continent: "Asia" | "Europe" | "Africa" | "Australia" | "America";
    Group: string;
    ISO3: string;
    ISO2: string;
};

export type StatsCategory =
    | "health"
    | "markets"
    | "taxes"
    | "gdp"
    | "housing"
    | "trade"
    | "climate"
    | "labour"
    | "overview"
    | "prices"
    | "government"
    | "consumer"
    | "business"
    | "money";

export type SelectedStats = {
    Country: string;
    Category: string;
    Title: string;
    LatestValueDate: string;
    LatestValue: number;
    Source: string;
    SourceURL: string;
    Unit: string;
    URL: string;
    CategoryGroup: string;
    Adjustment: string;
    Frequency: string;
    HistoricalDataSymbol: string;
    CreateDate: string;
    FirstValueDate: string;
    PreviousValue: number;
    PreviousValueDate: string;
};

export type HistoricalStats = {
    Country: string;
    Category: string;
    DateTime: string;
    Value: number;
    Frequency: string;
    HistoricalDataSymbol: string;
    LastUpdate: string;
};

export type ChartData = {
    chartDataArr: string[];
    chartValueArr: number[];
    chartCountry: string;
    chartTitle: string;
};

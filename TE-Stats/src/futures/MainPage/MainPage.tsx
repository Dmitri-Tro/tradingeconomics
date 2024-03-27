import { FC, useCallback, useState } from "react";
import styles from "./MainPage.module.css";
import { Button } from "src/components/Button/Button.tsx";
import { MyAutocomplete } from "src/components/MyAutocomplete/MyAutocomplete.tsx";
import { StatsCategory } from "src/types/types.ts";
import { useAppSelector } from "src/App/store.ts";
import { selectCountriesList, selectStatus } from "src/App/appSelectors.ts";
import { useAppDispatch } from "src/hooks/useAppDispatch.ts";
import { statsThunks } from "src/futures/MainPage/statsSlice.ts";
import { selectInterestedStats, selectComparisonStats } from "src/futures/MainPage/statsSelectors.ts";
import { useNavigate } from "react-router-dom";
import { StatsTable } from "src/futures/StatsTable/StatsTable.tsx";

export const MainPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const fetchStatus = useAppSelector(selectStatus);
    const countries = useAppSelector(selectCountriesList).map((country) => country.Country);
    const interestedStats = useAppSelector(selectInterestedStats);
    const comparisonStats = useAppSelector(selectComparisonStats);
    const categories: StatsCategory[] = [
        "health",
        "markets",
        "taxes",
        "gdp",
        "housing",
        "trade",
        "climate",
        "labour",
        "overview",
        "prices",
        "government",
        "consumer",
        "business",
        "money",
    ];
    const [interestedCountry, setInterestedCountry] = useState<string | null>(countries[0]);
    const [comparisonCountry, setComparisonCountry] = useState<string | null>(countries[1]);
    const [category, setCategory] = useState<string | null>(null);

    const selectCountries = useCallback(() => {
        if (interestedCountry && comparisonCountry) {
            dispatch(
                statsThunks.getSelectedCountries({
                    selectedCountries: [interestedCountry, comparisonCountry],
                    category,
                }),
            );
        }
    }, [dispatch, interestedCountry, comparisonCountry, category]);

    const showTablePosition = useCallback(
        (position: string) => {
            dispatch(statsThunks.getPositionHistory({ indicator: position })).then(() => navigate(`/${position}`));
        },
        [dispatch, navigate],
    );

    return (
        <div className={styles.container}>
            <div className={styles.selectArea}>
                <MyAutocomplete
                    title={"Select interested country"}
                    options={countries}
                    selectedValue={interestedCountry}
                    setSelectedValue={setInterestedCountry}
                />
                <MyAutocomplete
                    title={"Select comparison country"}
                    options={countries}
                    selectedValue={comparisonCountry}
                    setSelectedValue={setComparisonCountry}
                />
                <MyAutocomplete
                    title={"Select category"}
                    options={categories}
                    selectedValue={category}
                    setSelectedValue={setCategory}
                />
                <Button
                    title={"Set countries"}
                    onClickHandler={selectCountries}
                    classes={styles.btn}
                    disabled={fetchStatus === "loading"}
                />
            </div>
            {(interestedStats.length > 0 || comparisonStats.length > 0) && (
                <StatsTable
                    comparisonStats={comparisonStats}
                    interestedStats={interestedStats}
                    showPosition={showTablePosition}
                />
            )}
        </div>
    );
};

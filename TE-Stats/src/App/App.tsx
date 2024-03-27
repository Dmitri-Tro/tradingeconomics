import "src/App/App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Page404 } from "src/components/Page404/Page404.tsx";
import { MainPage } from "src/futures/MainPage/MainPage.tsx";
import { Header } from "src/components/Header/Header.tsx";
import { ErrorSnackbar } from "src/components/ErrorSnackbar/ErrorSnackbar.tsx";
import { CircularProgress } from "@mui/material";
import { FC, useEffect } from "react";
import { useAppDispatch } from "src/hooks/useAppDispatch.ts";
import { appThunks } from "src/App/appSlice.ts";
import { useAppSelector } from "src/App/store.ts";
import { selectIsInitialized } from "src/App/appSelectors.ts";
import { TablePosition } from "src/futures/TablePosition/TablePosition.tsx";

export const App: FC = () => {
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(selectIsInitialized);

    useEffect(() => {
        dispatch(appThunks.initializeApp());
    }, [dispatch]);

    return !isInitialized ? (
        <CircularProgress className={"circularProgress"} />
    ) : (
        <>
            <ErrorSnackbar />
            <Header />
            <Routes>
                <Route path={"/"} element={<MainPage />} />
                <Route path={"/:position?"} element={<TablePosition chartType={"line"} />} />
                <Route path={"/404"} element={<Page404 />} />
                <Route path={"*"} element={<Navigate to="/404" />} />
            </Routes>
        </>
    );
};

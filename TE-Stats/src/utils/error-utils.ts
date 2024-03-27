import { appActions } from "src/App/appSlice.ts";
import { AppDispatch } from "src/App/store.ts";
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { Country } from "src/types/types.ts";
import { isArray } from "chart.js/helpers";

export const handleServerAppError = (
    data: Country[] | string,
    dispatch: Dispatch,
    isShowGlobalError: boolean = true,
) => {
    if (isShowGlobalError) {
        if (!isArray(data)) {
            dispatch(appActions.setAppError({ error: data }));
        } else {
            dispatch(appActions.setAppError({ error: "Some error occurred" }));
        }
    }
    dispatch(appActions.setAppStatus({ status: "failed" }));
};

export const handleServerNetworkError = (err: unknown, dispatch: AppDispatch): void => {
    let errorMessage = "Some error occurred";
    if (axios.isAxiosError(err)) {
        errorMessage = err?.response?.data || err.response?.data?.message || errorMessage;
    } else if (err instanceof Error) {
        errorMessage = `Native error: ${err.message}`;
    } else {
        errorMessage = JSON.stringify(err);
    }
    dispatch(appActions.setAppError({ error: errorMessage }));
    dispatch(appActions.setAppStatus({ status: "failed" }));
};

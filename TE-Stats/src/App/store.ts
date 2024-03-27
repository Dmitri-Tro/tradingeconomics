import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "src/App/appSlice.ts";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { statsReducer } from "src/futures/MainPage/statsSlice.ts";

export const store = configureStore({
    reducer: {
        app: appReducer,
        stats: statsReducer,
    },
});

export type AppRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

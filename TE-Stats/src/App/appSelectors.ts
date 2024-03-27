import { AppRootState } from "src/App/store.ts";

export const selectCountriesList = (state: AppRootState) => state.app.countries;
export const selectStatus = (state: AppRootState) => state.app.status;
export const selectIsInitialized = (state: AppRootState) => state.app.isInitialized;

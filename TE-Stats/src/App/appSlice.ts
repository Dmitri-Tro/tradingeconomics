import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "src/utils/createAppAsyncThunk.ts";
import { countriesApi } from "src/api/countriesApi.ts";
import { Country } from "src/types/types.ts";
import { thunkTryCatch } from "src/utils/thunkTryCatch.ts";
import { handleServerAppError } from "src/utils/error-utils.ts";

const slice = createSlice({
    name: "App",
    initialState: {
        countries: [] as Country[],
        status: "idle" as RequestStatusType,
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error;
        },
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(initializeApp.fulfilled, (state, action) => {
            state.countries = action.payload.countries;
            state.status = action.payload.status;
            state.isInitialized = action.payload.isInitialized;
        });
    },
});

const initializeApp = createAppAsyncThunk<InitializeAppReturned, undefined>(
    `${slice.name}/initializeApp`,
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        return thunkTryCatch(thunkAPI, async () => {
            const res = await countriesApi.getCountries();
            if (Array.isArray(res.data)) {
                return { countries: res.data, status: "succeeded", isInitialized: true };
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        });
    },
);

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const appThunks = { initializeApp };

export type AppState = ReturnType<typeof slice.getInitialState>;

// Types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
type InitializeAppReturned = { countries: Country[]; status: RequestStatusType; isInitialized: boolean };

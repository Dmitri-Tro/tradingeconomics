import { AppDispatch, AppRootState } from "src/App/store.ts";
import { Country } from "src/types/types.ts";
import { appActions } from "src/App/appSlice.ts";
import { handleServerNetworkError } from "src/utils/error-utils.ts";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<AppRootState, unknown, AppDispatch, null | Country[] | string>,
    logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
        return await logic();
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppStatus({ status: "idle" }));
    }
};

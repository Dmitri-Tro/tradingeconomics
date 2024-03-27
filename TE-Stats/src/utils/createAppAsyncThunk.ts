import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, AppRootState } from "app/store";
import { BaseResponseType } from "api/todolists-api";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootState;
    rejectValue: null | BaseResponseType;
    dispatch: AppDispatch;
}>();

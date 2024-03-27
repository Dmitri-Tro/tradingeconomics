import { beforeEach, describe, it, expect } from "vitest";
import { Country } from "src/types/types.ts";
import { appReducer, AppState, appThunks, RequestStatusType } from "src/App/appSlice.ts";

describe("appSlice", () => {
    let initialState = {} as AppState;
    beforeEach(() => {
        initialState = {
            countries: [] as Country[],
            status: "idle" as RequestStatusType,
            error: null as string | null,
            isInitialized: false,
        };
    });
    it("should initialize App and set countries", () => {
        const countries: Country[] = [
            {
                Country: "US",
                Continent: "America",
                Group: "America",
                ISO3: "some",
                ISO2: "some",
            },
            {
                Country: "Finland",
                Continent: "Europe",
                Group: "EU",
                ISO3: "some",
                ISO2: "some",
            },
        ];
        const action = appThunks.initializeApp.fulfilled(
            {
                countries: countries,
                status: "succeeded",
                isInitialized: true,
            },
            "requiredID",
            undefined,
        );

        const endState = appReducer(initialState, action);

        expect(endState.countries.length).toBe(2);
        expect(endState.countries[0]).toEqual({
            Country: "US",
            Continent: "America",
            Group: "America",
            ISO3: "some",
            ISO2: "some",
        });
        expect(endState.isInitialized).toBe(true);
        expect(endState.status).toBe("succeeded");
    });
});

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ILabelValuePair} from "../../types/common";

interface ISlotGamesFilters {
    hasOpenedFilter?: boolean;
    selectedLines: string[];
    selectedGameFeatures: ILabelValuePair[];
}
interface IGamesSliceInitialState {
    slotGamesFilters: ISlotGamesFilters,
    liveCasinoGamesFilters: {}
}

const initialState: IGamesSliceInitialState = {
    slotGamesFilters: {
        hasOpenedFilter: false,
        selectedLines: [],
        selectedGameFeatures: [],
    },
    liveCasinoGamesFilters: {}
};

export const gamesFiltersSlice = createSlice({
    name: 'gamesFilters',
    initialState,
    reducers: {
        setSlotGamesOpenedFilter: (state: IGamesSliceInitialState, action: PayloadAction<boolean>) => {
            state.slotGamesFilters.hasOpenedFilter = action.payload;
        },
        setSlotGamesSelectedLines: (state: IGamesSliceInitialState, action: PayloadAction<string[]>) => {
            state.slotGamesFilters.selectedLines = action.payload;
        },
        setSlotGamesSelectedGameFeatures: (state: IGamesSliceInitialState, action: PayloadAction<ILabelValuePair[]>) => {
            state.slotGamesFilters.selectedGameFeatures = action.payload;
        }
    }
});

export const {
    setSlotGamesOpenedFilter,
    setSlotGamesSelectedLines,
    setSlotGamesSelectedGameFeatures
} = gamesFiltersSlice.actions;
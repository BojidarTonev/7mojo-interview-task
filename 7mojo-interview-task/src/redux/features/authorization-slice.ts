import { createSlice } from '@reduxjs/toolkit';
import {IPlayerDataResponseType} from "../../types/types/player-types";

interface IAuthorizationInitialState {
    playerInfo?: IPlayerDataResponseType | null;
    isLoading: boolean;
    error?: string;
    operatorToken: string;
    playerToken: string;
}

const initialState: IAuthorizationInitialState = {
    playerInfo: null,
    isLoading: false,
    error: '',
    operatorToken: '654be709f71140f7aa65dcd8cede80d4',
    playerToken: 'Player777'
};

export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.playerInfo = action.payload;
        },
        setUserDataError: (state, action) => {
            state.error = action.payload;
        },
        setUserDataIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const {
    setUserData,
    setUserDataError,
    setUserDataIsLoading
} = authorizationSlice.actions;
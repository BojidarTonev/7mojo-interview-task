import { createSlice } from '@reduxjs/toolkit';

interface IAuthorizationInitialState {
    playerInfo?: any;
    isLoading: boolean;
    error?: string;
}

const initialState: IAuthorizationInitialState = {
    playerInfo: null,
    isLoading: false,
    error: '',
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
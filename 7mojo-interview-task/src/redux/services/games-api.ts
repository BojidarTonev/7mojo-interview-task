import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {IGetGamesResponseType} from "../../types/types/game-types";

interface IGetGamesRequestParams {
    operatorToken: string
    currency: string
    type: 'any' | 'slots' | 'live'
    thumbnailsSize?: string
}

export const gamesApi = createApi({
    reducerPath: 'gamesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getGames: builder.query<IGetGamesResponseType, IGetGamesRequestParams>({
            query: ({ operatorToken, currency, type, thumbnailsSize }) => ({
                url: `/api/lobby/games`,
                params: {
                    operatorToken,
                    currency,
                    type,
                    thumbnailsSize
                },
            }),
        }),
    }),
});

export const {
    useLazyGetGamesQuery
} = gamesApi;
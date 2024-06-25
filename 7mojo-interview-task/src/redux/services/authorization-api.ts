import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {IGetGamesResponseType} from "../../types/types/game-types";

interface IGetPlayerParams {
    playerToken: string
    operatorToken: string
}

export const authorizationApi = createApi({
    reducerPath: 'authorizationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getPlayerInfo: builder.query<IGetGamesResponseType, IGetPlayerParams>({
            query: ({ playerToken, operatorToken }) => ({
                url: `/api/lobby/player`,
                params: {
                    playerToken,
                    operatorToken,
                },
            }),
        }),
    }),
});

export const {
    useGetPlayerInfoQuery
} = authorizationApi;
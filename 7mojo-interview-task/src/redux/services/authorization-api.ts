import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IPlayerDataResponseType {
    username: string
    currency: string
    balance: string
}

interface IGetGamesResponseType {
    data: IPlayerDataResponseType
    errorMsg?: string
    successful: boolean
}

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
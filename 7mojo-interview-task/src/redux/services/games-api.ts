import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IGetGamesRequestParams {
    operatorToken: string
    currency: string
    type: 'any' | 'slots' | 'live'
    thumbnailsSize?: string
}

interface IThumbnail {
    width: number
    height: number
    imageUrl: number
    videoUrl: number
}

interface ISlotData {
    linesCount: number
    tags: any[]
}

interface IBetData {
    min: number
    max: number
}

interface ILiveData {
    playersCount: number
    betData: IBetData[]
}

interface IGetGamesResponseType {
    name: string
    token: string
    thumbnails: IThumbnail[]
    gameType: 'any' | 'slots' | 'live'
    categories: any[]
    isFeatured: boolean
    hostsUrl: string
    clientUrl: string
    slotData: ISlotData[]
    liveData: ILiveData
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
    useGetGamesQuery
} = authorizationApi;
import {GameCategory, GameType, SlotGameTag} from "../enums/game-enums";

interface IThumbnail {
    width: number
    height: number
    imageUrl: string
    videoUrl: string
}

interface ISlotData {
    linesCount: number
    tags: SlotGameTag[]
}

interface IBetData {
    min: number
    max: number
}

interface ILiveData {
    playersCount: number
    betData: IBetData[]
}

interface IGameType {
    name: string
    token: string
    thumbnails: IThumbnail[]
    gameType: GameType
    categories: GameCategory[]
    isFeatured: boolean
    hostUrl: string
    clientUrl: string
    slotData: ISlotData
    liveData: ILiveData
}

interface IGetGamesResponseType {
    data: IGameType[]
    endpointName: string
    fulfilledTimeStamp: number
    isError: boolean
    isLoading: boolean
    isSuccess: boolean
    isUninitialized: boolean
    requestId: string
    startedTimeStamp: number
    status: string
}

export type {
    IGameType,
    ISlotData,
    IThumbnail,
    IGetGamesResponseType
}
enum GameType {
    SlotV1 = 0,
    Roulette = 1,
    Blackjack = 2,
    UnlimitedBlackjackSP = 3,
    UnlimitedBlackjackMP = 4,
    AndarBahar = 5,
    Baccarat = 6,
    DragonTiger = 7,
    TeenPatti = 8,
    TeenPattiFaceOff = 9,
    SlotV2 = 10,
}

enum GameCategory {
    Slots = 0,
    Live = 1,
    Dealer = 2,
    Cards = 3,
}

enum SlotGameTag {
    FreeSpins = 0,
    BonusGame = 1,
    ScatterPays = 2,
    Gamble = 3,
    Mysteries = 4,
    Wild = 5,
    Fruits = 6
}

enum GameTypeRequestParams {
    'any' = 'any',
    'slots' = 'slots',
    'live' = 'live'
}

export {
    GameType,
    GameCategory,
    SlotGameTag,
    GameTypeRequestParams
}
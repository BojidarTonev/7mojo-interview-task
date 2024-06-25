import {useLazyGetGamesQuery} from "../../redux/services/games-api";
import {IGameType} from "../../types/types/game-types";
import {useCallback, useEffect, useState} from "react";
import {GameType, GameTypeRequestParams} from "../../types/enums/game-enums";
import {useAppSelector} from "../../redux/store";
import HorizontalSeparator from "../../components/horizontal-seperator/HorizontalSeparator";
import GameSlots from "../../components/game-slots/GameSlots";
import {splitCamelCase} from "../../utils";
import './LiveCasinoGamesPage.scss';

const INTERVAL_SECONDS = 1000;

const LiveCasinoGamesPage = () => {
    const { playerInfo, operatorToken } = useAppSelector((state) => state.authorization);
    const [fetchGamesDataQuery, {data, error, isLoading}] = useLazyGetGamesQuery() as [never, { data: IGameType[], isLoading: boolean, error: string }];

    const { currency } = playerInfo || {};

    const [groupedLiveGames, setGroupedLiveGames] = useState<Record<string, IGameType[]>>({});

    // fetch the data
    useEffect(() => {
        const fetchGamesData = async () => {
            if (!currency) {
                return;
            }
            fetchGamesDataQuery({ operatorToken, currency, type: GameTypeRequestParams.live });
        }
        // initial fetch of data
        void fetchGamesData();

        const intervalId = setInterval(() => {
            void fetchGamesData()
        }, INTERVAL_SECONDS * 1000);

        return () => clearInterval(intervalId);
    }, [ currency, operatorToken, fetchGamesDataQuery ]);

    useEffect(() => {
        const groupedLiveRouletteGames = groupByGameType(data);
        setGroupedLiveGames(groupedLiveRouletteGames);
    }, [data])

    const renderLiveCasinoGameTypes = useCallback(() => {
        if (!groupedLiveGames) {
            return
        }
        return Object.entries(groupedLiveGames).map(([gameType, games]) => {
            console.log('games => ', games);
            return (
                <div key={gameType}>
                    <HorizontalSeparator name={splitCamelCase(gameType)} />
                    <GameSlots games={games} isLoading={isLoading} isSlotGame={false} />
                </div>
            );
        });
    }, [groupedLiveGames, isLoading])

    return (<div className="live-casino-games-wrapper">
        {renderLiveCasinoGameTypes()}
    </div>)
};

export default LiveCasinoGamesPage;

const groupByGameType = (games: IGameType[]): Record<string, IGameType[]> => {
    return games?.reduce((acc: Record<string, IGameType[]>, game) => {
        const gameTypeKey = GameType[game.gameType]; // Get the enum value as string
        if (!acc[gameTypeKey]) {
            acc[gameTypeKey] = [];
        }
        acc[gameTypeKey].push(game);
        return acc;
    }, {});
};
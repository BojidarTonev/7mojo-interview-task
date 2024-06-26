import {useGetGamesQuery} from "../../redux/services/games-api";
import {IGameType} from "../../types/types/game-types";
import {useCallback, useEffect, useState} from "react";
import {GameType, GameTypeRequestParams} from "../../types/enums/game-enums";
import {useAppSelector} from "../../redux/store";
import {splitCamelCase} from "../../utils";
import CasinoGamesWrapper from "../../components/casino-games-wrapper/CasinoGamesWrapper";
import './LiveCasinoGamesPage.scss';

const INTERVAL_SECONDS = 1000;

const LiveCasinoGamesPage = () => {
    const { playerInfo, operatorToken } = useAppSelector((state) => state.authorization);
    const { currency } = playerInfo || {};

    const {data, error, isLoading} = useGetGamesQuery({ operatorToken, currency, type: GameTypeRequestParams.live }, {
        pollingInterval: INTERVAL_SECONDS * 1000,
        skip: !currency
    });

    const [groupedLiveGames, setGroupedLiveGames] = useState<Record<string, IGameType[]>>({});

    useEffect(() => {
        const groupedLiveRouletteGames = groupByGameType(data);
        setGroupedLiveGames(groupedLiveRouletteGames);
    }, [data])

    const renderLiveCasinoGameTypes = useCallback(() => {
        if (!groupedLiveGames) {
            return
        }
        return Object.entries(groupedLiveGames).map(([gameType, games]) => {
            return (<CasinoGamesWrapper name={splitCamelCase(gameType)} games={games} isLoading={isLoading} />);
        });
    }, [groupedLiveGames, isLoading])

    if (error) {
        return (<div className="error">Error fetching games, please try again later!</div>)
    }
    return (<div className="live-casino-games-wrapper">
        <div className="live-casino-games">
            {renderLiveCasinoGameTypes()}
        </div>
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
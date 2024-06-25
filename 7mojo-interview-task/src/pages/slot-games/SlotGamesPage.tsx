import {useEffect, useMemo} from "react";
import HorizontalSeparator from "../../components/horizontal-seperator/HorizontalSeparator";
import GameSlots from "../../components/game-slots/GameSlots";
import {useAppSelector} from "../../redux/store";
import {useLazyGetGamesQuery} from "../../redux/services/games-api";
import {GameTypeRequestParams} from "../../types/enums/game-enums";
import {IGameType} from "../../types/types/game-types";
import './SlotGamesPage.scss';

const INTERVAL_SECONDS = 1000;

const SlotGamesPage = () => {
    const [fetchGamesDataQuery, {data, error, isLoading}] = useLazyGetGamesQuery() as [never, { data: IGameType[], isLoading: boolean, error: string }];
    const { playerInfo, operatorToken } = useAppSelector((state) => state.authorization);
    const { currency } = playerInfo || {};

    useEffect(() => {
        const fetchGamesData = async () => {
            if (!currency) {
                return;
            }
            fetchGamesDataQuery({ operatorToken, currency, type: GameTypeRequestParams.slots });
        }
        // initial fetch of data
        void fetchGamesData();

        const intervalId = setInterval(() => {
            void fetchGamesData()
        }, INTERVAL_SECONDS * 1000);

        return () => clearInterval(intervalId);
    }, [ currency, operatorToken, fetchGamesDataQuery ]);

    const featuredGames = useMemo(() => {
        return data?.filter((el: IGameType) => el.isFeatured)
    }, [data]);

    if (error) {
        return (<div>Error fetching games, please try again later!</div>)
    }
    return(<div className="slot-games-wrapper">
        <HorizontalSeparator name="Featured games" />
        <GameSlots games={featuredGames} isLoading={isLoading} isFeatured />
        <HorizontalSeparator name="Slots"  />
        <GameSlots games={data} isLoading={isLoading} />
    </div>)
};

export default SlotGamesPage;
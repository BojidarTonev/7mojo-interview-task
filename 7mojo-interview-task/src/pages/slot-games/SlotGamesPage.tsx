import {useAppSelector} from "../../redux/store";
import {useGetGamesQuery} from "../../redux/services/games-api";
import {GameTypeRequestParams} from "../../types/enums/game-enums";
import CasinoGamesWrapper from "../../components/casino-games-wrapper/CasinoGamesWrapper";
import './SlotGamesPage.scss';

const INTERVAL_SECONDS = 10;

const SlotGamesPage = () => {
    const { playerInfo, operatorToken } = useAppSelector((state) => state.authorization);
    const { currency } = playerInfo || false;

    const {data, error, isLoading} = useGetGamesQuery({ operatorToken, currency, type: GameTypeRequestParams.slots }, {
        pollingInterval: INTERVAL_SECONDS * 1000,
        skip: !currency
    });

    if (error) {
        return (<div className="error">Error fetching games, please try again later!</div>)
    }
    return(<div className="slot-games-wrapper">
        <CasinoGamesWrapper name="Featured games" games={data} isFeatured areSlotGames isLoading={isLoading} />
        <CasinoGamesWrapper name="Slots" games={data} hasFilter areSlotGames isLoading={isLoading} />
    </div>)
};

export default SlotGamesPage;
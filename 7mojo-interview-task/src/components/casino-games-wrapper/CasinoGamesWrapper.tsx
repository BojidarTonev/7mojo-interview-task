import {IGameType} from "../../types/types/game-types";
import HorizontalSeparator from "../horizontal-seperator/HorizontalSeparator";
import GameSlots from "../game-slots/GameSlots";
import './CasinoGamesWrapper.scss';

interface ICasinoGamesWrapperProps {
    name: string
    games?: IGameType[]
    isFeatured?: boolean
    hasFilter?: boolean
    areSlotGames?: boolean
    isLoading: boolean
}
const CasinoGamesWrapper = (props: ICasinoGamesWrapperProps) => {
    const { name, games, isFeatured = false, hasFilter = false, areSlotGames = false, isLoading } = props;

    return(<>
        <HorizontalSeparator name={name} hasFilter={hasFilter} />
        {isLoading ?
            <>Loading games...</> :
            <GameSlots games={games} areSlotGames={areSlotGames} isFeatured={isFeatured} isFilterable={hasFilter} />}
    </>)
}

export default CasinoGamesWrapper;
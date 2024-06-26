import {IGameType} from "../../types/types/game-types";
import HorizontalSeparator from "../horizontal-seperator/HorizontalSeparator";
import GameSlots from "../game-slots/GameSlots";
import {useEffect, useState} from "react";
import {ILabelValuePair} from "../../types/common";
import {useAppSelector} from "../../redux/store";
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
    const { name, games = [], isFeatured = false, hasFilter = false, areSlotGames = false, isLoading } = props;
    const {selectedGameFeatures, selectedLines} = useAppSelector((state) => state.gamesFilters.slotGamesFilters);

    const [displayGames, setDisplayGames] = useState<IGameType[]>([]);

    useEffect(() => {
        if (isFeatured) {
            const filteredFeaturedGamesData: IGameType[] = games?.filter((el: IGameType) => el.isFeatured);
            setDisplayGames(filteredFeaturedGamesData)
        } else if (hasFilter) {
            const [minimumLines, maximumLines] = getSelectedLineValues(selectedLines);
            const filteredAllGamesData = filterAllGamesData(games, maximumLines, minimumLines, selectedGameFeatures);

            setDisplayGames(filteredAllGamesData);
        } else {
            setDisplayGames(games);
        }
    }, [isFeatured, hasFilter, games, selectedGameFeatures, selectedLines]);

    return(<>
        <HorizontalSeparator name={name} hasFilter={hasFilter} />
        {isLoading ?
            <>Loading games...</> :
            <GameSlots games={displayGames} areSlotGames={areSlotGames} isFeatured={isFeatured} isFilterable={hasFilter} />}
    </>)
}

export default CasinoGamesWrapper;

// these functions are currently staying in this file since they are not reused anywhere else,
// so having them here would keep the code base cleaner
const filterAllGamesData = (allGamesData: IGameType[], maximumLines: number, minimumLines: number, selectedGameFeatures: ILabelValuePair[]) => {
    return allGamesData?.filter((el: IGameType) =>
        el.slotData.linesCount >= minimumLines &&
        el.slotData.linesCount <= maximumLines &&
        (selectedGameFeatures.length === 0 || el.slotData.tags.some(tag => selectedGameFeatures.map(gf => gf.value).includes(tag))));
}

const getSelectedLineValues = (selectedLines: string[]): [number, number] => {
    const selectedLineValues = selectedLines[0]
        ? selectedLines[0].split(/[->]/).filter(el => !isNaN(el)).filter(el => el).map(el => Number(el))
        : [0, Infinity];
    // in case we have >50 to keep the logic flow without braking it
    if (selectedLineValues.length === 1) {
        selectedLineValues.push(Infinity);
    }
    const minimumLines = selectedLineValues[0];
    const maximumLines = selectedLineValues[1];

    return [minimumLines, maximumLines];
}
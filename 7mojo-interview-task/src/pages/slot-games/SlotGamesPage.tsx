import {useEffect, useState} from "react";
import HorizontalSeparator from "../../components/horizontal-seperator/HorizontalSeparator";
import GameSlots from "../../components/game-slots/GameSlots";
import {useAppSelector} from "../../redux/store";
import {useLazyGetGamesQuery} from "../../redux/services/games-api";
import {GameTypeRequestParams} from "../../types/enums/game-enums";
import {IGameType} from "../../types/types/game-types";
import './SlotGamesPage.scss';
import {ILabelValuePair} from "../../types/common";

const INTERVAL_SECONDS = 1000;

const SlotGamesPage = () => {
    const [fetchGamesDataQuery, {data, error, isLoading}] = useLazyGetGamesQuery() as [never, { data: IGameType[], isLoading: boolean, error: string }];
    const { playerInfo, operatorToken } = useAppSelector((state) => state.authorization);
    const {selectedGameFeatures, selectedLines} = useAppSelector((state) => state.gamesFilters.slotGamesFilters);
    const { currency } = playerInfo || {};

    const [allGames, setAllGames] = useState<IGameType[]>([]);
    const [featuredGames, setFeaturedGames] = useState<IGameType[]>([]);

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

    // set featured games only on API data change
    useEffect(() => {
        const filteredFeaturedGamesData = data?.filter((el: IGameType) => el.isFeatured);
        setFeaturedGames(filteredFeaturedGamesData)
    }, [data]);

    // set all games filtered data on data and filters data changed from the slice
    useEffect(() => {
        const [minimumLines, maximumLines] = getSelectedLineValues(selectedLines);
        const filteredAllGamesData = filterAllGamesData(data, maximumLines, minimumLines, selectedGameFeatures);

        setAllGames(filteredAllGamesData);
    }, [data, selectedGameFeatures, selectedLines]);

    if (error) {
        return (<div>Error fetching games, please try again later!</div>)
    }
    return(<div className="slot-games-wrapper">
        <HorizontalSeparator name="Featured games" />
        <GameSlots games={featuredGames} isLoading={isLoading} isFeatured />
        <HorizontalSeparator name="Slots" hasFilter />
        <GameSlots games={allGames} isLoading={isLoading} isFilterable />
    </div>)
};

export default SlotGamesPage;

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
import {IGameType} from "../../types/types/game-types";
import {useCallback} from "react";
import GameCard from "../game-card/GameCard";
import Filters from "../filters/Filters";
import {useAppSelector} from "../../redux/store";
import FeaturedGameCards from "../featured-game-cards/featured-game-cards";
import './GameSlots.scss';

interface IGameSlotsProps {
    games?: IGameType[]
    isFeatured?: boolean
    isFilterable?: boolean
    areSlotGames: boolean
}

const GameSlots = (props: IGameSlotsProps) => {
    const { games, areSlotGames, isFeatured = false, isFilterable = false } = props;
    const { playerInfo } = useAppSelector((state) => state.authorization);
    const {hasOpenedFilter} = useAppSelector((state) => state.gamesFilters.slotGamesFilters);

    const renderGameCards2 = useCallback(() => {
        if (games && games.length === 6 && isFeatured) {
            return <FeaturedGameCards featuredGames={games} areSlotGames={areSlotGames} />
        } else {
            return games?.map((game: IGameType) => {
                const { slotData, thumbnails, name, categories, liveData } = game;

                return (
                    <div key={name} className="grid-item">
                        <GameCard
                            slotData={slotData}
                            thumbnails={thumbnails}
                            name={name}
                            categories={categories}
                            isSlotGame={areSlotGames}
                            playersCount={liveData?.playersCount}
                            orientation={!isFeatured ? 'horizontal' : 'vertical'}
                        />
                    </div>
                );
            })
        }
    }, [areSlotGames, isFeatured, games]);

    return (<div className="game-slots">
        {hasOpenedFilter && isFilterable && <Filters/>}
        <div className={`${isFeatured ? 'game-slots-featured-wrapper' : 'game-slots-wrapper'}`}>
            {
                !playerInfo ?
                    <div className="error" style={{width: '70vw', alignSelf: 'center'}}>You have to be authorised in
                        order to have access to casino games!</div> :
                    renderGameCards2()
            }
        </div>
    </div>)
}

export default GameSlots;
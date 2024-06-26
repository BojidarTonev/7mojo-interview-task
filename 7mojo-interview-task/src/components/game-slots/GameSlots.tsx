import {IGameType} from "../../types/types/game-types";
import {useCallback} from "react";
import GameCard from "../game-card/GameCard";
import Filters from "../filters/Filters";
import {useAppSelector} from "../../redux/store";
import './GameSlots.scss';

interface IGameSlotsProps {
    games?: IGameType[]
    isLoading: boolean
    isFeatured?: boolean
    isFilterable?: boolean
    isSlotGame: boolean
}

const GameSlots = (props: IGameSlotsProps) => {
    const { games, isLoading, isSlotGame, isFeatured = false, isFilterable = false } = props;
    const { playerInfo } = useAppSelector((state) => state.authorization);
    const {hasOpenedFilter} = useAppSelector((state) => state.gamesFilters.slotGamesFilters);

    const renderGameCards = useCallback(() => {
        return games?.map((game: IGameType, index: number) => {
            const { slotData, thumbnails, name, categories, liveData } = game;
            if (games?.length === 6 && isFeatured) {
                if (index === 2) {
                    // Render two cards stacked in one grid item
                    const nextGridItem = games[3];
                    return (
                        <div key={name} className="grid-item stacked">
                            <GameCard
                                slotData={slotData}
                                thumbnails={thumbnails}
                                orientation='horizontal'
                                isSlotGame={isSlotGame}
                                name={name}
                                categories={categories}
                                playersCount={liveData?.playersCount}
                            />
                            {nextGridItem &&
                                <GameCard
                                    slotData={nextGridItem.slotData}
                                    thumbnails={nextGridItem.thumbnails}
                                    orientation='horizontal'
                                    isSlotGame={isSlotGame}
                                    name={name}
                                    categories={categories}
                                    playersCount={liveData?.playersCount}
                                />
                            }
                        </div>
                    );
                } else if (index === 3) {
                    return null; // Skip rendering the 4th game separately
                } else {
                    // Render single card in a grid item
                    return (
                        <div key={name} className="grid-item">
                            <GameCard
                                slotData={slotData}
                                thumbnails={thumbnails}
                                isSlotGame={isSlotGame}
                                name={name}
                                categories={categories}
                                playersCount={liveData?.playersCount}
                            />
                        </div>
                    );
                }
            } else {
                // if we have less than 6 items, render items as usual grid
                return (
                    <div key={name} className="grid-item">
                        <GameCard
                            slotData={slotData}
                            thumbnails={thumbnails}
                            name={name}
                            categories={categories}
                            isSlotGame={isSlotGame}
                            playersCount={liveData?.playersCount}
                            orientation={!isFeatured ? 'horizontal' : 'vertical'}
                        />
                    </div>
                );
            }
        })
    }, [isSlotGame, games, isFeatured]);

    return (<div className="game-slots">
        {hasOpenedFilter && isFilterable && <Filters />}
        <div className={`${isFeatured ? 'game-slots-featured-wrapper' : 'game-slots-wrapper'}`}>
            {isLoading ?
                <>Loading...</> :
                !playerInfo ?
                <div className="error" style={{ width: '70vw', alignSelf: 'center'}}>You have to be authorised in order to have access to casino games!</div> :
                renderGameCards()
            }
        </div>
    </div>)
}

export default GameSlots;
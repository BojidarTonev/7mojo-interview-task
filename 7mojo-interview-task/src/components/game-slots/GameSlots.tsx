import {IGameType} from "../../types/types/game-types";
import {useCallback} from "react";
import GameCard from "../game-card/GameCard";
import './GameSlots.scss';

interface IGameSlotsProps {
    games?: IGameType[]
    isLoading: boolean
}

const GameSlots = (props: IGameSlotsProps) => {
    const { games, isLoading } = props;

    const renderGameCards = useCallback(() => {
        return games?.map((game: IGameType, index: number) => {
            const { slotData, thumbnails, name } = game;
            if (games?.length === 6) {
                if (index === 2) {
                    // Render two cards stacked in one grid item
                    const nextGridItem = games[3];
                    return (
                        <div key={name} className="grid-item stacked">
                            <GameCard
                                slotData={slotData}
                                thumbnails={thumbnails}
                                orientation='horizontal'
                            />
                            {nextGridItem &&
                                <GameCard
                                    slotData={nextGridItem.slotData}
                                    thumbnails={nextGridItem.thumbnails}
                                    orientation='horizontal'
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
                            <GameCard slotData={slotData} thumbnails={thumbnails} />
                        </div>
                    );
                }
            } else {
                // if we have less than 6 items, render items as usual grid
                return (
                    <div key={name} className="grid-item">
                        <GameCard slotData={slotData} thumbnails={thumbnails} />
                    </div>
                );
            }
        })
    }, [games]);

    return (<div className="game-slots-wrapper">
        {isLoading ? <>Loading...</> : renderGameCards()}
    </div>)
}

export default GameSlots;
import {useEffect, useState} from "react";
import {IGameType} from "../../types/types/game-types";
import GameCard from "../game-card/GameCard";

interface IFeaturedGameCards {
    featuredGames: IGameType[]
    areSlotGames: boolean
}

const FeaturedGameCards = (props: IFeaturedGameCards) => {
    const { featuredGames, areSlotGames } = props;
    const [gamesToRender, setGamesToRender] = useState<IGameType[]>();

    useEffect(() => {
        if (featuredGames.length === 6) {
            const featuredGamesArray = [...(featuredGames || []).slice(0, 2), [featuredGames[2], featuredGames[3]], ...(featuredGames || []).slice(4, 6)];
            setGamesToRender(featuredGamesArray as IGameType[]);
        }
    }, [featuredGames]);

    return(<>
        {gamesToRender?.map((game: IGameType, index: number) => {
            if (index === 2) {
                const firstElement = game[0];
                const secondElement = game[1];
                return (
                    <div key={`${firstElement.name}-${secondElement.name}`} className="grid-item stacked">
                        <GameCard
                            key={firstElement.name}
                            slotData={firstElement.slotData}
                            thumbnails={firstElement.thumbnails}
                            orientation='horizontal'
                            isSlotGame={areSlotGames}
                            name={firstElement.name}
                            categories={firstElement.categories}
                            playersCount={firstElement.liveData?.playersCount}
                        />
                        <GameCard
                            key={secondElement.name}
                            slotData={secondElement.slotData}
                            thumbnails={secondElement.thumbnails}
                            orientation='horizontal'
                            isSlotGame={areSlotGames}
                            name={secondElement.name}
                            categories={secondElement.categories}
                            playersCount={secondElement.liveData?.playersCount}
                        />
                    </div>
                )
            }
            const { slotData, thumbnails, name, categories, liveData } = game;
            return (<div key={name} className="grid-item">
                <GameCard
                    slotData={slotData}
                    thumbnails={thumbnails}
                    name={name}
                    categories={categories}
                    isSlotGame={areSlotGames}
                    playersCount={liveData?.playersCount}
                    orientation="vertical"
                />
            </div>)
        })}
    </>)
}

export default FeaturedGameCards;
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
                const firstElement: IGameType = game[0];
                const secondElement: IGameType = game[1];
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
                            token={firstElement.token}
                            hostUrl={firstElement.hostUrl}
                            clientUrl={firstElement.clientUrl}
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
                            token={secondElement.token}
                            hostUrl={secondElement.hostUrl}
                            clientUrl={secondElement.clientUrl}
                        />
                    </div>
                )
            }
            const { slotData, thumbnails, name, categories, liveData, token, hostUrl, clientUrl } = game;
            return (<div key={name} className="grid-item">
                <GameCard
                    slotData={slotData}
                    thumbnails={thumbnails}
                    name={name}
                    categories={categories}
                    isSlotGame={areSlotGames}
                    playersCount={liveData?.playersCount}
                    orientation="vertical"
                    token={token}
                    hostUrl={hostUrl}
                    clientUrl={clientUrl}
                />
            </div>)
        })}
    </>)
}

export default FeaturedGameCards;
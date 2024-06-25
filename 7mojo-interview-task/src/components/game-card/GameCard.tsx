import {useCallback, useMemo} from "react";
import defaultThumbnail from '../../assets/default_thumbnail.png';
import livePlayersSvg from '../../assets/players.svg';
import {ISlotData, IThumbnail} from "../../types/types/game-types";
import {GameCategory, SlotGameTag} from "../../types/enums/game-enums";
import {getEnumEntries, splitCamelCase} from "../../utils";
import './GameCard.scss';

interface IGameCardProps {
    orientation?: 'horizontal' | 'vertical',
    slotData?: ISlotData
    categories?: GameCategory[]
    thumbnails: IThumbnail[]
    isSlotGame: boolean
    name: string
    playersCount?: number
}

const GameCard = (props: IGameCardProps) => {
    const { name, slotData, categories, thumbnails, isSlotGame, playersCount, orientation = 'vertical' } = props;
    // const { width, height, videoUrl, imageUrl } = thumbnails[0];

    const height = orientation === 'vertical' ? 440 : 180;
    const width = orientation === 'vertical' ? 220: 300;

    const mappedTags = useMemo(() => {
        if (!isSlotGame) {
            const allAvailableCategories = getEnumEntries(GameCategory);
            return allAvailableCategories.filter(category => categories?.includes(category.value)).map(el => el.key);
        }

        return [`${slotData?.linesCount} Lines`, ...(slotData || [] as ISlotData).tags.map(tag => SlotGameTag[tag])].map(splitCamelCase);
    }, [isSlotGame, slotData, categories]);

    const imageThumbNail = useMemo(() => {
        return thumbnails[0] ? thumbnails[0].imageUrl : defaultThumbnail;
    }, [thumbnails]);

    const renderTags = useCallback(() => {
        return (<div className={`tags-wrapper ${orientation === 'horizontal' ? 'horizontal-tags-wrapper' : ''}`}>
            {mappedTags?.map((tag: string) => {
                const tagWords = tag.split(' ');
                return (<div className="tag" key={tag}>
                    {tagWords.map((word) => <span key={word}>{word}</span>)}
                </div>)
            })}
        </div>)
    }, [mappedTags, orientation]);

    const renderLivePlayers = useCallback(() => {
        if (isSlotGame) {
            return
        }
        return (<div className="live-game-players">
            <div className="live-casino-card-name">{name}</div>
            <div className="live-casino-card-info">
                <div className="live-players-count">/</div>
                <img src={livePlayersSvg}/>
                <div className="live-players-count">{playersCount || 0}</div>
            </div>
        </div>)
    }, [isSlotGame, name, playersCount]);

    return (<div style={{width, height}} className={`game-card-wrapper ${orientation === 'horizontal' ? 'horizontal-styles' : ''}`}>
        {renderTags()}
        {renderLivePlayers()}
        <img src={imageThumbNail} />
    </div>)
}

export default GameCard;
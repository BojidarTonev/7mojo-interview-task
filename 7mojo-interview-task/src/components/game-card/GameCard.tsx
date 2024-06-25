import {useCallback, useMemo} from "react";
import defaultThumbnail from '../../assets/default_thumbnail.png';
import {ISlotData, IThumbnail} from "../../types/types/game-types";
import {SlotGameTag} from "../../types/enums/game-enums";
import {splitCamelCase} from "../../utils";
import './GameCard.scss';

interface IGameCardProps {
    orientation?: 'horizontal' | 'vertical',
    slotData?: ISlotData
    thumbnails: IThumbnail[]
    isSlotGame: boolean
}

const GameCard = (props: IGameCardProps) => {
    const { slotData, thumbnails, isSlotGame, orientation = 'vertical' } = props;
    // const { width, height, videoUrl, imageUrl } = thumbnails[0];

    const testHeight = orientation === 'vertical' ? 440 : 180;
    const textWidth = orientation === 'vertical' ? 220: 300;

    const mappedTags = useMemo(() => {
        if (!isSlotGame || !slotData) {
            return
        }
        return [`${slotData?.linesCount} Lines`, ...slotData.tags.map(tag => SlotGameTag[tag])].map(splitCamelCase)
    }, [isSlotGame, slotData]);

    const imageThumbNail = useMemo(() => {
        return thumbnails[0] ? thumbnails[0].imageUrl : defaultThumbnail;
    }, [thumbnails]);

    const renderTags = useCallback(() => {
        if (!isSlotGame) {
            return
        }
        return (<div className={`tags-wrapper ${orientation === 'horizontal' ? 'horizontal-tags-wrapper' : ''}`}>
            {isSlotGame && mappedTags?.map((tag: string) => {
                const tagWords = tag.split(' ');
                return (<div className="tag" key={tag}>
                    {tagWords.map((word) => <span key={word}>{word}</span>)}
                </div>)
            })}
        </div>)
    }, [isSlotGame, mappedTags, orientation]);

    return (<div className={`game-card-wrapper ${orientation === 'horizontal' ? 'horizontal-styles' : ''}`}>
        {renderTags()}
        <img src={imageThumbNail} width={textWidth} height={testHeight}/>
    </div>)
}

export default GameCard;
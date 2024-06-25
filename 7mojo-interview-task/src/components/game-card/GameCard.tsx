import {useMemo} from "react";
import defaultThumbnail from '../../assets/default_thumbnail.png';
import {ISlotData, IThumbnail} from "../../types/types/game-types";
import {SlotGameTag} from "../../types/enums/game-enums";
import {splitCamelCase} from "../../utils";
import './GameCard.scss';

interface IGameCardProps {
    orientation?: 'horizontal' | 'vertical',
    slotData: ISlotData
    thumbnails: IThumbnail[]
}

const GameCard = (props: IGameCardProps) => {
    const { slotData, thumbnails, orientation = 'vertical' } = props;
    // const { width, height, videoUrl, imageUrl } = thumbnails[0];

    const testHeight = orientation === 'vertical' ? 440 : 180;
    const textWidth = orientation === 'vertical' ? 220: 300;

    const mappedTags = useMemo(() => {
        return [`${slotData.linesCount} Lines`, ...slotData.tags.map(tag => SlotGameTag[tag])].map(splitCamelCase)
    }, [slotData.tags, slotData.linesCount]);

    const imageThumbNail = useMemo(() => {
        return thumbnails[0] ? thumbnails[0].imageUrl : defaultThumbnail;
    }, [thumbnails]);

    return(<div className={`game-card-wrapper ${orientation === 'horizontal' ? 'horizontal-styles' : ''}`}>
        <div className={`tags-wrapper ${orientation === 'horizontal' ? 'horizontal-tags-wrapper' : ''}`}>
            {mappedTags.map((tag: string) => {
                const tagWords = tag.split(' ');
                return(<div className="tag" key={tag}>
                    {tagWords.map((word) => <span>{word}</span>)}
                </div>)
            })}
        </div>
        <img src={imageThumbNail} width={textWidth} height={testHeight} />
    </div>)
}

export default GameCard;
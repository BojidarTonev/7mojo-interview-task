import {useMemo} from "react";
import defaultThumbnail from '../../assets/default_thumbnail.png';
import {ISlotData, IThumbnail} from "../../types/types/game-types";
import {SlotGameTag} from "../../types/enums/game-enums";
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
        return slotData.tags.map(tag => SlotGameTag[tag])
    }, [slotData.tags]);

    const imageThumbNail = useMemo(() => {
        return thumbnails[0] ? thumbnails[0].imageUrl : defaultThumbnail;
    }, [thumbnails]);

    return(<div className={`game-card-wrapper ${orientation === 'horizontal' ? 'horizontal-styles' : ''}`}>
        <div className={`tags-wrapper ${orientation === 'horizontal' ? 'horizontal-tags-wrapper' : ''}`}>
            {mappedTags.map((tag: string) => {
                return(<div className="tag" key={tag}>{tag}</div>)
            })}
        </div>
        <img src={imageThumbNail} width={textWidth} height={testHeight} />
    </div>)
}

export default GameCard;
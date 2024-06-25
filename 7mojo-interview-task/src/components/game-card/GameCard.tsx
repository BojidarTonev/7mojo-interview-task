import {ISlotData, IThumbnail} from "../../types/types/game-types";
import './GameCard.scss';

interface IGameCardProps {
    orientation?: 'horizontal' | 'vertical',
    slotData: ISlotData[]
    thumbnails: IThumbnail[]
}

const GameCard = (props: IGameCardProps) => {
    const { slotData, thumbnails, orientation = 'vertical' } = props;
    const { width, height, videoUrl, imageUrl } = thumbnails[0];

    const testHeight = orientation === 'vertical' ? 420 : 180;
    const textWidth = orientation === 'vertical' ? 240: 300;
    console.log('thumb nails => ', thumbnails)

    return(<div className={`game-card-wrapper ${orientation === 'horizontal' ? 'horizontal-styles' : ''}`}>
        <img src={imageUrl} width={textWidth} height={testHeight} />
    </div>)
}

export default GameCard;
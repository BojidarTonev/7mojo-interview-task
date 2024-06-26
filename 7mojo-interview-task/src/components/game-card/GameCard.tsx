import {useCallback, useMemo, useState} from "react";
import defaultThumbnail from '../../assets/default_thumbnail.png';
import livePlayersSvg from '../../assets/players.svg';
import {ISlotData, IThumbnail} from "../../types/types/game-types";
import {GameCategory, SlotGameTag} from "../../types/enums/game-enums";
import {getEnumEntries, splitCamelCase} from "../../utils";
import {useAppSelector} from "../../redux/store";
import './GameCard.scss';

interface IGameCardProps {
    orientation?: 'horizontal' | 'vertical',
    slotData?: ISlotData
    categories?: GameCategory[]
    thumbnails: IThumbnail[]
    isSlotGame: boolean
    name: string
    playersCount?: number
    token: string
    hostUrl: string
    clientUrl: string
}

const GameCard = (props: IGameCardProps) => {
    const { name, slotData, categories, thumbnails, isSlotGame, playersCount, token, hostUrl, clientUrl, orientation = 'vertical' } = props;
    const { operatorToken, playerToken } = useAppSelector((state) => state.authorization);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const videoUrl = thumbnails.length > 0 ? thumbnails[0].videoUrl : defaultThumbnail;
    const thumbNail = thumbnails.length > 0 ? thumbnails[0].imageUrl : defaultThumbnail;

    const height = orientation === 'vertical' ? 440 : 180;
    const width = orientation === 'vertical' ? 220: 300;

    const onGameClick = (gameToken: string, operatorToken: string, playerToken: string, host: string, client: string) => {
        const composedUrl = `${client}?gameToken=${gameToken}&operatorToken=${operatorToken}&playerToken=${playerToken}&host=${host}`;
        window.open(composedUrl, '_blank')
    };

    const mappedTags = useMemo(() => {
        if (!isSlotGame) {
            const allAvailableCategories = getEnumEntries(GameCategory);
            return allAvailableCategories.filter(category => categories?.includes(category.value)).map(el => el.key);
        }

        return [`${slotData?.linesCount} Lines`, ...(slotData || [] as ISlotData).tags.map(tag => SlotGameTag[tag])].map(splitCamelCase);
    }, [isSlotGame, slotData, categories]);

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
                <img src={livePlayersSvg as string} alt={`image-${name}`} loading="lazy" />
                <div className="live-players-count">{playersCount || 0}</div>
            </div>
        </div>)
    }, [isSlotGame, name, playersCount]);

    return (<div
        style={{width, height}}
        className={`game-card-wrapper ${orientation === 'horizontal' ? 'horizontal-styles' : ''}`}
        onClick={() => onGameClick(token, operatorToken, playerToken, hostUrl, clientUrl)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            {renderTags()}
            {renderLivePlayers()}
            <img src={thumbNail as string} alt={`image-${name}`} loading="lazy" />
            <video src={videoUrl as string} loop muted className={`video-player ${isHovered ? 'active' : ''}`}></video>
        </div>)
}

export default GameCard;
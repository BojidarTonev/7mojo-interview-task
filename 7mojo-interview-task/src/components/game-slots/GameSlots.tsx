import './GameSlots.scss';

interface IGameSlotsProps {
    games?: any[]
    elementsPerRow?: number
}

const GameSlots = (props: IGameSlotsProps) => {
    const { elementsPerRow = 4, games } = props;

    return (<div className="game-slots-wrapper">
        games come here
    </div>)
}

export default GameSlots;
import HorizontalSeparator from "../../components/horizontal-seperator/HorizontalSeparator";
import GameSlots from "../../components/game-slots/GameSlots";
import './SlotGamesPage.scss';

const SlotGamesPage = () => {
    return(<div className="slot-games-wrapper">
        <HorizontalSeparator name="Featured games" />
        <GameSlots />
        <HorizontalSeparator name="Slots"  />
        <GameSlots games={[]} />
    </div>)
};

export default SlotGamesPage;
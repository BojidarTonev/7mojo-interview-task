import {useAppDispatch, useAppSelector} from "../../redux/store";
import MojoCheckbox from "../mojo-checkbox/MojoCheckbox";
import {SlotGameTag, SlotLines} from "../../types/enums/game-enums";
import {getEnumEntries, getEnumValues, splitCamelCase} from "../../utils";
import {setSlotGamesSelectedGameFeatures, setSlotGamesSelectedLines} from "../../redux/features/games-filters-slice";
import {ILabelValuePair} from "../../types/common";
import './Filters.scss';

const Filters = () => {
    const dispatch = useAppDispatch();
    const {selectedGameFeatures, selectedLines} = useAppSelector((state) => state.gamesFilters.slotGamesFilters);

    const gameLines: string[] = getEnumValues(SlotLines);
    const gameFeatures: ILabelValuePair[] = getEnumEntries(SlotGameTag).map((el) => {
        const {key, value } = el;
        const newValue = splitCamelCase(key);
        return {
            label: newValue,
            value: value
        }
    });

    const handleGameLineChange = (label: string) => {
        const newSelectedLinesArr = selectedLines.includes(label) ? [] : [label];
        dispatch(setSlotGamesSelectedLines(newSelectedLinesArr));
    };

    const handleGameFeatureChange = (label: string) => {
        const labelVuePairElement = gameFeatures.find(gf => gf.label === label);
        const indexOfElement = selectedGameFeatures.findIndex(gf => gf.label === label);
        const newSelectedGameFeaturesArray = [...selectedGameFeatures];

        if (indexOfElement !== -1) {
            newSelectedGameFeaturesArray.splice(indexOfElement, 1);
        } else {
            newSelectedGameFeaturesArray.push(labelVuePairElement);
        }
        dispatch(setSlotGamesSelectedGameFeatures(newSelectedGameFeaturesArray));
    };

    return(<div className="filters-wrapper">
        <div className="filter-group">
            <div className="filter-group-title">Lines</div>
            {gameLines.map((el) =>
                <MojoCheckbox
                    key={el}
                    label={el}
                    checked={selectedLines.includes(el)}
                    onChange={(el) => handleGameLineChange(el)}
                />
            )}
        </div>
        <div className="filter-group">
            <div className="filter-group-title">Game Features</div>
            {gameFeatures.map((el) =>
                <MojoCheckbox
                    key={el.label}
                    label={el.label}
                    checked={selectedGameFeatures.some(gf => gf.value === el.value)}
                    onChange={(el) => handleGameFeatureChange(el)}
                />
            )}
        </div>
    </div>)
}

export default Filters;
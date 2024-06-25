import MojoCheckbox from "../mojo-checkbox/MojoCheckbox";
import {SlotGameTag, SlotLines} from "../../types/enums/game-enums";
import {getEnumValues, splitCamelCase} from "../../utils";
import {useState} from "react";
import './Filters.scss';

interface IFilterProps {}

const Filters = (props: IFilterProps) => {
    const gameLines = getEnumValues(SlotLines);
    const gameFeatures = getEnumValues(SlotGameTag).map(splitCamelCase);

    const [selectedGameLines, setSelectedGameLines] = useState<string[]>([]);
    const [selectedGameFeatures, setSelectedGameFeatures] = useState<string[]>([]);

    const handleGameLineChange = (label: string) => {
        setSelectedGameLines(prevLines =>
            prevLines.includes(label) ? [] : [label] // Toggle selection
        );
    };

    const handleGameFeatureChange = (label: string) => {
        setSelectedGameFeatures(prevFeatures =>
            prevFeatures.includes(label)
            ? prevFeatures.filter(feature => feature !== label) // remove if already selected
            : [...prevFeatures, label] // add if not selected
        )
    };

    return(<div className="filters-wrapper">
        <div className="filter-group">
            <div className="filter-group-title">Lines</div>
            {gameLines.map((el) =>
                <MojoCheckbox
                    key={el}
                    label={el}
                    checked={selectedGameLines.includes(el)}
                    onChange={(el) => handleGameLineChange(el)}
                />
            )}
        </div>
        <div className="filter-group">
            <div className="filter-group-title">Game Features</div>
            {gameFeatures.map((el) =>
                <MojoCheckbox
                    key={el}
                    label={el}
                    checked={selectedGameFeatures.includes(el)}
                    onChange={(el) => handleGameFeatureChange(el)}
                />
            )}
        </div>
    </div>)
}

export default Filters;
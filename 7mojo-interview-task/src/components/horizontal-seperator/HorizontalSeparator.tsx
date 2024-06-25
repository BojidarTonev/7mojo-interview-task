import React from 'react';
import MojoButton from "../mojo-button/MojoButton";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {setSlotGamesOpenedFilter} from "../../redux/features/games-filters-slice";
import './HorizontalSeperator.scss';

interface IHorizontalSeparatorProps {
    name: string;
    hasFilter?: boolean
}

const HorizontalSeparator = (props: IHorizontalSeparatorProps) => {
    const { name, hasFilter = false } = props;
    const dispatch = useAppDispatch();
    const {hasOpenedFilter} = useAppSelector((state) => state.gamesFilters.slotGamesFilters);

    const onFilterButtonClick = () => {
        dispatch(setSlotGamesOpenedFilter(!hasOpenedFilter));
    }

    return (<div className="separator-wrapper">
        <div className="separator-name">{name}</div>
        {hasFilter && <MojoButton text="Filter" onClick={onFilterButtonClick} icon={hasOpenedFilter ? faAngleUp : faAngleDown} />}
    </div>)
}

export default HorizontalSeparator
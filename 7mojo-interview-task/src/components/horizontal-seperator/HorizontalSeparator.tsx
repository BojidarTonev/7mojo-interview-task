import React from 'react';
import MojoButton from "../mojo-button/MojoButton";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import './HorizontalSeperator.scss';

interface IHorizontalSeparatorProps {
    name: string;
    hasFilter?: boolean
    onFilterClick?: () => void;
    isFilterOpened?: boolean
}

const HorizontalSeparator = (props: IHorizontalSeparatorProps) => {
    const { name, hasFilter = false, onFilterClick, isFilterOpened } = props;

    return (<div className="separator-wrapper">
        <div className="separator-name">{name}</div>
        {hasFilter && onFilterClick && <MojoButton text="Filter" onClick={onFilterClick} icon={isFilterOpened ? faAngleUp : faAngleDown} />}
    </div>)
}

export default HorizontalSeparator
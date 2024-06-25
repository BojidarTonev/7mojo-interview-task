import React from 'react';
import './HorizontalSeperator.scss';

interface IHorizontalSeparatorProps {
    name: string;
    widget?: React.ComponentType
}

const HorizontalSeparator = (props: IHorizontalSeparatorProps) => {
    const { name } = props;

    return (<div className="separator-wrapper">
        <div className="separator-name">{name}</div>
        {/*<div className="separator-widget">{widget}</div>*/}
    </div>)
}

export default HorizontalSeparator
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import './MojoButton.scss';

interface IMojoButtonProps {
    text: string
    onClick: () => void
    icon?: IconProp;
}

const MojoButton = (props: IMojoButtonProps) => {
    const {text, onClick, icon} = props;

    return(<button onClick={onClick} className="mojo-button-wrapper">
        {text}
        {icon && <FontAwesomeIcon icon={icon} />}
    </button>)
}

export default MojoButton;
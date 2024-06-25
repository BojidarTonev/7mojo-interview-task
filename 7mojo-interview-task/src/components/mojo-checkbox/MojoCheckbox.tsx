import './MojoCheckbox.scss';

interface IMojoCheckboxProps {
    label: string
    checked: boolean
    onChange: (el: string) => void
}

const MojoCheckbox = (props: IMojoCheckboxProps) => {
    const {label, checked, onChange} = props;
    return(<div className="mojo-checkbox-wrapper">
        <input type="checkbox" checked={checked} onChange={() => onChange(label)} />
        <span>{label}</span>
    </div>)
}

export default MojoCheckbox;
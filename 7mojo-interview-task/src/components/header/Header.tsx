import logo from '../../assets/logo.png';
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../redux/store";
import './Header.scss';

const Header = () => {
    const { playerInfo, error } = useAppSelector((state) => state.authorization);

    const { username, currency, balance } = playerInfo || {};

    if (error) {
        return(<div>{error}</div>)
    }
    return (<>
        <div className="header-wrapper">
            <img src={logo} alt="7mojo-logo" height={80} width={100}/>
            <div style={{ width: 100 }}></div>
            <nav>
                <NavLink to="/live-casino-games">Live Casino Games</NavLink>
                <NavLink to="/slot-games">Slot Games</NavLink>
            </nav>
            {playerInfo ? (<div className="user-information">
                <span className="user-name">{username},</span>
                <span className="user-amount"> {balance} {currency}</span>
            </div>) : (<div>Loading player information...</div>)}
        </div>
    </>);
};

export default Header;
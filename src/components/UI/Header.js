import classes from './Header.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faSearch} from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useWindowScroll } from 'react-use';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { headerNameActions } from '../../store/header-slice';
import { loginActions } from '../../store/login-slice';

const Header = (props) => {
    const {y} = useWindowScroll();
    const location = useLocation();
    const path = location.pathname;
    const checkHeaderClass = useSelector(state => state.heading.classing);
    const logged = useSelector(state => state.login.logged);
    const dispatch = useDispatch();
    let names;

    useEffect(() => {
        if(path === '/'){
            if(y >= 100) {
                dispatch(headerNameActions.changeToFirst());
            }
            else if(y < 100){
                dispatch(headerNameActions.changeToSecond());
            }
        }
        else if(path !== '/'){
            dispatch(headerNameActions.changeToThird());
        }
        
    }, [y, path, dispatch, names]);

    const logoutHandler = () => {
        dispatch(loginActions.setLogout());
        dispatch(loginActions.setToken({token: ''}));
        localStorage.removeItem('token');
        dispatch(loginActions.showLogout());
    }

    if(checkHeaderClass === 'first'){
        names = classes.fixed;
    }
    if(checkHeaderClass === 'second'){
        names = classes.navigation;
    }
    if(checkHeaderClass === 'third'){
        names = classes.navbar
    }

    const checkActive = (navData) => navData.isActive ? classes.active : classes.list;


    return (
        <nav className={names}>
            <ul className={classes.unordered}>
                <li onClick={props.onDropClick} className={classes.list}><FontAwesomeIcon icon={faBars}></FontAwesomeIcon></li>
                <li><NavLink className={checkActive} to='/'>Home</NavLink></li>
                {!logged && <li><NavLink className={checkActive} to='/login'>Login</NavLink></li>}
                {logged && <li onClick={logoutHandler}><NavLink className={classes.list} to='/'>Logout</NavLink></li>}
                <li><Link className={classes.link} to='/search'><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></Link></li>
            </ul>
        </nav>
    )
}

export default Header;
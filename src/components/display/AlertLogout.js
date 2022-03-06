import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../../store/login-slice';
import classes from './AlertLogout.module.css'

const AlertLogout = () => {
    const isLog = useSelector(state => state.login.logoutDisplay);
    const dispatch = useDispatch();

    const hideMessageHandler = () => {
        dispatch(loginActions.hideLogout());
    }
    return(
        <div className={isLog === false ? classes.logoutNone : classes.logoutAll}>
            <div className={classes.logoutContainer}>
                <h1>Message</h1>
                <div className={classes.hr}></div>
                <p>You Have Logged Out successfully</p>
                <button onClick={hideMessageHandler}>Okay</button>
            </div>
        </div>
    )
}

export default AlertLogout;
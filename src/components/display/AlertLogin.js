import classes from './AlertLogout.module.css';

const AlertLogin = (props) => {
    const notLogged = props.shouldLogin;

    const hideAlertHandler = () => {
        props.hideAlerting();
    }

    return(
        <div className={notLogged === false ? classes.logoutNone : classes.logoutAll}>
            <div className={classes.logoutContainer}>
                <h1>Message</h1>
                <div className={classes.hr}></div>
                <p>Please Login To Add Items to your cart</p>
                <button onClick={hideAlertHandler}>Okay</button>
            </div>
        </div>
    )

};

export default AlertLogin;
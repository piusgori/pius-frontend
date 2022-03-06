import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

import classes from './LoginForm.module.css';

const ResetForm = () => {
    const url = 'http://localhost:8000';
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState('first');
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');

    const emailChangeHandler = (event) => {setEmail(event.target.value)};
    const numberChangeHandler = (event) => {setNumber(event.target.value)}

    const isClickable = email !== '';
    const isNumberClickable = number !== '';
    const isPasswordClickable = newPassword !== '' && confirmPassword !== '';

    const sendEmailHandler = () => {
        setLoading(true);
        setPage('second');
        const user = ({email: email})
        fetch(`${url}/reset`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(user)
        }).then(response => {
            return response.json();
        }).then(responseData => {
            if(responseData.errorMessage){
                setIsError(true);
                setError(responseData.errorMessage);
            } else if(!responseData.errorMessage){
                setIsError(false);
                setError('');
            }
            setLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }

    const checkCodeHandler = () => {
        setLoading(true);
        setPage('third');
        const userCode = {email: email, code: number};
        fetch(`${url}/checkCode`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(userCode)
        }).then(response => {
            return response.json();
        }).then(responseData => {
            if(responseData.errorMessage){
                setIsError(true);
                setError(responseData.errorMessage)
            } else if(!responseData.errorMessage){
                setIsError(false);
                setError('');
            }
            setLoading(false);
        }).catch(err => {console.log(err)})
    }

    const setNewPasswordHandler = () => {
        setLoading(true);
        setPage('fourth');
        const userPasswordReset = {email: email, password: newPassword, confirmPassword: confirmPassword};
        fetch(`${url}/setNewPassword`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(userPasswordReset)
        }).then(response => {
            return response.json()
        }).then(responseData => {
            console.log(responseData);
            if(responseData.errorMessage){
                setIsError(true);
                setError(responseData.errorMessage)
            } else if(!responseData.errorMessage){
                setIsError(false);
                setError('');
            }
            setLoading(false);
        }).catch(err => {console.log(err)})
    }

    const passwordChangeHandler = (event) => {
        setNewPassword(event.target.value);
    }

    const confirmPasswordChangeHandler = (event) => {
        setConfirmPassword(event.target.value);
    }

    const retrySendingHandler = () => {
        setPage('first');
        setIsError(false);
        setError('');
    }

    const retrySecondSendingHandler = () => {
        setPage('second');
        setIsError(false);
        setError('');
    }

    const retryThirdSendingHandler = () => {
        setPage('third');
        setIsError(false);
        setError('');
    }

    let displayPage;

    const showError = (
        <div className={classes.errorDiv}>
            <p>{isError && error}</p>
        </div>
    )

    const firstPage = (
        <div>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && <div className={classes.container}>
                <div className={classes.lForm}>
                    <label className={classes.ll} htmlFor='email'>Enter your email to get the reset code</label>
                    <input onChange={emailChangeHandler} value={email} className={classes.li} type='email' name='email' placeholder='Enter your E-Mail'></input>
                    {isClickable === true ? <button onClick={sendEmailHandler} className={classes.lb}>Send Code</button> : <button className={classes.lUnableClick} disabled>Send Code</button>}
                </div>
            </div>}
        </div>
    )

    const secondPage = (
        <div>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && <div className={classes.container}>
                <div className={classes.lForm}>
                    <label className={classes.ll} htmlFor='number'>Enter the 5-digit code sent to your email</label>
                    <input onChange={numberChangeHandler} className={classes.li} type='number' name='number' placeholder='Enter The Reset Code'></input>
                    {isNumberClickable === true ? <button onClick={checkCodeHandler} className={classes.lb}>Proceed</button> : <button className={classes.lUnableClick} disabled>Proceed</button>}
                </div>
            </div>}
        </div>
    )

    const secondError = (
        <div>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && <div className={classes.container}>
                <p className={classes.lup}>There is an error detected. Please check it below</p>
                {isError && showError}
                <button onClick={retrySendingHandler} className={classes.lb}>Try Again</button>
            </div>}
        </div>
    )

    const thirdPage = (
        <div>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && <div className={classes.container}>
                <div className={classes.lForm}>
                    <label className={classes.ll} htmlFor='newPassword'>Enter your new password</label>
                    <input className={classes.li} onChange={passwordChangeHandler} value={newPassword} type='password' name='password' placeholder='Enter New Password'></input>
                    <label className={classes.ll} htmlFor='confirmPassword'>Confirm your password</label>
                    <input className={classes.li} onChange={confirmPasswordChangeHandler} value={confirmPassword} type='password' name='confirmPassword' placeholder='Confirm Your Password'></input>
                    {isPasswordClickable === true ? <button onClick={setNewPasswordHandler} className={classes.lb}>Proceed</button> : <button className={classes.lUnableClick} disabled>Proceed</button>}
                </div>
            </div>}
        </div>
    )

    const thirdError = (
        <div>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && <div className={classes.container}>
                <p className={classes.lup}>There is an error detected. Please check it below</p>
                {isError && showError}
                <button onClick={retrySecondSendingHandler} className={classes.lb}>Try Again</button>
            </div>}
        </div>
    )

    const fourthPage =(
        <div>
                {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
                {!loading && <div className={classes.container}>
                    <div className={classes.lForm}>
                        <h1 className={classes.ll}>Password changed successfully. Please use your newly set password to login to your account.</h1>
                        <button className={classes.lb}><Link className={classes.link} to='/login'>Login</Link></button>
                    </div>
                </div>}
            </div>
    )

    const fourthError = (
        <div>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && <div className={classes.container}>
                <p className={classes.lup}>There is an error detected. Please check it below</p>
                {isError && showError}
                <button onClick={retryThirdSendingHandler} className={classes.lb}>Try Again</button>
            </div>}
        </div>
    )

    if(page === 'first'){
        displayPage = firstPage;
    } else if(page === 'second' && !isError){
        displayPage = secondPage;
    } else if(page === 'second' && isError){
        displayPage = secondError;
    } else if(page === 'third' && !isError){
        displayPage = thirdPage;
    } else if(page === 'third' && isError){
        displayPage = thirdError;
    } else if(page === 'fourth' && !isError){
        displayPage = fourthPage;
    } else if(page === 'fourth' && isError){
        displayPage = fourthError;
    }

    return (
        <Fragment>
            {displayPage}
        </Fragment>
    )
}

export default ResetForm;
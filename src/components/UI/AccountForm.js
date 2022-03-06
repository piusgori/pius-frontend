import classes from './AccountForm.module.css';
import { useEffect, useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import { useDispatch, useSelector } from 'react-redux';
import { accountActions } from '../../store/account-slice';
import AccountFormItem from './AccountFormItem';
import Loading from './Loading';

const AccountForm = (props) => {
    const url = props.url;
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isError, setIsError] = useState('none');
    const [message, setMessage] = useState('');

    const [displayChangePassword, setDisplayChangePassword] = useState(false);

    const enablePasswordChange = () => {
        setDisplayChangePassword(!displayChangePassword);
    }

    const deleteLoadingHandler = (loadValue) => {
        setLoading(loadValue);
    }

    const settingTheMessageForDelete = (condition, deleteMessage) => {
        setIsError(condition);
        setMessage(deleteMessage);
    }

    const oldPasswordChangeHandler = (event) => {setOldPassword(event.target.value)};
    const newPasswordChangeHandler = (event) => {setNewPassword(event.target.value)};
    const confirmPasswordChangeHandler = (event) => {setConfirmPassword(event.target.value)};

    const isClickable = oldPassword.length >= 8 && newPassword.length >= 8 && confirmPassword.length >= 8;

    const token = localStorage.getItem('token');

    useEffect(() => {
        if(token){
            setLoading(true);
            fetch(`${url}/account`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token: token})
            }).then(response => {
                return response.json();
            }).then(responseData => {
                console.log(responseData);
                if(responseData.products){
                    dispatch(accountActions.setProducts(responseData.products));
                    dispatch(accountActions.setPerson('admin'));
                } else if(responseData.products){
                    dispatch(accountActions.setPerson('user'));
                }
                dispatch(accountActions.setAccount(responseData.account));
                setLoading(false);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [dispatch, token, url])
    

    const person = useSelector(state => state.account.person);
    const account = useSelector(state => state.account.account);
    const products = useSelector(state => state.account.products);

    const successHeading = (
        <h1 className={classes.successHeading}>{message}</h1>
    )

    const failureHeading = (
        <h1 className={classes.failureHeading}>{message}</h1>
    )

    const alertLogin = (
        <div className={classes.accountContainer}>
            <h1 className={classes.accountLogin}>Please Login To Your Account!</h1>
        </div>
    )

    const enableLoading = (
        <div className={classes.accountContainer}>
            <div className={classes.iconLoading}><Loading></Loading></div>
        </div>
    )

    const changePasswordHandler = () => {
        setLoading(true);
        fetch(`${url}/change-password`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({token: token, oldPassword: oldPassword, newPassword: newPassword, confirmPassword: confirmPassword})
        }).then(response => {
            return response.json();
        }).then(responseData => {
            if(!responseData.errorMessage){
                setIsError('false');
                setMessage(responseData.message);
            } else if(responseData.errorMessage){
                setIsError('true');
                setMessage(responseData.errorMessage);
            }
            setLoading(false);
        }).catch(err => {
            console.log(err);
        });
    }

    let theDisplayMessage;

    if(isError === 'true'){
        theDisplayMessage = failureHeading;
    } else if(isError === 'false'){
        theDisplayMessage = successHeading;
    }

    const displayThePageForPasswordChange = (
        <div className={classes.changePasswordForm}>
            {isError !== 'none' && theDisplayMessage}
            <label className={classes.changePasswordLabel} htmlFor='current-password'>Current Password</label>
            <input onChange={oldPasswordChangeHandler} type='password' className={classes.changePasswordInput}></input>
            <label className={classes.changePasswordLabel} htmlFor='new-password'>New Password</label>
            <input onChange={newPasswordChangeHandler} type='password' className={classes.changePasswordInput}></input>
            <label className={classes.changePasswordLabel} htmlFor='new-password'>Confirm New Password</label>
            <input onChange={confirmPasswordChangeHandler} type='password' className={classes.changePasswordInput}></input>
            {isClickable === true ? <button onClick={changePasswordHandler} className={classes.accountPChange}>Submit</button> : <button disabled className={classes.accountPDisable}>Submit</button>}
        </div>
    )

    const adminProductSection = (
        <div className={classes.insideProducts}>
            <h2 className={classes.accountHeading}>My Products</h2>
            <hr className={classes.accountRuling}></hr>
            <div className={classes.accountProductsBody}>
                {products.map(product => {
                    return(
                        <AccountFormItem settingTheMessageForDelete={settingTheMessageForDelete} deleteLoadingHandler={deleteLoadingHandler} id={product._id} key={product._id} url={url} title={product.title} discount={product.discount} price={product.price} discountPrice={product.discountPrice} imageUrl={product.imageUrl}></AccountFormItem>
                    )
                })}
            </div>
        </div>
    )

    const topDisplacement = (
        <div className={classes.accountContainer}>
            <div className={classes.insideAccount}>
                <h1 className={classes.accountHeading}>My Account</h1>
                <hr className={classes.accountRuling}></hr>
                <div className={classes.accountDetail}>
                    <p className={classes.accountLabel}>Name: <span className={classes.accountData}>{account.name}</span></p>
                    <p className={classes.accountLabel}>Email: <span className={classes.accountData}>{account.email}</span></p>
                    <p className={classes.accountLabel}>Username: <span className={classes.accountData}>{account.username}</span></p>
                    <p className={classes.accountLabel}>Type: <span className={classes.accountData}>{person}</span></p>
                    <button onClick={enablePasswordChange} className={classes.accountPChange}>Change Password</button>
                    {displayChangePassword && displayThePageForPasswordChange}
                </div>
            </div>
            {person === 'admin' && adminProductSection}
        </div>
    )

    let displayPage;

    if(!token){
        displayPage = alertLogin;
    } else {
        displayPage = topDisplacement;
    }


    return(
        <Fragment>
            {loading && enableLoading}
            {!loading && displayPage}
        </Fragment>
    )
};

export default AccountForm;
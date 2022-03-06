import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './LoginForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../../store/login-slice';
import Loading from './Loading';

const LoginForm = (props) => {
    const url = props.url;

    const[who, setWho] = useState('');
    const[page, setPage] = useState('first');
    const[loading, setLoading] = useState(false);
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[isError, setIsError] = useState(false);
    const[errors, setErrors] = useState('');

    const logged = useSelector(state => state.login.logged);

    const dispatch = useDispatch();

    const setForUserHandler = () => {setLoading(true); setWho('user'); setPage('second'); setLoading(false)}
    const setForAdminHandler = () => {setLoading(true); setWho('admin'); setPage('second'); setLoading(false)}

    const usernameChangeHandler = (event) => {setUsername(event.target.value)};
    const passwordChangeHandler = (event) => {setPassword(event.target.value)};
    
    const validationHandler = () => {
        if(who === 'user'){
            setLoading(true);
            setPage('third');
            const user = {username: username, password: password};
            fetch(`${url}/userLogin`, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(user)
            }).then(response => 
                response.json()
            ).then(responseData => {
                if(responseData.errorMessage){
                    setIsError(true);
                    setErrors(responseData.errorMessage);
                } else if(!responseData.errorMessage){
                    setIsError(false);
                    setErrors('');
                    dispatch(loginActions.setLogin());
                    dispatch(loginActions.setToken({token: responseData.token}));
                    dispatch(loginActions.setPerson({person: 'user'}));
                    localStorage.setItem('token', responseData.token);
                    localStorage.setItem('person', 'user');
                }
                setLoading(false)
            }).catch(err => {console.log(err)})
        }
        if(who === 'admin'){
            setLoading(true);
            setPage('third');
            const user = {username: username, password: password};
            fetch(`${url}/adminLogin`, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(user)
            }).then(response => 
                response.json()
            ).then(responseData => {
                if(responseData.errorMessage){
                    setIsError(true);
                    setErrors(responseData.errorMessage);
                } else if(!responseData.errorMessage){
                    setIsError(false);
                    setErrors('');
                    dispatch(loginActions.setLogin());
                    dispatch(loginActions.setToken({token: responseData.token}));
                    dispatch(loginActions.setPerson({person: 'admin'}));
                    localStorage.setItem('token', responseData.token);
                    localStorage.setItem('person', 'admin');
                }
                setLoading(false)
            }).catch(err => {console.log(err)})
        }
    }

    const tryAgainHandler = () => {
        setPage('second');
        setIsError(false);
        setErrors('');
    }

    const isUser = who === 'user';
    const isClickable = username !== '' && password !=='';

    let displayPage;

    const chooseFirstPage = (
        <div>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && <div className={classes.container}>
                <p onClick={setForUserHandler} className={classes.lp}>Are You A User?</p>
                <p onClick={setForAdminHandler} className={classes.lp}>Are You An Admin?</p>
            </div>}
        </div>
    )

    const alreadyLogged = (
        <div>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && <div className={classes.container}>
                <p className={classes.lup}>You are already logged in!</p>
                <button className={classes.lb}><Link className={classes.link} to='/'>Home</Link></button>
            </div>}
        </div>
    )

    let firstPage;

    if(logged){
        firstPage = alreadyLogged;
    } else if(!logged){
        firstPage = chooseFirstPage;
    }

    const secondPage = 
    (
        <div>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && <div className={classes.container}>
                <p className={classes.lup}>Login for <span className={classes.lusp}>{isUser ? 'User' : 'Admin'}</span></p>
                <div className={classes.lForm}>
                    <label className={classes.ll} htmlFor='username'>Username</label>
                    <input onChange={usernameChangeHandler} className={classes.li} type='text' name='username' value={username} placeholder='Enter your Username'></input>
                    <label className={classes.ll} htmlFor='password'>Password</label>
                    <input onChange={passwordChangeHandler} className={classes.li} type='password' name='password' value={password} placeholder='Enter Your Password'></input>
                    {isClickable === true ? <button onClick={validationHandler} className={classes.lb}>Login</button> : <button className={classes.lUnableClick} disabled>Login</button>}
                </div>
                <div className={classes.buttons}>
                    <Link className={classes.lp} to='/reset'>Forgotten Password?</Link>
                    <Link className={classes.lp} to='/signup'>Are You New?</Link>
                </div>
            </div>}
        </div>
    )

    const showError = (
        <div className={classes.errorDiv}>
            <p>{isError && errors}</p>
        </div>
    )

    let thirdPage;

    const allowed = (
        <div>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && <div className={classes.container}>
                <p className={classes.lup}>You have logged in successfully</p>
                <button className={classes.lb}><Link className={classes.link} to='/'>Home</Link></button>
            </div>}
        </div>
    )

    const notAllowed = (
        <div>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && <div className={classes.container}>
                <p className={classes.lup}>Error Logging in. Please check it below</p>
                {isError && showError}
                <button onClick={tryAgainHandler} className={classes.lb}>Try Again</button>
            </div>}
        </div>
    )

    if(isError){
        thirdPage = notAllowed;
    } else if(!isError) {
        thirdPage = allowed;
    }

    if(page === 'first'){
        displayPage = firstPage;
    } else if(page === 'second'){
        displayPage = secondPage;
    } else if(page === 'third'){
        displayPage = thirdPage;
    }


    return(
        <div>
            {displayPage}
        </div>
    )
}

export default LoginForm;
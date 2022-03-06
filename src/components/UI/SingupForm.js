import classes from './LoginForm.module.css';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Loading from './Loading';

const SignupForm = (props) => {

    const url = props.url;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [choice, setChoice] = useState('User');
    const [service, setService] = useState('Services');
    const [genre, setGenre] = useState('');
    const [phone, setPhone] = useState('');
    const [isClickable, setIsClickable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState('first');
    const [isError, setIsError] = useState(false);
    const [errors, setErrors] = useState('');


    const nameChangeHandler = (event) => {setName(event.target.value)};
    const emailChangeHandler = (event) => {setEmail(event.target.value)};
    const usernameChangeHandler = (event) => {setUsername(event.target.value)};
    const passwordChangeHandler = (event) => {setPassword(event.target.value)};
    const confirmPasswordChangeHandler = (event) => {setConfirmPassword(event.target.value)};
    const choiceChangeHandler = (event) => {setChoice(event.target.value)};
    const serviceChangeHandler = (event) => {setService(event.target.value)};
    const genreChangeHandler = (event) => {setGenre(event.target.value)};
    const phoneChangeHandler = (event) => {setPhone(event.target.value)};

    let clicking;
    clicking  = name !== '' && email !== '' && username !== '' && password !== '' && confirmPassword !== '';
    
    useEffect(() => {
        if(clicking){
            setIsClickable(true)
        } 
        if(!clicking){
            setIsClickable(false)
        }
    }, [clicking])


    const secondPageHandler = () => {
        setLoading(true);
        setPage('second');
        setLoading(false);
    }

    const thirdPageHandler = () => {
        setLoading(true);
        setPage('third');
        if(choice === 'User'){
            const newUser = {name: name, email: email, password: password, username: username, confirmPassword: confirmPassword};
            fetch(`${url}/userSignup`, {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {'Content-Type' : 'application/json'},
            }).then(response => {
                return response.json();
            }).then(responseData => {
                console.log(responseData);
                if(responseData.errorMessage){
                    setIsError(true);
                    setErrors(responseData.errorMessage);
                }
                else if(!responseData.errorMessage){
                    setIsError(false);
                    setErrors('');
                }
                setLoading(false);
            }).catch(err => {console.log(err)})
        }
        if(choice === 'Admin'){
            setLoading(false);
        }
    }

    const fourthPageHandler = () => {
        setLoading(true);
        setPage('fourth');
        setLoading(false);
    }

    const fifthPageHandler = () => {
        setLoading(true);
        setPage('fifth');
        const admin = {name: name, email: email, password: password, confirmPassword: confirmPassword, username: username, service: service, phone: phone, genre: genre};
        console.log('started');
        fetch(`${url}/adminSignup`, {
            method: 'POST',
            body: JSON.stringify(admin),
            headers: {'Content-Type' : 'application/json'},
        }).then(response => {
            return response.json()
        }).then(responseData => {
            if(responseData.errorMessage){
                setIsError(true);
                setErrors(responseData.errorMessage);
            }
            else if(!responseData.errorMessage){
                setIsError(false);
                setErrors('');
            }
            setLoading(false);
        }).catch(err => {console.log(err)})
    }

    const tryAgainHandler = () => {
        setPage('first');
        setIsError(false);
        setErrors('');

    }

    const showError = (
        <div className={classes.errorDiv}>
            <p>{isError && errors}</p>
        </div>
    )

    const firstPage = (
        <div>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && <div className={classes.container}>
                <div className={classes.lForm}>
                    {isError && showError}
                    <label className={classes.ll} htmlFor='name'>Name</label>
                    <input onChange={nameChangeHandler} className={classes.li} type='text' name='name' value={name} placeholder='Enter your Name'></input>
                    <label className={classes.ll} htmlFor='email'>E-Mail</label>
                    <input onChange={emailChangeHandler} className={classes.li} type='email' name='email' value={email} placeholder='Enter your E-Mail'></input>
                    <label className={classes.ll} htmlFor='username'>Username</label>
                    <input onChange={usernameChangeHandler} className={classes.li} type='text' name='username' value={username} placeholder='Enter your Username'></input>
                    <label className={classes.ll} htmlFor='password'>Password</label>
                    <input onChange={passwordChangeHandler} className={classes.li} type='password' name='password' value={password} placeholder='Enter Your Password'></input>
                    <label className={classes.ll} htmlFor='password'> Confirm Password</label>
                    <input onChange={confirmPasswordChangeHandler} className={classes.li} type='password' name='password'value={confirmPassword} placeholder='Confirm Your Password'></input>
                    {isClickable === true ? <button onClick={secondPageHandler} className={classes.lb}>Create</button> : <button className={classes.lUnableClick} disabled>Create</button>}
                </div>
                <div className={classes.buttons}>
                    <Link className={classes.lp} to='/login'>Already Have an Account?</Link>
                </div>
            </div>}
        </div>
    )

    const secondPage = (
        <div>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && <div className={classes.container}>
                <div className={classes.lForm}>
                    <label className={classes.ll} htmlFor='purpose'>Who would you like to be</label>
                    <select onChange={choiceChangeHandler} name='purpose' className={classes.li}>
                        <option className={classes.lo}>User</option>
                        <option className={classes.lo}>Admin</option>
                    </select>
                    <button onClick={thirdPageHandler} className={classes.lb}>Proceed</button>
                </div>
            </div>}
        </div>
    )

    let thirdPage;

    if(choice === 'User' && !isError){
        thirdPage = (
            <div>
                {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
                {!loading && <div className={classes.container}>
                    <div className={classes.lForm}>
                        <h1 className={classes.ll}>We welcome you to our community!</h1>
                        <button className={classes.lb}><Link className={classes.link} to='/login'>Login</Link></button>
                    </div>
                </div>}
            </div>
        )
    } else if(choice === 'User' && isError){
        thirdPage = (
            <div>
                {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
                {!loading && <div className={classes.container}>
                    <div className={classes.lForm}>
                        <h1 className={classes.ll}>Ooops! Some information you entered were invalid as stated below!</h1>
                        {isError && showError}
                        <button onClick={tryAgainHandler} className={classes.lb}>Try Again</button>
                    </div>
                </div>}
            </div>
        )

    } else if (choice === 'Admin'){
        thirdPage = (
            <div>
                {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
                {!loading && <div className={classes.container}>
                    <div className={classes.lForm}>
                        <label className={classes.ll} htmlFor='service'>Do you sell good or services</label>
                        <select onChange={serviceChangeHandler} value={service} className={classes.li} name='service'>
                            <option className={classes.lo}>Goods</option>
                            <option className={classes.lo}>Services</option>
                        </select>
                        <button onClick={fourthPageHandler} className={classes.lb}>Proceed</button>
                    </div>
                </div>}
            </div>
        )
    }

    let fourthPage;

    if(service === 'Goods'){
        fourthPage = (
            <div>
                {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
                {!loading && <div className={classes.container}>
                    <div className={classes.lForm}>
                        <label className={classes.ll} htmlFor='genre'>What kind of goods?</label>
                        <input onChange={genreChangeHandler} value={genre} className={classes.li} type='text' name='genre' placeholder='Enter The Genre Of Goods'></input>
                        <label className={classes.ll} htmlFor='phone'>Enter your WhatsApp phone number</label>
                        <input onChange={phoneChangeHandler} value={phone} className={classes.li} type='number' name='phone' placeholder='Enter Your Phone Number...eg 0712345678'></input>
                        <button onClick={fifthPageHandler} className={classes.lb}>Proceed</button>
                    </div>
                </div> }
            </div>
        )
    } else if(service === 'Services'){
        fourthPage = (
            <div>
                {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
                {!loading && <div className={classes.container}>
                    <div className={classes.lForm}>
                        <label className={classes.ll} htmlFor='genre'>Which services do you offer?</label>
                        <input onChange={genreChangeHandler} value={genre} className={classes.li} type='text' name='genre' placeholder='Enter The Genre Of Goods'></input>
                        <label className={classes.ll} htmlFor='phone'>Enter your WhatsApp phone number</label>
                        <input onChange={phoneChangeHandler} value={phone} className={classes.li} type='number' name='phone' placeholder='Enter Your Phone Number...eg 0712345678'></input>
                        <button onClick={fifthPageHandler} className={classes.lb}>Proceed</button>
                    </div>
                </div> }
            </div>
        )
    }

    let fifthPage;

    if(choice === 'Admin' && !isError){
        fifthPage = (
            <div>
                {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
                {!loading && <div className={classes.container}>
                    <div className={classes.lForm}>
                        <h1 className={classes.ll}>Thank you for choosing us as your shopping partner</h1>
                        <h1 className={classes.ll}>Please Login to add your products to sell</h1>
                        <button className={classes.lb}><Link className={classes.link} to='/login'>Login</Link></button>
                    </div>
                </div>}
            </div>
        )
    } else if(choice === 'Admin' && isError){
        fifthPage = (
            <div>
                {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
                {!loading && <div className={classes.container}>
                    <div className={classes.lForm}>
                        <h1 className={classes.ll}>Ooops! Some information you entered were invalid as stated below!</h1>
                        {isError && showError}
                        <button onClick={tryAgainHandler} className={classes.lb}><Link className={classes.link} to='/signup'>Try Again</Link></button>
                    </div>
                </div>}
            </div>
        )

    }


    let display;
    if(page === 'first'){
        display = firstPage;
    } else if(page === 'second'){
        display = secondPage;
    } else if(page === 'third'){
        display = thirdPage;
    } else if(page === 'fourth'){
        display = fourthPage;
    } else if(page === 'fifth'){
        display = fifthPage;
    }

    return(
        <div>
            {display}
        </div>
    )
}

export default SignupForm;
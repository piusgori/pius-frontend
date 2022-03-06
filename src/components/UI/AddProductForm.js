import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import Loading from './Loading';
import classes from './LoginForm.module.css';

const AddProductForm = (props) => {
    const url = props.url;

    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errors, setErrors] = useState('');
    const [page, setPage] = useState('first');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('Foodstuff');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const logged = useSelector(state => state.login.logged);
    const loggedToken = useSelector(state => state.login.token);
    const person = localStorage.getItem('person');

    const isLoggedIn = logged === true && loggedToken !== '' && person === 'admin';

    const isClickable = title.length > 0 && category !== '' && price.length > 0 && description.length >= 10 && image !== '';

    const titleChangeHandler = (event) => {setTitle(event.target.value)}
    const categoryChangeHandler = (event) => {setCategory(event.target.value)}
    const priceChangeHandler = (event) => {setPrice(event.target.value)}
    const descriptionChangeHandler = (event) => {setDescription(event.target.value)}
    const imageChangeHandler = (event) => {setImage(event.target.files[0])};

    const addProductHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        setPage('second');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('token', loggedToken);
        formData.append('image', image);
        fetch(`${url}/add-product`, {method: 'POST', body: formData}).then(response => {
            return response.json();
        }).then(responseData => {
            if(responseData.errorMessage){
                setIsError(true);
                setErrors(responseData.errorMessage);
            } else if(!responseData.errorMessage){
                setIsError(false);
                setErrors('');
            }
            setLoading(false);
        }).catch(err => console.log(err))
    }

    const tryAgainHandler = () => {
        setPage('first');
    }

    const showError = (
        <div className={classes.errorDiv}>
            <p>{isError && errors}</p>
        </div>
    )

    const shouldLoginPage = (
        <Fragment>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && <div className={classes.container}>
                <p className={classes.lup}>Please Login First as an Admin to add your products!</p>
                <button className={classes.lb}><Link className={classes.link} to='/login'>Login</Link></button>
            </div>}
        </Fragment>
    )

    const allowAddingPage = (
            <Fragment>
                {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
                {!loading && <div className={classes.container}>
                    <form onSubmit={addProductHandler} method='POST' encType='multipart/form-data' className={classes.lForm}>
                        {isError && showError}
                        <label className={classes.ll} htmlFor='title'>Which Product or Service?</label>
                        <input className={classes.li} value={title} onChange={titleChangeHandler} type='text' name='title' placeholder='Enter the name of what you would like to sell'></input>
                        <label className={classes.ll} htmlFor='category'>Which category does it belong?</label>
                        <select onChange={categoryChangeHandler}value={category} name='category' className={classes.li}>
                            <option className={classes.lo}>Foodstuff</option>
                            <option className={classes.lo}>Clothing</option>
                            <option className={classes.lo}>Gaming</option>
                            <option className={classes.lo}>Electronic Accessories</option>
                            <option className={classes.lo}>Fashion</option>
                            <option className={classes.lo}>Stickers</option>
                            <option className={classes.lo}>Photography</option>
                            <option className={classes.lo}>Design</option>
                            <option className={classes.lo}>Software Development</option>
                        </select>
                        <label className={classes.ll} htmlFor='image'>Add an Image</label>
                        <input onChange={(event) => imageChangeHandler(event)} className={classes.li} type='file' name='image'></input>
                        <label className={classes.ll} htmlFor='price'>At what price will you sell?</label>
                        <input className={classes.li} value={price} onChange={priceChangeHandler} type='number' name='price' placeholder="Enter the item's price"></input>
                        <label className={classes.ll} htmlFor='description'>Enter its description</label>
                        <textarea onChange={descriptionChangeHandler} value={description} className={classes.li} name='description' placeholder="Enter the item's description"></textarea>
                        {isClickable === true ? <button type='submit' className={classes.lb}>Create</button> : <button className={classes.lUnableClick} disabled>Create</button>}
                    </form>
                </div>}
            </Fragment>
    )

    const secondSuccessfull = (
        <div>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && <div className={classes.container}>
                <p className={classes.lup}>Your Product has been Added Successfully</p>
                <button className={classes.lb}><Link className={classes.link} to='/'>Home</Link></button>
            </div>}
        </div>
    )

    const secondError = (
        <div>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && <div className={classes.container}>
                <p className={classes.lup}>Error adding Product. Please check it below</p>
                {isError && showError}
                <button onClick={tryAgainHandler} className={classes.lb}>Try Again</button>
            </div>}
        </div>
    )

    let secondPage;

    if(page === 'second' && isError){
        secondPage = secondError;
    } else if(page === 'second' && !isError){
        secondPage = secondSuccessfull;
    }

    let displayPage;

    if(page === 'first' && !isLoggedIn){
        displayPage = shouldLoginPage;
    } else if(page === 'first' && isLoggedIn){
        displayPage = allowAddingPage;
    } else if(page === 'second'){
        displayPage = secondPage;
    }

    return(
        <Fragment>
            {displayPage}
        </Fragment>
    )
};

export default AddProductForm;
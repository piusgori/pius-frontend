import classes from './DetailsForm.module.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import Loading from './Loading';

let item = {};
const DetailsForm = (props) => {
    const url = props.url;
    const location = useLocation();
    const identity = location.pathname.split('/product/')[1];
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errors, setErrors] = useState('');
    const loginToken = localStorage.getItem('token');
    const dispatch = useDispatch();

    const addToCartHandler = () => {
        if(!loginToken){
            props.checkShouldLogin();
        } else {
            dispatch(cartActions.addItemToCart({id: item._id, title: item.title, price: item.price}))
        }
    }

    useEffect(() => {
        setLoading(true);
        fetch(`${url}/product`, {
            method: 'POST',
            body: JSON.stringify({id: identity}),
            headers: {'Content-Type' : 'application/json'}
        }).then(response => {
            return response.json();
        }).then(responseData => {
            if(responseData.errorMessage){
                setIsError(true);
                setErrors(responseData.errorMessage);
            } else if(!responseData.errorMessage){
                setIsError(false);
                setErrors('');
                item = responseData.product;
            } 
            setLoading(false);
        }).catch(err => {
            console.log(err)
        })
    }, [identity, url])

    const loadingPage = (
        <div className={classes.iconLoading}><Loading></Loading></div>
    )

    const showError = (
        <h3 className={classes.detailsError}>{errors}</h3>
    )

    const detailsShow = (
        <div>
            <h1 className={classes.detailsName}>{item.title}</h1>
            <div className={classes.detailsImage}>
                <img alt='' src={`${url}/photographyImageSections/${item.imageUrl}`}></img>
            </div>
            <h2 className={classes.detailsPrice}>KES {item.discount ? item.discountPrice : item.price}</h2>
            <p className={classes.detailsDescription}>{item.description}</p>
            <div className={classes.detailsBDiv}>
                <button onClick={addToCartHandler} className={classes.detailsButton}>Add to Cart</button>
            </div>
        </div>
    )

    return(
        <div className={classes.detailsContainer}>
            {loading && loadingPage}
            {!loading && isError && showError}
            {!loading && !isError && detailsShow}
        </div>
    )
};

export default DetailsForm;
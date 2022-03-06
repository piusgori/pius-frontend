import Card from './Card';
import { useDispatch } from 'react-redux';
import { Fragment } from 'react/cjs/react.production.min';
import { cartActions } from '../../store/cart-slice';

const HomeProductItem = (props) => {
    const {id, title, price, url, imageUrl, discount, discountPrice } = props;

    const loginToken = localStorage.getItem('token');
    const dispatch = useDispatch();


    const addToCartHandler = () => {
        if(!loginToken){
            props.checkShouldLogin();
        } else {
            dispatch(cartActions.addItemToCart({id, title, price}));
        }
    }

    return(
        <Fragment>
            <Card id={id} url={url} imageUrl={imageUrl} title={title} discount={discount} discountPrice={discountPrice} price={price} addToCartHandler={addToCartHandler}></Card>
        </Fragment>
    )
}

export default HomeProductItem;
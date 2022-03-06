import { useDispatch } from 'react-redux';
import { Fragment } from 'react/cjs/react.production.min';
import { cartActions } from '../../store/cart-slice';
import Card from './Card';

const StoreFormItem = (props) => {
    const {id, imageUrl, title, url, discount, discountPrice, price} = props;
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
};

export default StoreFormItem;
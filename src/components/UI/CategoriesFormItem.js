import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { Fragment } from 'react/cjs/react.production.min';
import Card from './Card';

const CategoriesFormItem = (props) => {
    const url = props.url;
    const {id, imageUrl, title, discount, discountPrice, price} = props.item;
    const dispatch = useDispatch();


    const loginToken = localStorage.getItem('token');
    const addToCartHandler = () => {
        if(!loginToken){
            props.checkShouldLogin();
        } else {
            dispatch(cartActions.addItemToCart({id, title, price}));
        }
    }

    return (
        <Fragment>
            <Card id={id} url={url} imageUrl={imageUrl} title={title} discount={discount} discountPrice={discountPrice} price={price} addToCartHandler={addToCartHandler}></Card>
        </Fragment>
    )

}

export default CategoriesFormItem;

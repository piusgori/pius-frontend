import classes from './CartForm.module.css';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const CartFormItem = (props) => {
    const {id, title, quantity, price, totalPrice} = props.item;
    const dispatch = useDispatch();

    const addItemHandler = () => {
        dispatch(cartActions.addItemToCart({id, title, price}))
    }

    const removeItemHandler = () => {
        dispatch(cartActions.removeItemFromCart(id));
    }

    const removeWholeItemHandler = () => {
        dispatch(cartActions.removeWholeItemFromCart(id));
    }

    return(
        <div key={id} className={classes.eachCart}>
            <h1 className={classes.cartName}>{title}</h1>
            <h1 className={classes.cartQuantity}>{quantity}: Ksh {totalPrice}</h1>
            <div className={classes.cartIncrement}>
                <FontAwesomeIcon onClick={removeItemHandler} className={classes.cartIcon} icon={faMinus}></FontAwesomeIcon>
                <button onClick={removeWholeItemHandler} className={classes.cartDButton}>Delete</button>
                <FontAwesomeIcon onClick={addItemHandler} className={classes.cartIcon} icon={faPlus}></FontAwesomeIcon>
            </div>
        </div>
    )

};

export default CartFormItem;
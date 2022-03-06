import { useSelector } from 'react-redux';
import classes from './TheCart.module.css';

const TheCart = () => {
    const loginToken = localStorage.getItem('token');

    const myCart = useSelector(state => state.cart.items);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const totalAmount = useSelector(state => state.cart.totalAmount);

    return(
        <div className={loginToken && myCart.length > 0 ? classes.showingCart : classes.cartingNone}>
            <div className={classes.insideShowingCart}>
                <h1>{totalQuantity} Items</h1>
                <h1>Ksh {totalAmount}</h1>
            </div>
        </div>
    )
}

export default TheCart;
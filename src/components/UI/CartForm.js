import { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './CartForm.module.css';
import CartFormItem from './CartFormItem';
import CheckoutButton from './CheckoutButton';
import Loading from './Loading';

const CartForm = (props) => {
    const url = props.url;
    const token = localStorage.getItem('token');
    const loggedIn = token;
    const [page, setPage] = useState('first');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    let no = 0;

    let displayPage;
    const myCart = useSelector(state => state.cart.items);

    const checkoutHandler = () => {
        setLoading(true);
        setPage('second');
        no = 0;
        fetch(`${url}/checkout`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({checkout: myCart})
        }).then(response => {
            return response.json();
        }).then(responseData => {
            setMessages(responseData.messages);
            setLoading(false);
        }).catch(err => {
            console.log(err);
        });
    }

    const shouldLogin = (
        <div className={classes.insideCart}>
            <h1 className={classes.cartMessage}>Please login to view your cart!</h1>
        </div>
    )

    const nothingInCart = (
        <div className={classes.insideCart}>
            <h1 className={classes.cartMessage}>You have not yet added anything to your cart...</h1>
        </div>
    )

    const theCart = (
        <div className={classes.insideCart}>
            {myCart.map(item => {
                return(
                    <CartFormItem key={item.id} item={{id: item.id, title: item.title, quantity: item.quantity, price: item.price,  totalPrice: item.totalPrice}}></CartFormItem>
                )
            })}
            <hr className={classes.cartLine}></hr>
            <div className={classes.forCartOrder}>
                <button onClick={checkoutHandler} className={classes.cartOButton}>Checkout</button>
            </div>
        </div>
    )

    const secondPage = (
        <div className={classes.insideCart}>
            <h1 className={classes.cartMessage}>Please click on the buttons below to send messages to the respective sellers</h1>
            <div className={classes.allSendingText}>
                {messages.map(message => {
                    no++;
                    return(
                        <CheckoutButton token={token} key={no} no={no} url={url} message={message}></CheckoutButton>
                    )
                })}
            </div>
        </div>
    )

    if(page === 'first'){
        if(!loggedIn){
            displayPage = shouldLogin;
        } else {
            displayPage = loggedIn && myCart.length > 0 ? theCart : nothingInCart
        }
    } else if(page === 'second'){
        displayPage = secondPage;
    }

    return(
        <div className={classes.cartContainer}>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && displayPage}
        </div>
    )
}

export default CartForm;
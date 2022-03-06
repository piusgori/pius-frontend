import { Fragment } from "react/cjs/react.production.min";
import classes from './CartForm.module.css';

const CheckoutButton = (props) => {
    const message = props.message;
    const url = props.url;
    const token = props.token;
    const deleteCartHandler = () => {
        fetch(`${url}/delete-cart`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token})
        }).then(response => {
            return response.json();
        }).then(responseData => {
            console.log(responseData);
        }).catch(err => {
            console.log(err);
        })
    }

    return(
        <Fragment>
            <a href={`https://wa.me/${message.phone.substring(1, message.phone.length)}?text=${message.content}`} target='_blank' rel="noreferrer"><button onClick={deleteCartHandler} className={classes.sendMessageButton}>{`Send To Seller ${props.no}`}</button></a>
            <div className={classes.checkSpace}></div>
        </Fragment>
    )
};

export default CheckoutButton;
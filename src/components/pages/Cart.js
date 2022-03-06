import Dropdown from '../display/Dropdown';
import CartForm from '../UI/CartForm';
import Footer from '../UI/Footer';
import Header from '../UI/Header';
import classes from './Login.module.css';

const Cart = (props) => {
    return (
        <div className={classes.loginContainer}>
            <Dropdown categoriesChange={props.categoriesChange} onDropClick={props.onDropClick} drop={props.drop}></Dropdown>
            <Header onDropClick={props.onDropClick}></Header>
            <CartForm url={props.url}></CartForm>
            <Footer url={props.url}></Footer>
        </div>
    )
}

export default Cart;

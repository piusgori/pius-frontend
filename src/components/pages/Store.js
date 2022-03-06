import AlertLogin from '../display/AlertLogin';
import Dropdown from '../display/Dropdown';
import TheCart from '../display/TheCart';
import Footer from '../UI/Footer';
import Header from '../UI/Header';
import StoreForm from '../UI/StoreForm';
import classes from './Login.module.css';

const Store = (props) => {
    return (
        <div className={classes.loginContainer}>
            <Dropdown categoriesChange={props.categoriesChange} onDropClick={props.onDropClick} drop={props.drop}></Dropdown>
            <Header onDropClick={props.onDropClick}></Header>
            <AlertLogin shouldLogin={props.shouldLogin} hideAlerting={props.hideAlerting}></AlertLogin>
            <StoreForm checkShouldLogin={props.checkShouldLogin} url={props.url}></StoreForm>
            <TheCart></TheCart>
            <Footer url={props.url}></Footer>
        </div>
    )
}

export default Store;
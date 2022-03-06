import AlertLogin from '../display/AlertLogin';
import Dropdown from '../display/Dropdown';
import TheCart from '../display/TheCart';
import DetailsForm from '../UI/DetailsForm';
import Footer from '../UI/Footer';
import Header from '../UI/Header';
import classes from './Login.module.css';

const Details = (props) => {
    return (
        <div className={classes.loginContainer}>
            <Dropdown categoriesChange={props.categoriesChange} onDropClick={props.onDropClick} drop={props.drop}></Dropdown>
            <AlertLogin shouldLogin={props.shouldLogin} hideAlerting={props.hideAlerting}></AlertLogin>
            <Header onDropClick={props.onDropClick}></Header>
            <DetailsForm checkShouldLogin={props.checkShouldLogin} url={props.url}></DetailsForm>
            <TheCart></TheCart>
            <Footer url={props.url}></Footer>
        </div>
    )
}

export default Details;

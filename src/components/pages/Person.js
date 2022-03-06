import AlertLogin from '../display/AlertLogin';
import Dropdown from '../display/Dropdown';
import Footer from '../UI/Footer';
import Header from '../UI/Header';
import PersonForm from '../UI/PersonForm';
import classes from './Login.module.css';
import TheCart from '../display/TheCart';
const Person = (props) => {
    return(
        <div className={classes.loginContainer}>
            <Dropdown categoriesChange={props.categoriesChange} onDropClick={props.onDropClick} drop={props.drop}></Dropdown>
            <Header onDropClick={props.onDropClick}></Header>
            <AlertLogin shouldLogin={props.shouldLogin} hideAlerting={props.hideAlerting}></AlertLogin>
            <PersonForm checkShouldLogin={props.checkShouldLogin} url={props.url}></PersonForm>
            <TheCart></TheCart>
            <Footer url={props.url}></Footer>
        </div>
    )
};

export default Person;
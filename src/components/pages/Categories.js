import classes from './Login.module.css';
import Header from '../UI/Header';
import Dropdown from '../display/Dropdown';
import CategoriesForm from '../UI/CategoriesForm';
import Footer from '../UI/Footer';
import AlertLogin from '../display/AlertLogin';
import TheCart from '../display/TheCart';
const Categories = (props) => {
    return (
        <div className={classes.loginContainer}>
            <Dropdown categoriesChange={props.categoriesChange} onDropClick={props.onDropClick} drop={props.drop}></Dropdown>
            <Header onDropClick={props.onDropClick}></Header>
            <AlertLogin shouldLogin={props.shouldLogin} hideAlerting={props.hideAlerting}></AlertLogin>
            <CategoriesForm checkShouldLogin={props.checkShouldLogin} category={props.category} url={props.url}></CategoriesForm>
            <TheCart></TheCart>
            <Footer url={props.url}></Footer>
        </div>
    )
};

export default Categories;
import Dropdown from '../display/Dropdown';
import AccountForm from '../UI/AccountForm';
import Footer from '../UI/Footer';
import Header from '../UI/Header';
import classes from './Login.module.css';

const Account = (props) => {
    return(
        <div className={classes.loginContainer}>
            <Dropdown categoriesChange={props.categoriesChange} onDropClick={props.onDropClick} drop={props.drop}></Dropdown>
            <Header onDropClick={props.onDropClick}></Header>
            <AccountForm url={props.url}></AccountForm>
            <Footer url={props.url}></Footer>
        </div>
    )
};
export default Account;
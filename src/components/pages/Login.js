import Header from "../UI/Header";
import LoginForm from "../UI/LoginForm";
import classes from './Login.module.css';
import Dropdown from "../display/Dropdown";

const Login = (props) => {
    return(
        <div className={classes.loginContainer}>
            <Dropdown categoriesChange={props.categoriesChange} onDropClick={props.onDropClick} drop={props.drop}></Dropdown>
            <Header onDropClick={props.onDropClick}></Header>
            <LoginForm url={props.url}></LoginForm>
        </div>
    )
}
export default Login;
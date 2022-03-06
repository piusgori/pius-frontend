import Header from '../UI/Header';
import Dropdown from '../display/Dropdown';
import SignupForm from '../UI/SingupForm';
import classes from './Signup.module.css'

const Signup = (props) => {
    return(
        <div className={classes.signupContainer}>
            <Dropdown categoriesChange={props.categoriesChange} onDropClick={props.onDropClick} drop={props.drop}></Dropdown>
            <Header onDropClick={props.onDropClick}></Header>
            <SignupForm url={props.url}></SignupForm>
        </div>
    )
}

export default Signup;
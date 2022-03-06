import Header from '../UI/Header';
import ResetForm from '../UI/ResetForm';
import classes from './Login.module.css';
import Dropdown from '../display/Dropdown';

const Reset = (props) => {
    return (
        <div className={classes.loginContainer}>
            <Dropdown categoriesChange={props.categoriesChange} onDropClick={props.onDropClick} drop={props.drop}></Dropdown>
            <Header onDropClick={props.onDropClick}></Header>
            <ResetForm></ResetForm>
        </div>
    )
}

export default Reset;
import Dropdown from '../display/Dropdown';
import EditForm from '../UI/EditForm';
import Footer from '../UI/Footer';
import Header from '../UI/Header';
import classes from './Login.module.css';

const Edit = (props) => {
    return(
        <div className={classes.loginContainer}>
            <Dropdown categoriesChange={props.categoriesChange} onDropClick={props.onDropClick} drop={props.drop}></Dropdown>
            <Header onDropClick={props.onDropClick}></Header>
            <EditForm url={props.url}></EditForm>
            <Footer url={props.url}></Footer>
        </div>
    )
}

export default Edit;
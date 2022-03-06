import Header from '../UI/Header';
import Dropdown from '../display/Dropdown';
import classes from './Login.module.css';
import AddProductForm from '../UI/AddProductForm';

const AddProduct = (props) => {
    return(
        <div className={classes.loginContainer}>
            <Dropdown categoriesChange={props.categoriesChange} onDropClick={props.onDropClick} drop={props.drop}></Dropdown>
            <Header onDropClick={props.onDropClick}></Header>
            <AddProductForm url={props.url}></AddProductForm>
        </div>
    )
}

export default AddProduct;
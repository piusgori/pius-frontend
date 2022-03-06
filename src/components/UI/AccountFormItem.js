import { Link } from 'react-router-dom';
import classes from './AccountForm.module.css';

const AccountFormItem = (props) => {
    const {url, title, imageUrl, discount, discountPrice, price, id} = props;
    const deleteLoadingHandler = props.deleteLoadingHandler;
    const settingTheMessageForDelete = props.settingTheMessageForDelete;

    const deleteProductHandler = () => {
        deleteLoadingHandler(true);
        fetch(`${url}/delete-product`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({id})
        }).then(response => {
            return response.json();
        }).then(responseData => {
            if(responseData.errorMessage){
                settingTheMessageForDelete('true', responseData.errorMessage);
            } else if(!responseData.errorMessage){
                settingTheMessageForDelete('false', responseData.message);
            }
            deleteLoadingHandler(false);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className={classes.aEach}>
            <div className={classes.aEachInside}>
                <div className={classes.aEachImage}>
                    <img alt='' src={`${url}/photographyImageSections/${imageUrl}`}></img>
                </div>
                <h4 className={classes.aEachName}>{title}</h4>
                {discount && 
                    <div className={classes.aEachPrices}>
                        <h5 className={classes.aEachPriceNew}>KES {discountPrice}</h5>
                        <h6 className={classes.aEachPriceOld}>KES {price}</h6>
                    </div>
                }
                {!discount && 
                    <div className={classes.aEachPrices}>
                        <h5 className={classes.aEachPriceNew}>KES {price}</h5>
                    </div>
                }
                <div className={classes.aEachButtonDiv}>
                    <Link className={classes.aEachButton} to={`/edit/${id}`}>Edit</Link>
                    <div className={classes.between}></div>
                    <button onClick={deleteProductHandler} className={classes.aEachButton}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default AccountFormItem;
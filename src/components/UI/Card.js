import { Link } from 'react-router-dom';
import classes from './Card.module.css';

const Card = (props) => {
    const {id, url, imageUrl, title, discount, discountPrice, price} = props;
    const addToCartHandler = () => {
        props.addToCartHandler();
    }

    return(
        <div key={id} className={classes.sEach}>
            <div className={classes.sEachInside}>
                <div className={classes.sEachImage}>
                    <img alt="" src={`${url}/photographyImageSections/${imageUrl}`}></img>
                </div>
                <h4 className={classes.sEachName}>{title}</h4>
                {discount && <div className={classes.sEachPrices}>
                    <h5 className={classes.sEachPriceNew}>KES {discountPrice}</h5>
                    <h6 className={classes.sEachPriceOld}>KES {price}</h6>  
                </div>}
                {!discount && <div className={classes.sEachPrices}>
                    <h5 className={classes.sEachPriceNew}>KES {price}</h5>
                </div>}
                <div className={classes.sEachButtonDiv}>
                    <button onClick={addToCartHandler} className={classes.sEachButton}>Add To Cart</button>
                    <div className={classes.between}></div>
                    <button className={classes.sEachButton}><Link className={classes.sLinky} to={`/product/${id}`}>Details</Link></button>
                </div>
            </div>
        </div>
    )
};

export default Card;
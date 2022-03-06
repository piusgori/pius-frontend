import classes from './StoreForm.module.css';
import { useEffect, useState } from 'react';
import StoreFormItem from './StoreFormItem';
import Loading from './Loading';

let items = [];

const StoreForm = (props) => {
    const url = props.url
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`${url}/home-products`).then(response => {
            return response.json();
        }).then(responseData => {
            items = responseData.product;
            setLoading(false);
        }).catch(err => console.log(err))
    }, [url])

    const notAddedYet = (
        <div><h2 className={classes.foundNot}>No Products have been added yet...</h2></div>
    )

    const added = (
        <div className={classes.storeBody}>
            {items.map((item) => {
                return (
                    <StoreFormItem key={item._id} id={item._id} url={url} checkShouldLogin={props.checkShouldLogin} imageUrl={item.imageUrl} discount={item.discount} discountPrice={item.discountPrice} title={item.title} price={item.price}></StoreFormItem>
                )
            })}
        </div>
    )

    return(
        <div className={classes.storeCategory}>
            <div className={classes.insideStore}>
                {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
                {!loading && <div>{items.length === 0 && notAddedYet}{items.length > 0 && added}</div>}
            </div>
        </div>
    )
}

export default StoreForm;
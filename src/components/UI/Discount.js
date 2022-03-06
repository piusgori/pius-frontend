import classes from './Discount.module.css'
import { useEffect, useState } from 'react';
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import { discountActions } from '../../store/discount-slice';


const Discount = (props) => {
    const [isEmpty, setIsEmpty] = useState(false);
    const [loading, setLoading] = useState(false);
    const url = props.url;
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        fetch(`${url}/home-products`).then(response => {
            return response.json();
        }).then(responseData => {
            const sentItems = responseData.product.filter(item => {
                return item.discount === true;
            })
            dispatch(discountActions.setItems(sentItems));
            setLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }, [url, dispatch])

    const products = useSelector(state => state.discount.items)

    const productsPage = <div className={classes.items}>{products.map(product => {
        return(
            <div key={product._id} className={classes.each}>
                <div className={classes.left}>
                    <img alt='' src={`${url}/photographyImageSections/${product.imageUrl}`}></img>
                </div>
                <div className={classes.right}>
                    <div className={classes.text}>
                        <div className={classes.top}><h1>{product.title}</h1></div>
                        <div className={classes.bottom}>
                            <p className={classes.new}>KES {product.discountPrice}</p>
                            <p className={classes.old}>KES {product.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    })}</div>

    useEffect(() => {
        if(products.length > 0){
            setIsEmpty(false);
        }
        else{
            setIsEmpty(true);
        }
    }, [isEmpty, products.length])

    return(
        <div className={classes.contain}>
            <div className={classes.container}>
                <h1>Deals of the Week</h1>
                <p>Exclusive discounts of the items you desire!</p>
                {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
                {!loading && <div>
                    {isEmpty && <h2 className={classes.noProducts}>No products with discounts yet</h2>}
                    {!isEmpty && productsPage}
                </div>}
            </div>
        </div>
    )
};
export default Discount;
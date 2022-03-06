import { useEffect, useState } from 'react';
import HomeProductItem from './HomeProductItem';
import classes from './HomeProducts.module.css';
import Loading from './Loading';

let products = [];

const HomeProducts = (props) => {
    const url = props.url;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`${url}/home-products`).then(response => {
            return response.json();
        }).then(responseData => {
            if(responseData.product.length <= 8){
                return responseData.product;
            }
            const producer = [];
            for(let i = 0; i < 8; i++){
                producer.push(responseData.product[i]);
            }
            return producer;
        }).then(updatedProducts => {
            products = updatedProducts;
            setLoading(false);
        }).catch(err => console.log(err));
    }, [url])
    
    

    const mapping = (
        <div className={classes.products}>
            {products.map(product => {
                return(
                    <HomeProductItem key={product._id} checkShouldLogin={props.checkShouldLogin} imageUrl={product.imageUrl} price={product.price} discount={product.discount} discountPrice={product.discountPrice} url={url} id={product._id} title={product.title}></HomeProductItem>
                )
            })}
        </div>
    )
    
    const nothing = (
        <h1 className={classes.nothing}>There are no products yet to display</h1>
    )



    return(
        <div className={classes.contain}>
            <div className={classes.container}>
                <h1>Latest products</h1>
                <p>Any product you want to have available at this store!</p>
                {loading && <Loading></Loading>}
                {!loading && <div>
                    {products.length > 0 ? mapping : nothing}
                </div>}
            </div>
        </div>
    )
}

export default HomeProducts;
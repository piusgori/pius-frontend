import { useEffect, useState } from 'react';
import classes from './CategoriesForm.module.css';
import CategoriesFormItem from './CategoriesFormItem';
import Loading from './Loading';
let items = [];

const CategoriesForm = (props) => {
    const category = props.category
    const url = props.url;
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState('Price');

    const sortChangeHandler = (event) => {setSort(event.target.value);}

    useEffect(() => {
        setLoading(true);
        fetch(`${url}/filter-products`, {
            method: 'POST',
            body: JSON.stringify({category: category, sort: sort}),
            headers: {'Content-Type' : 'application/json'}
        }).then(response => {
            return response.json();
        }).then(responseData => {
            const producer = responseData.product;
            items = producer;
            setLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }, [category, sort, url])


    const list = (
        <div className={classes.categoryBody}>
            {items.map((item) => {
                return (
                    <CategoriesFormItem key={item._id} url={url} item={{id: item._id, imageUrl: item.imageUrl, title: item.title, discount: item.discount, discountPrice: item.discountPrice, price: item.price}} checkShouldLogin={props.checkShouldLogin}></CategoriesFormItem>
                )
            })}
        </div>
    )

    const noProducts = (
        <div><h2 className={classes.foundNone}>Sorry...No products under this category found at the moment</h2></div>
    )

    return(
        <div className={classes.categori}>
            <div className={classes.inCategori}>
                <div className={classes.categoryHeading}>
                    <div className={classes.hcEach}><p>{category}</p></div>
                    <div className={classes.hcEach}>
                        <label>Sort By: </label>
                        <select onChange={sortChangeHandler} className={classes.hcSelect}>
                            <option>Price</option>
                            <option>Date Added</option>
                        </select>
                    </div>
                </div>
                {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
                {!loading && <div>{items.length === 0 && noProducts}{items.length > 0 && list}</div>}
            </div>
        </div>
    )
}

export default CategoriesForm;
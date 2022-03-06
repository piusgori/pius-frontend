import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import { searchActions } from '../../store/search-slice';
import classes from './AccountForm.module.css';
import CategoriesFormItem from './CategoriesFormItem';
import Loading from './Loading';
const PersonForm = (props) => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const personFound = location.pathname.split('/people/')[1];
    const url = props.url;
    useEffect(() => {
        setLoading(true);
        fetch(`${url}/person-result`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: personFound})
        }).then(response => {
            return response.json();
        }).then(responseData => {
            dispatch(searchActions.setPersonAndProduct({person: responseData.person, products: responseData.products}))
            setLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }, [dispatch, personFound, url])

    const items = useSelector(state => state.search.personProducts);
    const person = useSelector(state => state.search.personResult);

    return(
        <Fragment>
            <div className={classes.accountContainer}>
                {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
                {!loading && <div>
                    <h1 className={classes.accountHeading}>{person.name}</h1>
                    <hr className={classes.accountRuling}></hr>
                    <div className={classes.insideProducts}>
                        <h2 className={classes.accountHeading}>{`${person.name} products`}</h2>
                        <div className={classes.accountProductsBody}>
                            {items.length === 0 && <p className={classes.accountData}>I have not yet started selling my products yet</p>}
                            {items.length > 0 && items.map(item => {
                                return (
                                    <CategoriesFormItem key={item._id} url={url} item={{id: item._id, imageUrl: item.imageUrl, title: item.title, discount: item.discount, discountPrice: item.discountPrice, price: item.price}} checkShouldLogin={props.checkShouldLogin}></CategoriesFormItem>
                                )
                            })}    
                        </div>
                    </div>
                </div>}
            </div>
        </Fragment>
    )
}

export default PersonForm;
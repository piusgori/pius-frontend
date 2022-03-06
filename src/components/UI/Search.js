import { faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import { searchActions } from '../../store/search-slice';
import AlertLogin from '../display/AlertLogin';
import CategoriesFormItem from './CategoriesFormItem';
import Loading from './Loading';
import classes from './Search.module.css';
import SearchCategory from './SearchCategory';
import SearchItem from './SearchItem';
import SearchPerson from './SearchPerson';

const Search = (props) => {
    const [loading, setLoading] = useState(false);
    const [beginning, setBeginning] = useState(false);
    const [shouldShowResults, setShouldShowresults] = useState(false)
    const [data, setData] = useState('');
    const url = props.url;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const filteredData = useSelector(state => state.search.result);
    let keyId = 0;
    let personId = 0;
    let categoryId = 0;


    const setDataHandler = (event) => {
        setData(event.target.value);
        dispatch(searchActions.returnResultProducts());
        setBeginning(true);
    }

    const goBackHandler = () => {
        navigate(-1);
    }

    useEffect(() => {
        if(!beginning){
            return;
        }
        setLoading(true);
        fetch(`${url}/search-anything`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data})
        }).then(response => {
            return response.json();
        }).then(responseData => {
            dispatch(searchActions.setReady(responseData.result));
            setLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }, [url, beginning, data, dispatch])

    const getResult = () => {
        setShouldShowresults(true);
        setLoading(true);
        fetch(`${url}/search-anything`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data})
        }).then(response => {
            dispatch(searchActions.returnResultProducts());
            return response.json();
        }).then(responseData => {
            dispatch(searchActions.setresultPeopleAndCategories({people: responseData.allThings[2], categories: responseData.allThings[1], productNames: responseData.allThings[0], allProducts: responseData.foundProducts}))
            setLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }

    const resultPeople = useSelector(state => state.search.resultPeople);
    const resultCategories = useSelector(state => state.search.resultCategories);
    const resultProducts = useSelector(state => state.search.resultProducts);



    return(
        <Fragment>
            <div className={classes.searchContainer}>
            <AlertLogin shouldLogin={props.shouldLogin} hideAlerting={props.hideAlerting}></AlertLogin>
                <div className={classes.searchIn}>
                    <FontAwesomeIcon onClick={goBackHandler} className={classes.iconForSearch} icon={faLongArrowAltLeft}></FontAwesomeIcon>
                    <input onChange={setDataHandler} type='text' className={classes.searchText} name='search' placeholder='Search people, products or categories'></input>
                    <FontAwesomeIcon onClick={getResult} className={classes.iconForSearch} icon={faSearch}></FontAwesomeIcon>
                </div>
                <div>
                    {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
                    {!loading && <div>
                        {filteredData.length !== 0 && <div className={classes.searchResult}>
                            {filteredData.map(item => {
                                keyId++;
                                return (<SearchItem url={url} key={keyId} item={item}></SearchItem>);
                            })}
                        </div>}
                    </div>}
                </div>
                {shouldShowResults && <div className={classes.allResults}>
                    {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
                    {!loading && <div>
                        <h1 className={classes.resultHead}>Results</h1>
                        <h2 className={classes.resultPlace}>People</h2>
                        <div>
                            {resultPeople.length === 0 && <p className={classes.personName}>No People found!</p>}
                            {resultPeople.length > 0 && resultPeople.map(person => {
                                personId++
                                return (
                                    <SearchPerson url={url} key={personId} name={person}></SearchPerson>
                                    )
                                })}
                        </div>
                        <h2 className={classes.resultPlace}>Categories</h2>
                        <div>
                            {resultCategories.length === 0 && <p className={classes.personName}>No Categories found!</p>}
                            {resultCategories.length > 0 && resultCategories.map(category => {
                                categoryId++
                                return (
                                    <SearchCategory url={url} key={categoryId} name={category}></SearchCategory>
                                    )
                                })}
                        </div>
                        <h2 className={classes.resultPlace}>Products</h2>
                        <div className={classes.productsAll}>
                            {resultProducts.length === 0 && <p className={classes.personName}>No Products found!</p>}
                            {resultProducts.length > 0 && <div className={classes.productsBody}>
                                {resultProducts.map(item => {
                                    return(
                                        <CategoriesFormItem key={item._id} url={url} item={{id: item._id, imageUrl: item.imageUrl, title: item.title, discount: item.discount, discountPrice: item.discountPrice, price: item.price}} checkShouldLogin={props.checkShouldLogin}></CategoriesFormItem>
                                    )
                                })}
                            </div>}
                        </div>
                    </div>}
                </div>}
            </div>
        </Fragment>
    )
}

export default Search;
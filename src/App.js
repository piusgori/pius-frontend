import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/cjs/react.production.min";
import Preloader from './components/UI/Preloader';
import { preloaderActions } from "./store/preloader-slice";
import Main from './components/pages/Main';
import { Route, Routes } from "react-router-dom";
import { loginActions } from './store/login-slice';
import { fetchCartData, sendCartData } from "./store/cart-slice";
import Loading from "./components/UI/Loading";
const Search = React.lazy(() => import("./components/UI/Search"));
const Login = React.lazy(() => import("./components/pages/Login"));
const Signup = React.lazy(() => import("./components/pages/Singup"));
const Reset = React.lazy(() => import("./components/pages/Reset"));
const AddProduct = React.lazy(() => import("./components/pages/AddProduct"));
const Categories = React.lazy(() => import("./components/pages/Categories"));
const Store = React.lazy(() => import("./components/pages/Store"));
const Details = React.lazy(() => import("./components/pages/Details"));
const Cart = React.lazy(() => import("./components/pages/Cart"));
const Account = React.lazy(() => import("./components/pages/Account"));
const Edit = React.lazy(() => import("./components/pages/Edit"));
const Person = React.lazy(() => import("./components/pages/Person"));



function App() {
  const url = 'https://pius-and-joskimsey-shop.herokuapp.com';

  const showPreloader = useSelector(state => state.preloader.isLoaded);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(preloaderActions.changeLoaded({isLoaded: false}));
    }, 5000)
  }, [dispatch]);

  const [drop, setDrop] = useState(false);
  const clickingHandler = () => {
      if(drop){
          setDrop(false)
      } else if(!drop){
          setDrop(true);
      }
  }

  const [categories, setCategories] = useState('');

  const categoriesChangeHandler = (name) => {
    clickingHandler();
    setCategories(name);
  }

  const [shouldLogin, setShouldLogin] = useState(false);

  const alerting = () => {
    setShouldLogin(true);
  }

  const hideAlerting = () => {
    setShouldLogin(false);
  }


  const loginToken = localStorage.getItem('token');
  const updatedCart = useSelector(state => state.cart.items);
  const changed = useSelector(state => state.cart.changed);

  useEffect(() => {
    dispatch(fetchCartData(url, loginToken));
  }, [dispatch, loginToken])

  useEffect(() => {
    if(changed){
      dispatch(sendCartData(url, updatedCart, loginToken));
    }
  }, [dispatch, updatedCart, loginToken, changed])


  if(loginToken){
    dispatch(loginActions.setLogin());
    dispatch(loginActions.setToken({token: loginToken}));
  } else if(!loginToken){
    dispatch(loginActions.setLogout());
    dispatch(loginActions.setToken({token: ''}));
  }

  return (
    <Fragment>
      <Preloader preloaderValue={showPreloader}></Preloader>
      <Routes>
        <Route path="/" element={<Main shouldLogin={shouldLogin} hideAlerting={hideAlerting} checkShouldLogin={alerting} categoriesChange={categoriesChangeHandler} onDropClick={clickingHandler} drop={drop} url={url} preloaderValue={showPreloader}></Main>}></Route>
        <Route path="/search" element={<Suspense fallback={<Loading></Loading>}><Search shouldLogin={shouldLogin} hideAlerting={hideAlerting} checkShouldLogin={alerting} url={url}></Search></Suspense>}></Route>
        <Route path='/login' element={<Suspense fallback={<Loading></Loading>}><Login categoriesChange={categoriesChangeHandler} onDropClick={clickingHandler} drop={drop} url={url}></Login></Suspense>}></Route>
        <Route path='/signup' element={<Suspense fallback={<Loading></Loading>}><Signup categoriesChange={categoriesChangeHandler} onDropClick={clickingHandler} drop={drop} url={url}></Signup></Suspense>}></Route>
        <Route path='/reset' element={<Suspense fallback={<Loading></Loading>}><Reset categoriesChange={categoriesChangeHandler} onDropClick={clickingHandler} drop={drop} url={url}></Reset></Suspense>}></Route>
        <Route path="/add-product" element={<Suspense fallback={<Loading></Loading>}><AddProduct categoriesChange={categoriesChangeHandler} onDropClick={clickingHandler} drop={drop} url={url}></AddProduct></Suspense>}></Route>
        <Route path="/store" element={<Suspense fallback={<Loading></Loading>}><Store shouldLogin={shouldLogin} hideAlerting={hideAlerting} checkShouldLogin={alerting} categoriesChange={categoriesChangeHandler} onDropClick={clickingHandler} drop={drop} url={url}></Store></Suspense>}></Route>
        <Route path={`/categories/:category`} element={<Suspense fallback={<Loading></Loading>}><Categories shouldLogin={shouldLogin} hideAlerting={hideAlerting} checkShouldLogin={alerting} category={categories} categoriesChange={categoriesChangeHandler} onDropClick={clickingHandler} drop={drop} url={url}></Categories></Suspense>}></Route>
        <Route path='/product/:productTitle' element={<Suspense fallback={<Loading></Loading>}><Details shouldLogin={shouldLogin} hideAlerting={hideAlerting} checkShouldLogin={alerting} categoriesChange={categoriesChangeHandler} onDropClick={clickingHandler} drop={drop} url={url}></Details></Suspense>}></Route>
        <Route path="/cart" element={<Suspense fallback={<Loading></Loading>}><Cart categoriesChange={categoriesChangeHandler} onDropClick={clickingHandler} drop={drop} url={url}></Cart></Suspense>}></Route>
        <Route path="/my-account" element={<Suspense fallback={<Loading></Loading>}><Account url={url} categoriesChange={categoriesChangeHandler} onDropClick={clickingHandler} drop={drop}></Account></Suspense>}></Route>
        <Route path="/edit/:productId" element={<Suspense fallback={<Loading></Loading>}><Edit categoriesChange={categoriesChangeHandler} onDropClick={clickingHandler} drop={drop} url={url}></Edit></Suspense>}></Route>
        <Route path="/people/:peopleId" element={<Suspense fallback={<Loading></Loading>}><Person shouldLogin={shouldLogin} hideAlerting={hideAlerting} checkShouldLogin={alerting} categoriesChange={categoriesChangeHandler} onDropClick={clickingHandler} drop={drop} url={url}></Person></Suspense>}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;

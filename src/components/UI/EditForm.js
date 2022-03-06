import classes from './LoginForm.module.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from './Loading';
const EditForm = (props) => {
    const url = props.url;
    const location = useLocation();
    const id = location.pathname.split('/edit/')[1];
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Foodstuff');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [discount, setDiscount] = useState('No');
    const [discountPrice, setDiscountPrice] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const titleChangeHandler = (event) => {setTitle(event.target.value)};
    const categoryChangeHandler = (event) => {setCategory(event.target.value)};
    const priceChangeHandler = (event) => {setPrice(event.target.value)};
    const descriptionChangeHandler = (event) => {setDescription(event.target.value)};
    const discountPriceChangeHandler = (event) => {setDiscountPrice(event.target.value)};
    const discountChangeHandler = (event) => {setDiscount(event.target.value)};
    const imageChangeHandler = (event) => {setImage(event.target.files[0])};

    useEffect(() => {
        setLoading(true);
        fetch(`${url}/product`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({id})
        }).then(response => {
            return response.json();
        }).then(responseData => {
            setTitle(responseData.product.title);
            setCategory(responseData.product.category);
            setPrice(responseData.product.price);
            setDescription(responseData.product.description);
            setLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }, [url, id])

    const editProductHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('id', id);
        formData.append('discount', discount);
        formData.append('discountPrice', discountPrice);
        fetch(`${url}/edit-product`, {
            method: 'POST',
            body: formData
        }).then(response => {
            return response.json();
        }).then(responseData => {
            console.log(responseData);
            setMessage(responseData.message);
            setLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }

    return(
        <div className={classes.container}>
            {loading && <div className={classes.iconLoading}><Loading></Loading></div>}
            {!loading && <form method='POST' onSubmit={editProductHandler} encType='multipart/form-data' className={classes.lForm}>
                {message.length > 0 && <h1 className={classes.lMessaging}>{message}</h1>}
                <label className={classes.ll} htmlFor='title'>Which Product or Service?</label>
                <input value={title} onChange={titleChangeHandler} className={classes.li} type='text' name='title' placeholder='Enter the name of what you would like to sell'></input>
                <label className={classes.ll} htmlFor='category'>Which category does it belong?</label>
                <select value={category} onChange={categoryChangeHandler} name='category' className={classes.li}>
                    <option className={classes.lo}>Foodstuff</option>
                    <option className={classes.lo}>Clothing</option>
                    <option className={classes.lo}>Gaming</option>
                    <option className={classes.lo}>Electronic Accessories</option>
                    <option className={classes.lo}>Fashion</option>
                    <option className={classes.lo}>Stickers</option>
                    <option className={classes.lo}>Photography</option>
                    <option className={classes.lo}>Design</option>
                    <option className={classes.lo}>Software Development</option>
                </select>
                <label className={classes.ll} htmlFor='image'>Add an Image</label>
                <input onChange={(event) => imageChangeHandler(event)} className={classes.li} type='file' name='image'></input>
                <label className={classes.ll} htmlFor='price'>Initial Price</label>
                <input value={price} onChange={priceChangeHandler} className={classes.li} type='number' name='price' placeholder="Enter the item's price"></input>
                <label className={classes.ll} htmlFor='discount'>Would you like to give your product a discount?</label>
                <select value={discount} onChange={discountChangeHandler} name='discount' className={classes.li}>
                    <option className={classes.lo}>Yes</option>
                    <option className={classes.lo}>No</option>
                </select>
                {discount === 'Yes' && <label htmlFor='discountPrice' className={classes.ll}>What is the discount price?</label>}
                {discount === 'Yes' && <input value={discountPrice} onChange={discountPriceChangeHandler} className={classes.li} type='number' name='discountPrice' placeholder='Enter the discount price'></input>}
                <label className={classes.ll} htmlFor='description'>Enter its description</label>
                <textarea value={description} onChange={descriptionChangeHandler} className={classes.li} name='description' placeholder="Enter the item's description"></textarea>
                <button type='submit' className={classes.lb}>Edit</button>
            </form>}
        </div>
    )
}

export default EditForm;
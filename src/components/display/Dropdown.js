import classes from './Dropdown.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCamera, faDesktop, faGamepad, faHamburger, faImages, faPhoneSquare, faPlusCircle, faShoppingCart, faStore, faTimes, faTshirt, faUser } from '@fortawesome/free-solid-svg-icons';
import { faShirtsinbulk, faStickerMule } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';



const Dropdown = (props) => {

    const changeCategoriesHandler = (event) => {
        props.categoriesChange(event.target.innerText.trim());
    }

    const isClicked = props.drop;
    return(
        <div className={isClicked === true ? classes.dropdown : classes.dropdownHidden}>
            <div className={isClicked === true ? classes.dropContent : classes.dropContentHidden}>
                <div className={classes.allDrop}>
                    <div className={classes.topIcon}>
                        <FontAwesomeIcon onClick={props.onDropClick} className={classes.timesIcon} icon={faTimes}></FontAwesomeIcon>
                        <p>Logo</p>
                    </div>
                    <hr className={classes.dropRule}></hr>
                    <h2 className={classes.dropHeader}>My Account</h2>
                    <p onClick={props.onDropClick} className={classes.dropP}><Link className={classes.dropP} to='/cart'><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> My Cart</Link></p>
                    <p onClick={props.onDropClick} className={classes.dropP}><Link className={classes.dropP} to='/add-product'><FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon> Add Item</Link></p>
                    <p onClick={props.onDropClick} className={classes.dropP}><Link className={classes.dropP} to='/my-account'><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> My Account</Link></p>
                    <hr className={classes.dropRule}></hr>
                    <h2 className={classes.dropHeader}>Our Store</h2>
                    <p onClick={props.onDropClick} className={classes.dropP}><Link className={classes.dropP} to='/store'><FontAwesomeIcon icon={faStore}></FontAwesomeIcon> Store</Link></p>
                    <hr className={classes.dropRule}></hr>
                    <h2 className={classes.dropHeader}>Our Categories</h2>
                    <p onClick={changeCategoriesHandler} className={classes.dropP}><Link className={classes.dropP} to='/categories/foodstuff'><FontAwesomeIcon icon={faHamburger}></FontAwesomeIcon> Foodstuff</Link></p>
                    <p onClick={changeCategoriesHandler} className={classes.dropP}><Link className={classes.dropP} to='/categories/clothing'><FontAwesomeIcon icon={faTshirt}></FontAwesomeIcon> Clothing</Link></p>
                    <p onClick={changeCategoriesHandler} className={classes.dropP}><Link className={classes.dropP} to='/categories/gaming'><FontAwesomeIcon icon={faGamepad}></FontAwesomeIcon> Gaming</Link></p>
                    <p onClick={changeCategoriesHandler} className={classes.dropP}><Link className={classes.dropP} to='/categories/electronic-accessories'><FontAwesomeIcon icon={faPhoneSquare}></FontAwesomeIcon> Electronic Accessories</Link></p>
                    <p onClick={changeCategoriesHandler} className={classes.dropP}><Link className={classes.dropP} to='/categories/fashion'><FontAwesomeIcon icon={faShirtsinbulk}></FontAwesomeIcon> Fashion</Link></p>
                    <p onClick={changeCategoriesHandler} className={classes.dropP}><Link className={classes.dropP} to='/categories/stickers'><FontAwesomeIcon icon={faStickerMule}></FontAwesomeIcon> Stickers</Link></p>
                    <p onClick={changeCategoriesHandler} className={classes.dropP}><Link className={classes.dropP} to='/categories/photography'><FontAwesomeIcon icon={faCamera}></FontAwesomeIcon> Photography</Link></p>
                    <p onClick={changeCategoriesHandler} className={classes.dropP}><Link className={classes.dropP} to='/categories/design'><FontAwesomeIcon icon={faImages}></FontAwesomeIcon> Design</Link></p>
                    <p onClick={changeCategoriesHandler} className={classes.dropP}><Link className={classes.dropP} to='/categories/software-development'><FontAwesomeIcon icon={faDesktop}></FontAwesomeIcon> Software Development</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Dropdown;

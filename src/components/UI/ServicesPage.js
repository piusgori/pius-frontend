import { faShoppingCart, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './ServicesPage.module.css'

const ServicesPage = () => {
    return(
        <div className={classes.servicesContainer}>
            <div className={classes.insideServices}>
                <div className={classes.eachService}>
                    <div className={classes.left}>
                        <FontAwesomeIcon className={classes.icon} icon={faUser}></FontAwesomeIcon>
                    </div>
                    <div className={classes.right}>
                        <h1>Free Registration</h1>
                        <p>For any comrade who sells to join our community</p>
                    </div>
                </div>
                <div className={classes.eachService}>
                    <div className={classes.left}>
                        <FontAwesomeIcon className={classes.icon} icon={faShoppingCart}></FontAwesomeIcon>
                    </div>
                    <div className={classes.right}>
                        <h1>Shop anything</h1>
                        <p>Get anything your comrades sell in your campus</p>
                    </div>
                </div>
                <div className={classes.eachService}>
                    <div className={classes.left}>
                        <FontAwesomeIcon className={classes.icon} icon={faUsers}></FontAwesomeIcon>
                    </div>
                    <div className={classes.right}>
                        <h1>Join The Great Community</h1>
                        <p>Where different comrades interactively sell and buy</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicesPage;

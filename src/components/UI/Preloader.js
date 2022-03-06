import classes from './Preloader.module.css';
import image from '../images/Pius 3.png';
const Preloader = (props) => {
    return (
        <div className={props.preloaderValue ? classes.container: classes.none}>
            <div className={classes.ring}></div>
            <div className={classes.down}>
                <img src={image} className={classes.picture} alt=''></img>
                <p className={classes.text}>Hello...</p>
            </div>
        </div>
    )
}

export default Preloader;
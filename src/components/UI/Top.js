import { Link } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import Header from './Header';
import classes from './Top.module.css'
const Top = (props) => {
    return(
        <Fragment>
            <div className={classes.contain}>
                <Header onDropClick={props.onDropClick}></Header>
                <div className={classes.rest}>
                    <div className={classes.inside}>
                        <h1 className={classes.h1}>Beautiful Indeed</h1>
                        <h2 className={classes.h2}>Pius & Joskimsey Shop</h2>
                        <div className={classes.eachB}>
                            <button className={classes.first}><Link className={classes.homeLink} to='/store'>Our Store</Link></button>
                            <button className={classes.second}><Link className={classes.homeLink} to='/cart'>Cart</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Top;
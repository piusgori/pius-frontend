import { Fragment } from 'react/cjs/react.production.min';
import classes from './Loading.module.css';

const Loading = () => {
    return(
        <Fragment>
            <div className={classes.spaced}></div>
            <div className={classes.ring}></div>
        </Fragment>
    )
}

export default Loading;
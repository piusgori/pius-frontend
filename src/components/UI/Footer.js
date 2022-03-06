import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Footer.module.css';
import { useState } from 'react';

const Footer = (props) => {
    const url = props.url;
    const [email, setEmail] = useState('');
    const [footerLoading, setFooterLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const emailNotEmpty = email !== '';
    const successNotEmpty = success !== '';

    const emailChangeHandler = (event) => {setEmail(event.target.value)};

    const emailSenderHandler = () => {
        setFooterLoading(true);
        fetch(`${url}/send-mail`, {
            method: 'POST',
            body: JSON.stringify({email: email}),
            headers: {'Content-Type' : 'application/json'}
        }).then(response => {
            return response.json();
        }).then(responseData => {
            setSuccess(responseData.message);
            setFooterLoading(false);
        }).catch(err => {console.log(err)});
    }

    return(
        <footer>
            <div className={classes.footer}>
                <div className={classes.content}>
                    <div className={classes.each}>
                        <h1>NewsLetter</h1>
                        <p>Get the latest updates at the comfort of your home</p>
                        {footerLoading && <h4 className={classes.pLoading}>Loading...</h4>}
                        {successNotEmpty && <h5 className={classes.pSuccess}>{success}</h5>}
                        <div className={classes.send}>
                            <input onChange={emailChangeHandler} value={email} type='email' name='email' placeholder='Enter Your Email'></input>
                            {emailNotEmpty === true ? <button className={classes.fButton} onClick={emailSenderHandler}><FontAwesomeIcon icon={faShareSquare}></FontAwesomeIcon></button> : <button className={classes.fButtonDisabled}><FontAwesomeIcon icon={faShareSquare}></FontAwesomeIcon></button>}
                        </div>
                    </div>
                    <div className={classes.each}>
                        <h1>Follow us</h1>
                        <p>Find us on our Social Media Platforms</p>
                        <div className={classes.icons}>
                            <p><a href='https://www.facebook.com/ian.pius.12' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon></a></p>
                            <p><a href="https://www.instagram.com/p.i_u.s/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></a></p>
                            <p><a href='https://twitter.com/IanPius3?t=-Lf6Ul4gQdTTUQ7QVZwXUA&s=08' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></a></p>
                            <p><a href='https://www.linkedin.com/in/ian-pius-13b08b231' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon></a></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;
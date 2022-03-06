import classes from './Main.module.css';
import Top from '../UI/Top';
import ServicesPage from '../UI/ServicesPage';
import Testimonials from '../UI/Testimonials';
import HomeProducts from '../UI/HomeProducts';
import Discount from '../UI/Discount';
import Footer from '../UI/Footer';
import AlertLogout from '../display/AlertLogout';
import { useSelector } from 'react-redux';
import Dropdown from '../display/Dropdown';
import AlertLogin from '../display/AlertLogin';
import TheCart from '../display/TheCart';

const Main = (props) => {
    const isLog = useSelector(state => state.login.logoutDisplay);

    return (
        <section className={props.preloaderValue ? classes.none : ''}>
            <div className={isLog ? classes.hideOverflow : ''}>
                <Dropdown categoriesChange={props.categoriesChange} onDropClick={props.onDropClick} drop={props.drop}></Dropdown>
                <AlertLogout></AlertLogout>
                <AlertLogin shouldLogin={props.shouldLogin} hideAlerting={props.hideAlerting}></AlertLogin>
                <Top onDropClick={props.onDropClick}></Top>
                <ServicesPage></ServicesPage>
                <HomeProducts checkShouldLogin={props.checkShouldLogin} url={props.url}></HomeProducts>
                <Testimonials></Testimonials>
                <Discount url={props.url}></Discount>
                <TheCart></TheCart>
                <Footer url={props.url}></Footer>
            </div>
        </section>
    )
}

export default Main;
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import store from './store/index';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';


ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
        <App></App>
    </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

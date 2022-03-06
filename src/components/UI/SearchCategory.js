import { useNavigate } from 'react-router-dom';
import classes from './Search.module.css';

const SearchCategory = (props) => {
    const url = props.url;
    const name = props.name;
    const navigate = useNavigate();
    const showCategoryHandler = () => {
        fetch(`${url}/search-result`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({input: name})
        }).then(response => {
            return response.json();
        }).then(responseData => {
            if(!responseData.errorMessage){
                if(responseData.category){
                    navigate(`/categories/${responseData.category}`);
                } else if(responseData.product){
                    navigate(`/product/${responseData.product}`);
                } else if(responseData.person){
                    navigate(`/people/${responseData.person}`)
                }
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return(
        <div>
            <p onClick={showCategoryHandler} className={classes.personName}>{name}</p>
        </div>
    )
}

export default SearchCategory;
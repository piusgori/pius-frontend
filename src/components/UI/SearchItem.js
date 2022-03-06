import { useNavigate } from 'react-router-dom';

const SearchItem = (props) => {
    const url = props.url;
    const item = props.item;
    const navigate = useNavigate();
    const showItemHandler = () => {
        fetch(`${url}/search-result`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({input: item})
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
    return (
        <p onClick={showItemHandler}>{item}</p>
    )
}

export default SearchItem;
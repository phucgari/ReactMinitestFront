import React, {useEffect} from 'react';
import GenerateList from "./GenerateList";
import axios from "axios";

function BuyerForm(props) {
    const{user,categories,setCategories}=props
    useEffect(() => {
        axios.get("http://localhost:8080/product/categories").then(
            (data) => {
                setCategories(data.data)
            }
        )
    }, [])
    return (
        <div>
            <GenerateList
                user={user}
                categories={categories}
            />
        </div>
    );
}

export default BuyerForm;
import React, {useEffect} from 'react';
import GenerateList from "./GenerateList";
import axios from "axios";
import Cart from "./Cart";

function BuyerForm(props) {
    const{user,categories,setCategories}=props
    const[cart,setCart]=React.useState([])
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
                setCart={setCart}
            />
            <Cart
                cart={cart}
                setCart={setCart}
            />
        </div>
    );
}

export default BuyerForm;
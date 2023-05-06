import React, {useEffect} from 'react';
import axios from "axios";

function GenerateList(props) {
    const {user, setProduct,message} = props
    const isSeller = user.role.name === "SELLER"
    const seller_id = isSeller ? "/" + user.id : ""
    const [products, setProducts] = React.useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/product" + seller_id).then(data =>
            setProducts(data.data)
        )
    },[message])
    console.log(products)
    return (
        <div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                    <th>Categories</th>
                </tr>
                {products.map((product)=>
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td></td>
                        <td>
                            {product.categories.map(category=>
                                <>
                                    <label>{category.name}</label>
                                    <br/>
                                </>
                            )}
                        </td>
                    </tr>
                )}
            </table>

        </div>
    );
}

export default GenerateList;
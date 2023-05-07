import React, {useEffect} from 'react';
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";

function GenerateList(props) {
    const {user, setCart, setProduct, message, categories} = props
    const isSeller = user.role.name === "SELLER"
    const seller_id = isSeller ? "/" + user.id : ""
    const [products, setProducts] = React.useState([])
    const [productSearch, setProductSearch] = React.useState({
        name: '',
        minPrice: '',
        maxPrice: '',
        categories: []
    })
    useEffect(() => {
        axios.get("http://localhost:8080/product" + seller_id + `?name=${productSearch.name}&minPrice=${productSearch.minPrice}&maxPrice=${productSearch.maxPrice}&categories=${productSearch.categories}`).then(data =>
            setProducts(data.data)
        )
    }, [message, productSearch])

    function onSubmit(formData) {
        setProductSearch({...formData})
    }

    function updateForm(event, id) {
        axios.get("http://localhost:8080/product/get/" + id).then(
            data => {
                setProduct(data.data)
            })
    }

    function deleteProd(event, id) {
        axios.delete("http://localhost:8080/product/delete/" + id).then(
            data => {
                setProductSearch({
                    name: '',
                    minPrice: '',
                    maxPrice: '',
                    categories: []
                })
            }
        )
    }

    function addCart(event, productToAdd) {
        console.log(productToAdd)
        setCart(
            prevCart => {
                let productIndex=prevCart.findIndex((productInCart)=>productInCart.id===productToAdd.id);
                if(productIndex === -1){
                    prevCart.push({
                        ...productToAdd,
                        number:1
                    })
                }else {
                    console.log(prevCart[productIndex])
                    prevCart[productIndex] = {
                        ...productToAdd,
                        number: (prevCart[productIndex].number +1)
                    }
                }
                return ([
                    ...prevCart,
                ])
            }
        )
    }

    return (
        <div>
            <h1>SearchForm</h1>
            <Formik
                initialValues={productSearch}
                onSubmit={onSubmit}
            >
                <Form>
                    <label htmlFor="name">name Search</label>
                    <Field name="name" id="name"/>
                    <br/>
                    <label htmlFor="minPrice">min Price</label>
                    <Field type="number" name="minPrice" id="minPrice"/>
                    <br/>
                    <label htmlFor="maxPrice">max Price</label>
                    <Field type="number" name="maxPrice" id="maxPrice"/>
                    <br/>
                    {categories.map(
                        (category) =>
                            <React.Fragment key={category.id}>
                                <label>
                                    <Field type="checkbox" name="categories" value={category.id + ''}/>
                                    {category.name}
                                </label>
                                <br/>
                            </React.Fragment>
                    )}
                    <button type="submit">Search</button>
                </Form>
            </Formik>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                    <th>Categories</th>
                </tr>
                {products.map((product) =>
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>
                            {isSeller &&
                                <button onClick={event => updateForm(event, product.id)}> Update {product.id} </button>}
                            {isSeller &&
                                <button onClick={event => deleteProd(event, product.id)}>Delete {product.id}</button>}
                            {isSeller ||
                                <button onClick={event => addCart(event, product)}>Add {product.id} to Cart</button>}
                        </td>
                        <td>
                            {product.categories.map(category =>
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
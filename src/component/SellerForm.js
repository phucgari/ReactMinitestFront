import React, {useEffect} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import * as Yup from "yup";
import GenerateList from "./GenerateList";

const validationSchema = Yup.object({
    name:Yup.string().required(),
    price: Yup.string().required()
})
function SellerForm(props) {
    const {user,categories,setCategories} = props
    const [product, setProduct] = React.useState(
        {
            name: "",
            price: "",
            categories: [],
            owner: {...user}
        }
    )
    const [message,setMessage]=React.useState('')
    useEffect(() => {
        axios.get("http://localhost:8080/product/categories").then(
            (data) => {
                setCategories(data.data)
            }
        )
    }, [message])
    function onSubmit(data,action){
        if(data.id===""){
            axios.post("http://localhost:8080/product/create",data).then(r =>{
                setMessage(`created ${data.name}`)
            })
        }else{
            axios.put("http://localhost:8080/product/update",data).then(r=>{
                setMessage(`update ${data.name}`)
            })
        }
        action.resetForm()
    }

    console.log(product)
    return (
        <div>
            seller
            <Formik
                initialValues={product}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                enableReinitialize={true}
            >
                <Form>
                    <label htmlFor="name">name</label>
                    <Field name="name" id="name"/>
                    <ErrorMessage name="name"/>
                    <br/>
                    <label htmlFor="price">price</label>
                    <Field type="number" name="price" id="price"/>
                    <ErrorMessage name="price"/>
                    <br/>
                    {categories.map(
                        (category) =>
                            <React.Fragment key={category.id}>
                                <label>
                                    <Field type="checkbox" name="categories" value={category.id+''} checked={product.categories.find(e=>e.name===category.name)}/>
                                    {category.name}
                                </label>
                                <br/>
                            </React.Fragment>
                    )}
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <p>{message}</p>
            <GenerateList
            user={user}
            message={message}
            categories={categories}
            product={product}
            setProduct={setProduct}
            />
        </div>
    );
}

export default SellerForm;
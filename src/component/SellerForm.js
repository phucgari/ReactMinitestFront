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
    const {user} = props
    const [product, setProduct] = React.useState(
        {
            name: "",
            price: "",
            categories: [],
            owner: {...user}
        }
    )
    const [categories, setCategories] = React.useState([])
    const [message,setMessage]=React.useState('')
    useEffect(() => {
        axios.get("http://localhost:8080/product/categories").then(
            (data) => {
                setCategories(data.data)
            }
        )
    }, [message])
    function onSubmit(data,action){
        console.log(data)
        axios.post("http://localhost:8080/product/create",data).then(r =>{})
        action.resetForm()
        setMessage(`created ${data.name}`)
    }
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
                                    <Field type="checkbox" name="categories" value={category.id+''}/>
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
            setProduct={setProduct}
            user={user}
            message={message}
            />
        </div>
    );
}

export default SellerForm;
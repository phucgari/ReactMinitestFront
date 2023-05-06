import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {redirect, useNavigate} from "react-router-dom";

const validationSchema = Yup.object({
    username: Yup.string().required(' username is required'),
    password: Yup.string().required(' Password is required')
})

function LoginForm(props) {
    const {user, setUser} = props
    const [flag,setFlag]=React.useState(false)
    let navigate = useNavigate();
    function onSubmit(values) {
        console.log(values)
        axios.post('http://localhost:8080/user/login', {
            username:values.username,
            password:values.password
        }).then(
            (data)=>{
                let userFromServer=data.data
                setUser({
                    ...userFromServer
                })
                navigate("/"+userFromServer.role.name)
            }
        ).catch(
            (data)=>{
                setFlag(true)
            }
        )
    }
    return (
        <>
            <Formik
                initialValues={user}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form>
                    <label htmlFor="username">username</label>
                    <Field name="username" id="username"/>
                    <ErrorMessage name="username"/>
                    <br/>
                    <label htmlFor="password">Password</label>
                    <Field type="password" name="password" id="password"/>
                    <ErrorMessage name="password"/>
                    <br/>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            {flag && <p>Failed login</p>}
        </>
    );
}

export default LoginForm;

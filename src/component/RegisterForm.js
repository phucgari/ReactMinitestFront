import React from 'react';
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object({
    password:Yup.string().equals
})
function RegisterForm(props) {
    const [user,setUser]=React.useState({
    })
    console.log(user)
    function onsubmit(props){
        setUser({

        })
    }
    return (
        <Formik
        initialValues={user}
        onSubmit={(props)=>onsubmit(props)}>
            <Form>
                <label htmlFor="userName">UserName</label>
                <Field name="userName" id="userName"/>
                <br/>
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" id="password"/>
                <br/>
                <label htmlFor="password2">Repeat Password</label>
                <Field type="password" name="repeatedPassword" id="repeatedPassword"/>
                <br/>
                <button type="submit" >Submit</button>
            </Form>
        </Formik>
    );
}

export default RegisterForm;
import React, {useEffect} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
    username: Yup.string().required(' username is required')
        .test('username-match', 'matched username', async function (username) {
                return axios.get("http://localhost:8080/user/check/" + username).then(
                    () => true
                ).catch(
                    () => false
                )
            }
        ),
    password: Yup.string().required(' Password is required'),
    repeatedPassword: Yup.string().required(' enter Repeated Password')
        .test('passwords-match', ' Passwords must match', function (value) {
            return this.parent.password === value
        }),
    role: Yup.object({
        id: Yup.number().required(' Pick Role')
    })
})

function RegisterForm(props) {
    const [user, setUser] = React.useState({
        username: "",
        password: "",
        repeatedPassword: "",
        role: {
            id: ''
        }
    })
    let navigate = useNavigate();
    const [roles, setRoles] = React.useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/user/roles").then(
            (data) => {
                setRoles(data.data)
            }
        )
    }, [])
    const onSubmit = (props, action) => {
        console.log(props)
        action.resetForm()
        axios.post("http://localhost:8080/user/register", props).then(
            (data) => {
                navigate('/login')
            }
        )
    }
    return (
        <Formik
            initialValues={user}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            <Form>
                <label htmlFor="username">username</label>
                <Field name="username" id="username"/>
                <ErrorMessage name="username"/>
                <br/>
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" id="password"/>
                <ErrorMessage name="password"/>
                <br/>
                <label htmlFor="password2">Repeat Password</label>
                <Field type="password" name="repeatedPassword" id="repeatedPassword"/>
                <ErrorMessage name="repeatedPassword"/>
                <br/>
                {
                    roles.map(
                        (role) => {
                            console.log(role)
                            return (
                                <label key={role.id}>
                                    <Field type="radio" name="role.id" value={role.id + ''}/>
                                    {role.name}
                                </label>
                            )
                        }
                    )
                }
                <ErrorMessage name='role.id'/>
                <br/>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
}

export default RegisterForm;
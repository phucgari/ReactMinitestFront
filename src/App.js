import './App.css';
import RegisterForm from "./component/RegisterForm";
import LoginForm from "./component/LoginForm";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useEffect} from 'react';
import SellerForm from "./component/SellerForm";
import BuyerForm from "./component/BuyerForm";

function App() {
    const [user,setUser]=React.useState({
        id:'',
        username:'',
        password:'',
        role:{
            id:''
        }
    })
    const [categories, setCategories] = React.useState([])
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<RegisterForm/>}/>
                <Route path='/login'
                       element={<LoginForm
                           setUser={setUser}
                           user={user}
                       />}
                />
                <Route path='/BUYER'
                       element={<BuyerForm
                           categories={categories}
                           setCategories={setCategories}
                           user={user}
                       />} />
                <Route path='/SELLER'
                       element={<SellerForm
                           categories={categories}
                           setCategories={setCategories}
                           user={user}
                       />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

import React,{useState} from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recovery from "./pages/Recovery";
import Home from "./pages/Home";
import Users from "./pages/Users";

import { usuarioAutenticado } from "./services/auth";

import Context from "./store/index";



const Routes = () =>{

    const [value, setValue] = useState('');

    const PrivateRoute = () => (
        <Route
            render={props => usuarioAutenticado() ? 
                (
                    <Route path='/home' component={Home} />
                ) 
                : 
                (
                    <Redirect to={{ pathname: '/' }} />
                )}
        />
    )

    return(
        <Router>
            <Context.Provider value={{value, setValue}}>
                <Route path='/' exact component={Login} />
                <Route path='/signup' component={Signup} />
                <Route path='/recovery' component={Recovery} />
                <Route path='/users' component={Users} />
                <PrivateRoute path='/home' component={Home} />
            </Context.Provider>
        </Router>
    )}

export default Routes;
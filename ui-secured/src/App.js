import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from "react-router-dom";

import jwt_decode from 'jwt-decode';
import AuthContext from "./AuthContext";
import Home from './components/Home';
import Agents from './components/Agents';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Header from './components/Header';
import Register from './components/Register';
import AddAgent from './components/AddAgent';
import EditAgent from './components/AddAgent';
import DeleteAgent from './components/AddAgent';

import React, { useState } from 'react';
const TOKEN_KEY = "user-api-token";

function App() {
  const [user, setUser] = useState(null);
  const login = (token) => {
    console.log(token);

    localStorage.setItem(TOKEN_KEY, token);

    const tokenObj = jwt_decode(token);
    console.log(tokenObj);

    const { sub: username, authorities: roleString } = tokenObj;

    const roles = roleString.split(',');

    const user = {
      username,
      roles,
      token,
      hasRole(role) {
        return roles.includes(role);
      }
    }
    console.log(user);

    setUser(user);

    return user;
  };
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };
  const auth = {
    user: user ? { ...user } : null,
    login,
    logout,
  };

  return (
    
    <AuthContext.Provider value={auth}>
      
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home /> 
            </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/agents">
            {auth.user ? <Agents /> : <Redirect to="/login" />}
          </Route>
          <Route path="/agents/add">
            {auth.user ? <AddAgent /> : <Redirect to="/login" />}
          </Route>
          <Route path="/agents/edit/:id">
            {auth.user ? <EditAgent /> : <Redirect to="/login" />}
          </Route>
          <Route path="/agents/delete/:id">
            {auth.user ? <Agents /> : <Redirect to="/login" />}
          </Route>
          <Route path="/*"> <NotFound />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

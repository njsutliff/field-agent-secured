import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import AuthContext from "./AuthContext";

import Home from './components/Home';
import Agents from './components/Agents';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Header from './components/Header';
import React, {useState} from 'react';

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
  
  /*
   <Route path = "/agents/add" element = {<Home/>} />
  <Route path = "/agents/edit/:id" element = {<Home/>} />
  <Route path = "/agents/delete/:id" element = {<Home/>} />
  <Route path = "/login" element = {<Agents/>} />
*/
  return (
    <AuthContext.Provider value={auth}>
<Router>
<Header />

<Routes>
  <Route exact path = "/" element = {<Home/>} />
  
  <Route path = "/login" element = {<Login/>}/>
  <Route path = "/agents" element = {<Agents/>} />
  <Route path = "/*" element = {<NotFound/>} />

</Routes>

</Router>
</AuthContext.Provider>
  );
}

export default App;

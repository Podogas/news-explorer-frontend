import React, { useState } from "react";
import './App.css';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import About from '../About/About.jsx';
import Footer from '../Footer/Footer.jsx';

function App() {
const [loggedIn, setLoggedIn] = useState(true);
const [currentUser, setCurrentUser] = useState({name:'28SymBolsMax'});

function handleLogOut() {
  setLoggedIn(false)
  console.log('logOUT')
}
function handleLogin() {
  setLoggedIn(true)
  console.log('loginPopUP')
}
function handleAuthClick() {
  return(loggedIn ? handleLogOut() : handleLogin()) 
}
  return (
    <div className="app">
      <Header loggedIn={loggedIn} authButtonClick={handleAuthClick} name={currentUser.name}/>
      <Switch>
        <Route 
            exact
            path="/">
            <Main></Main>
            <About></About>
        </Route>
        <Route 
            exact
            path="/saved-news">
            <Main></Main>
            <p>saved-news</p>
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;

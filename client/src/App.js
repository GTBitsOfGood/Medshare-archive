import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import LoginSignupContainer from "./pages/LoginSignupContainer.js"

function App() {
  return (
      <BrowserRouter>
        <Switch>
            /*temporary rendering / route to login/signup page; will render search engine later*/
            <Route path="/" render={(props) => <LoginSignupContainer {...props} />}  />
            <Route path="/account" render={(props) => <LoginSignupContainer {...props} />} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;

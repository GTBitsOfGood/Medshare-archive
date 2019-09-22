import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Login from "./pages/LoginContainer.js"

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/" render={(props) => <Login {...props} />} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;

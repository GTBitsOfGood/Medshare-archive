import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginSignupContainer from './pages/LoginSignupContainer';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* temporary rendering / route to login/signup page; will render search
        engine later */}
        <Route path="/" component={LoginSignupContainer} />
        <Route path="/account" component={LoginSignupContainer} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

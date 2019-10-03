import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginSignupContainer from './pages/LoginSignupContainer';
import AccountPortalContainer from './pages/AccountPortalContainer';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/account" component={LoginSignupContainer} />
        <Route path="/account_portal" component={AccountPortalContainer} />
        {/* temporary rendering / route to login/signup page; will render search
        engine later */}
        <Route path="/" component={LoginSignupContainer} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

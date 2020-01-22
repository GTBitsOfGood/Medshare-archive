import React from 'react';

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginSignupContainer from './pages/LoginSignupContainer';
import AccountPortalContainer from './pages/AccountPortalContainer';
import Label from './components/Label';
import Home from './components/home/Home';

function App() {
  const labelData = {
    name: 'Kitten',
    productReference: 'YEET',
    category: 'Cutie pies',
    subcategory: 'Cutie Queen',
    uom: 'Whole',
    description: `Lorem ipsum dolor sit amet consectetur 
adipisicing elit. Ullam ut molestiae neque maxime 
praesentium fuga culpa, eos dolore? Aperiam fugit 
ducimus ipsa tempora enim, porro ab molestiae id ea 
repudiandae.`,
  };
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/account" component={LoginSignupContainer} />
        <Route path="/account_portal" component={AccountPortalContainer} />
        <Route
          path="/label"
          render={props => <Label {...props} labelData={labelData} />}
        />
        <Route path="/search" component={Home} />
        {/* temporary rendering / route to login/signup page; will render search
        engine later */}
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

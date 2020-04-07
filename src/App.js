import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Register from './components/Auth/Register';
import MainInterface from './components/Layout/MainInterface';
import SignIn from './components/Auth/SignIn';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup" component={Register} />
        <Route path="/messenger" component={MainInterface} />
      </Switch>
    </div>
  );
}

export default App;

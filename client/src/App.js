import React from 'react';
import Scores from "./pages/Scores";
import User from "./pages/User";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
    <div>
      <Switch>
      <Route exact path="/" component={Scores} />
      <Route exact path="/user" component={User} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;

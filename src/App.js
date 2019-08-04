import React from 'react';
import Scores from "./pages/Scores";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
    <div>
      <Switch>
      <Route exact path="/" component={Scores} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;

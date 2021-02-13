import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import MainPage from "./pages";
import HistoryPage from "./pages/secondpage"

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/secondpage" component={HistoryPage} />
          </Switch>
        </Router>
    );
  }
}

export default App;


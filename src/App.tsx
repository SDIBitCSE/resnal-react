import React from "react";
import Navbar from "./nav";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Batch from "./batch";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/batch" />
          </Route>
          <Route path="/batch">
            <Batch />
          </Route>
          <Route path="/subject">
            <h1>Subjectwize</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

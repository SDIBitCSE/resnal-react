import React from "react";
import Navbar from "./nav";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Batch from "./batch";
import Subject from "./subject";
import Student from "./student";
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
            <Subject />
          </Route>
          <Route path="/student">
            <Student />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

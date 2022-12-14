import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/dashboard/Dashboard.js";
import School from "./components/Program/School.js";
import Subject from "./components/Program/Subject.js";
import Course from "./components/Program/Course.js";

import "./Login.css";

ReactDOM.render(
  <BrowserRouter>
    <h1>Welcome to iLearn</h1>

    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      {/* <Route path="/program/school" component={School} /> */}
      <Route path="/program/subject" component={Subject} />
      <Route path="/program/course" component={Course} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

import React from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

const AuthGuard = (props) => {
  const token = localStorage.TOKEN;
  if (token) {
    return <>{props.children}</>;
  } else {
    return <Redirect to="/login" />;
  }
};

const Router = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <AuthGuard>
          <App>
            <Route exact path="/" component={Home} />
          </App>
        </AuthGuard>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

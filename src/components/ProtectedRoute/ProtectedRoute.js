import React, { useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  useEffect(() => {
    if (!props.loggedIn) {
      props.setIsPopupOpened(true);
    } else {
      props.setIsPopupOpened(false);
    }
  });
  function redirect() {
    return <Redirect to="/" />;
  }
  return (
    <Route path={props.path}>
      {() => (props.loggedIn ? <Component {...props} /> : redirect())}
    </Route>
  );
};

export default ProtectedRoute;

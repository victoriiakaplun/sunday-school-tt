import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ children, isAuthenticated, ...props }) {
  return (
    <Route
      {...props}
      render={renderProps =>
        isAuthenticated ? (
          React.cloneElement(children, { ...renderProps })
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
}

export default PrivateRoute;

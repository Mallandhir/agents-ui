import { Route, RouteProps } from "react-router-dom";

/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */
const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props: RouteProps) => {
        // if (api.isUserAuthenticated() === false) {
        //   // not logged in so redirect to login page with the return url
        //   return (
        //     <Navigate
        //       to={{
        //         pathname: "/auth/login"
        //         // state: { from: props["location"] },
        //       }}
        //     />
        //   );
        // }

        // const loggedInUser = api.getLoggedInUser();

        // // check if route is restricted by role
        // if (roles && roles.indexOf(loggedInUser.role) === -1) {
        //   // role not authorised so redirect to home page
        //   return <Navigate to={{ pathname: "/" }} />;
        // }
        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;

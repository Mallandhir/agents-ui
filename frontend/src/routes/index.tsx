import React from "react";
import { Navigate, RouteProps } from "react-router-dom";

// components
import PrivateRoute from "./PrivateRoute";

// dashboard
const EcommerceDashboard = React.lazy(() => import("../pages/dashboard/Ecommerce/"));
const AnalyticsDashboard = React.lazy(() => import("../pages/dashboard/Analytics/"));

export interface RoutesProps {
  path: RouteProps["path"];
  name?: string;
  element?: RouteProps["element"];
  route?: any;
  exact?: boolean;
  icon?: string;
  header?: string;
  roles?: string[];
  children?: RoutesProps[];
}

// dashboards
const dashboardRoutes: RoutesProps = {
  path: "/dashboard",
  name: "Dashboards",
  icon: "airplay",
  header: "Navigation",
  children: [
    {
      path: "/",
      name: "Root",
      element: <Navigate to="/dashboard/ecommerce" />,
      route: PrivateRoute
    },
    {
      path: "/dashboard/ecommerce",
      name: "Ecommerce",
      element: <EcommerceDashboard />,
      route: PrivateRoute
    },
    {
      path: "/dashboard/analytics",
      name: "Analytics",
      element: <AnalyticsDashboard />,
      route: PrivateRoute
    }
  ]
};

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
  let flatRoutes: RoutesProps[] = [];

  routes = routes || [];
  routes.forEach((item: RoutesProps) => {
    flatRoutes.push(item);

    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const authProtectedRoutes = [dashboardRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);

export { authProtectedFlattenRoutes, authProtectedRoutes };

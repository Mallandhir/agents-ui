import React from "react";
import { Route, Routes } from "react-router-dom";

// layout constants

// All layouts containers
import HorizontalLayout from "../layouts/Horizontal/";
import TwoColumnLayout from "../layouts/TwoColumn/";
import VerticalLayout from "../layouts/Vertical";

import { authProtectedFlattenRoutes } from "./index";

import { useThemeContext } from "@/context";

interface RoutesProps {}

const AllRoutes = (props: RoutesProps) => {
  // const { layout } = useSelector((state: RootState) => ({
  //   layout: state.Layout,
  // }));

  const {
    settings: { layoutType }
  } = useThemeContext();

  const getLayout = () => {
    let Layout = HorizontalLayout;
    if (layoutType === "horizontal") {
      Layout = HorizontalLayout;
    } else if (layoutType === "two-column") {
      Layout = TwoColumnLayout;
    } else {
      Layout = VerticalLayout;
    }
    return Layout;
  };

  const Layout = getLayout();

  return (
    <React.Fragment>
      <Routes>
        {/* <Route>
          {publicProtectedFlattenRoutes.map((route, idx) => (
            <Route path={route.path} element={<DefaultLayout {...props}>{route.element}</DefaultLayout>} key={idx} />
          ))}
        </Route> */}

        <Route>
          {authProtectedFlattenRoutes.map((route, idx) => (
            <Route path={route.path} element={<Layout {...props}>{route.element}</Layout>} key={idx} />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default AllRoutes;

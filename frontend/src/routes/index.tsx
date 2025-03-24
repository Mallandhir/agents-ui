import Layout from "@/components/core/Layout";
import SuspenseWrapper from "@/components/core/SuspenseWrapper";
import { history } from "@/lib/router";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ApplyRouteRules from "./ApplyRouteRules";
import routes from "./routes";

function AppRoutes() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <>
      <ToastContainer />
      <Routes>
        {routes.map((route) => {
          const routeKey = `route-${route.path}}`;
          const ruleKey = `rule-${route.path}}`;
          return (
            <Route
              key={routeKey}
              path={route.path}
              element={
                <ApplyRouteRules key={ruleKey} rules={route.rules}>
                  <Layout type={route.layout}>
                    <SuspenseWrapper>
                      <route.component />
                    </SuspenseWrapper>
                  </Layout>
                </ApplyRouteRules>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default AppRoutes;

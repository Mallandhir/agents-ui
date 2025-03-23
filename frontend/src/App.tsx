import AppRoutes from "@/routes";
import { BrowserRouter } from "react-router-dom";

import ErrorPage from "@/components/core/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";

const Router = BrowserRouter;

function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Router>
          <AppRoutes />
        </Router>
      </ErrorBoundary>
    </>
  );
}

export default App;

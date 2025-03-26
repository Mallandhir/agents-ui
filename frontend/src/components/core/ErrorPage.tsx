import { AlertTriangle } from "lucide-react";
import { FallbackProps } from "react-error-boundary";
import Layout from "./Layout";

function ErrorPage({ error, resetErrorBoundary }: FallbackProps) {
  console.log("[ErrorBoundary]", error, error?.message);

  return (
    <Layout type="main">
      <div className="flex flex-col justify-center items-center" style={{ height: "75vh" }}>
        <div>
          <AlertTriangle className="text-warning" size={32} />
        </div>
        <h2>Something went wrong!</h2>
        <p className="text-center w-75 fs-12">
          We are working on it. Please try again later or contact support if the error persists.
        </p>
        <div>
          <div className="cursor-pointer" onClick={() => (window.location.href = "/")}>
            <i className="bi bi-arrow-left me-1"></i>Take me back to Home
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ErrorPage;

import { FallbackProps } from "react-error-boundary";
import Layout from "./Layout";

type IComponentErrorProps = FallbackProps & {
  title?: string;
  description?: string;
};

function ComponentError(props: IComponentErrorProps) {
  return (
    <Layout type="main">
      <div>
        <div>
          <i className="bi bi-exclamation-triangle-fill text-warning me-1"></i>
          <span>{props.title ?? "Something went wrong."}</span>
        </div>
        <p className="fs-12 fw-light">
          {props.description ?? "Please try again later or contact support if the error persists."}
        </p>
      </div>
    </Layout>
  );
}

export default ComponentError;

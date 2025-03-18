import { Suspense, useEffect } from "react";

const loading = () => <div className=""></div>;

interface DefaultLayoutProps {
  children?: any;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  useEffect(() => {
    if (document.body) document.body.classList.add("authentication-bg");

    return () => {
      if (document.body) document.body.classList.remove("authentication-bg");
    };
  }, []);

  // get the child view which we would like to render
  const children = props["children"] || null;

  return (
    <>
      <Suspense fallback={loading()}>{children}</Suspense>
    </>
  );
};
export default DefaultLayout;

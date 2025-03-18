import { useThemeContext } from "@/context";
import { useViewport } from "@/hooks/useViewPort";
import React, { Suspense, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import("../Topbar"));
const LeftSidebar = React.lazy(() => import("./LeftSidebar"));
// const Footer = React.lazy(() => import("../Footer"));
const RightSidebar = React.lazy(() => import("../RightSidebar"));

const loading = () => <div className="text-center"></div>;

interface VerticalLayoutProps {
  children?: any;
}

const TwoColumnLayout = ({ children }: VerticalLayoutProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const { width } = useViewport();
  const {
    updateSidenav: { mode }
  } = useThemeContext();

  useEffect(() => {
    if (width <= 991) {
      mode("mobile");
    } else if (width > 991) {
      mode("default");
    }
  }, [width]);

  /**
   * Open the menu when having mobile screen
   */
  const openMenu = () => {
    const newMenuState = !isMenuOpened;
    setIsMenuOpened(newMenuState);
    if (document.body) {
      if (newMenuState) {
        document.getElementsByTagName("html")[0].classList.add("sidebar-enable");
      } else {
        document.getElementsByTagName("html")[0].classList.remove("sidebar-enable");
      }
    }
  };

  return (
    <>
      <div id="wrapper">
        <Suspense fallback={loading()}>
          <Topbar openLeftMenuCallBack={openMenu} topbarDark={true} />
        </Suspense>
        <Suspense fallback={loading()}>
          <LeftSidebar />
        </Suspense>

        <div className="content-page">
          <div className="content">
            <Container fluid>
              <Suspense fallback={loading()}>{children}</Suspense>
            </Container>
          </div>

          {/* <Suspense fallback={loading()}>
            <Footer />
          </Suspense> */}
        </div>
      </div>
      {/* {isOpenRightSideBar && ( */}
      <Suspense fallback={loading()}>
        <RightSidebar />
      </Suspense>
      {/* )} */}
    </>
  );
};

export default TwoColumnLayout;

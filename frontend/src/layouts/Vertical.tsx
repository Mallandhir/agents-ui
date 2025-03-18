import React, { Suspense, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

// actions

// store

// constants

// utils
import { useThemeContext } from "@/context";
import { useViewport } from "../hooks/useViewPort";

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import("./Topbar"));
const LeftSidebar = React.lazy(() => import("./LeftSidebar"));
const RightSidebar = React.lazy(() => import("./RightSidebar"));

const loading = () => <div></div>;

interface VerticalLayoutProps {
  children?: any;
}

const VerticalLayout = ({ children }: VerticalLayoutProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const { width } = useViewport();
  const {
    updateSidenav: { mode }
  } = useThemeContext();
  /*
    layout defaults
    */

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

  // const updateDimensions = useCallback(() => {
  //   // activate the condensed sidebar if smaller devices like ipad or tablet

  // }, [dispatch]);

  // const isCondensed: boolean =
  //   leftSideBarType === SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED;

  return (
    <>
      <div id="wrapper">
        <Suspense fallback={loading()}>
          <Topbar openLeftMenuCallBack={openMenu} hideLogo={false} />
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
export default VerticalLayout;

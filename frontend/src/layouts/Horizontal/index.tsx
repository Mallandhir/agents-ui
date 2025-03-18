import React, { Suspense, useState } from "react";
import { Container } from "react-bootstrap";

// store

// constants

// utils

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import("../Topbar"));
const Navbar = React.lazy(() => import("./Navbar"));
// const Footer = React.lazy(() => import("../Footer"));
const RightSidebar = React.lazy(() => import("../RightSidebar"));

const loading = () => <div className="text-center"></div>;

interface HorizontalLayoutProps {
  children?: any;
}

const HorizontalLayout = ({ children }: HorizontalLayoutProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  /**
   * Open the menu when having mobile screen
   */
  const openMenu = () => {
    setIsMenuOpened(!isMenuOpened);
    if (document.body) {
      if (isMenuOpened) {
        document.getElementsByTagName("html")[0].classList.add("sidebar-enable");
      } else {
        document.getElementsByTagName("html")[0].classList.remove("`sidebar-enable`");
      }
    }
  };

  return (
    <>
      <div id="wrapper">
        <Suspense fallback={loading()}>
          <Topbar openLeftMenuCallBack={openMenu} topbarDark={false} />
        </Suspense>

        <Suspense fallback={loading()}>
          <Navbar isMenuOpened={isMenuOpened} />
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

          {/* {isOpenRightSideBar && ( */}
          <Suspense fallback={loading()}>
            <RightSidebar />
          </Suspense>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default HorizontalLayout;

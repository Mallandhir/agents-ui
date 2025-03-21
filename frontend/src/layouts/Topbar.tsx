import classNames from "classnames";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// components
import AppsDropdown from "../components/AppsDropdown/";
import MaximizeScreen from "../components/MaximizeScreen";
import ProfileDropdown from "../components/ProfileDropdown";

// images
import { useThemeContext } from "@/context";
import logoDark from "../assets/images/logo-dark.png";
import logoLight from "../assets/images/logo-light.png";
import logoSm from "../assets/images/logo-sm.png";
// import {changeLayoutTheme} from "../";

export interface NotificationItem {
  id: number;
  text: string;
  subText: string;
  icon?: string;
  avatar?: string;
  bgColor?: string;
}

// get the notifications
const Notifications: NotificationItem[] = [
  {
    id: 1,
    text: "Cristina Pride",
    subText: "Hi, How are you? What about our next meeting",
    avatar: ""
  },
  {
    id: 2,
    text: "Caleb Flakelar commented on Admin",
    subText: "1 min ago",
    icon: "uil uil-comment-message",
    bgColor: "primary"
  },
  {
    id: 3,
    text: "Karen Robinson",
    subText: "Wow ! this admin looks good and awesome design",
    avatar: ""
  },
  {
    id: 4,
    text: "New user registered.",
    subText: "5 hours ago",
    icon: "uil uil-user-plus",
    bgColor: "warning"
  },
  {
    id: 5,
    text: "Caleb Flakelar commented on Admin",
    subText: "1 min ago",
    icon: "uil uil-comment-message",
    bgColor: "info"
  },
  {
    id: 6,
    text: "Carlos Crouch liked Admin",
    subText: "13 days ago",
    icon: "uil uil-heart",
    bgColor: "secondary"
  }
];

// get the profilemenu
const ProfileMenus = [
  {
    label: "My Account",
    icon: "user",
    redirectTo: "/"
  },
  {
    label: "Lock Screen",
    icon: "lock",
    redirectTo: "/auth/lock-screen"
  },
  {
    label: "Logout",
    icon: "log-out",
    redirectTo: "/auth/logout"
  }
];

interface TopbarProps {
  hideLogo?: boolean;
  navCssClasses?: string;
  openLeftMenuCallBack?: () => void;
  topbarDark?: boolean;
}

const Topbar = ({ hideLogo, navCssClasses, openLeftMenuCallBack }: TopbarProps) => {
  const [isopen, setIsopen] = useState<boolean>(false);

  const {
    updateTheme,
    settings: { theme, showRightsideBar, sidenav, layoutType },
    updateShowRightsideBar,
    updateSidenav: { mode }
  } = useThemeContext();

  const navbarCssClasses: string = navCssClasses || "";
  const containerCssClasses: string = !hideLogo ? "container-fluid" : "";

  /**
   * Toggle the leftmenu when having mobile screen
   */
  const handleLeftMenuCallBack = () => {
    setIsopen((prev) => !prev);
    if (openLeftMenuCallBack) openLeftMenuCallBack();
  };

  /**
   * Toggles the left sidebar width
   */
  const toggleLeftSidebarWidth = () => {
    if (sidenav.mode === "default" || sidenav.mode === "compact") mode("condensed");
    if (sidenav.mode === "condensed") mode("default");
  };

  const toggleTheme = () => {
    if (theme === "dark") updateTheme("light");
    if (theme === "light") updateTheme("dark");
  };

  // const [hasOpenedOnce, setHasOpenedOnce] = useState(open)

  // const toggleThemeCustomizerOffcanvas = () => {
  //   if (!hasOpenedOnce) setHasOpenedOnce(true)
  //   toggle()
  // }

  const toggleRightSidebar = () => {
    updateShowRightsideBar(!showRightsideBar);
  };

  return (
    <React.Fragment>
      <div className={`navbar-custom ${navbarCssClasses}`}>
        <div className={containerCssClasses}>
          {!hideLogo && (
            <div className="logo-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="24" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="24" />
                </span>
              </Link>
              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="24" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="" height="24" />
                </span>
              </Link>
            </div>
          )}

          <ul className="list-unstyled topnav-menu float-end mb-0">
            <li className="d-none d-lg-block">
              <form className="app-search">
                <div className="app-search-box dropdown">
                  <div className="input-group">
                    <input type="search" className="form-control" placeholder="Search..." id="top-search" />
                    <button className="btn input-group-text" type="submit">
                      <i className="uil uil-search" />
                    </button>
                  </div>
                </div>
              </form>
            </li>

            <li className="d-none d-lg-inline-block">
              <a className="nav-link" id="light-dark-mode" href="#" onClick={toggleTheme}>
                {theme === "light" ? <i className="bi bi-sun light-mode" /> : <i className="bi bi-moon dark-mode" />}
              </a>
            </li>

            <li className="dropdown d-none d-lg-inline-block">
              <MaximizeScreen />
            </li>
            <li className="dropdown d-none d-lg-inline-block topbar-dropdown">
              <AppsDropdown />
            </li>
            <li className="dropdown notification-list topbar-dropdown">
              <ProfileDropdown profilePic={""} menuItems={ProfileMenus} username={"User Name"} />
            </li>
            <li className="dropdown notification-list">
              <button
                className="nav-link right-bar-toggle arrow-none btn btn-link shadow-none"
                onClick={toggleRightSidebar}
              >
                <i className="bi bi-gear-fill"></i>
              </button>
            </li>
          </ul>

          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            {layoutType !== "horizontal" && (
              <li>
                <button className="button-menu-mobile d-none d-lg-block" onClick={toggleLeftSidebarWidth}>
                  <i className="bi bi-list"></i>
                </button>
              </li>
            )}

            <li>
              <button className="button-menu-mobile d-lg-none d-bolck" onClick={handleLeftMenuCallBack}>
                <i className="bi bi-list"></i>
              </button>
            </li>

            {/* Mobile menu toggle (Horizontal Layout) */}
            <li>
              <Link
                to="#"
                className={classNames("navbar-toggle nav-link", {
                  open: isopen
                })}
                onClick={handleLeftMenuCallBack}
              >
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Link>
            </li>

            {/* <li className="dropdown d-none d-xl-block">
              <CreateNew otherOptions={otherOptions} />
            </li> */}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Topbar;

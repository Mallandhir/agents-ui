import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import { getMenuItems } from "../helpers/menu";

// components
import Scrollbar from "../components/Scrollbar";

import AppMenu from "./Menu";

/* user box */
const UserBox = () => {
  // get the profilemenu
  const ProfileMenus = [
    {
      label: "My Account",
      icon: "bi bi-person-circle",
      redirectTo: "/pages/profile"
    },
    {
      label: "Settings",
      icon: "bi bi-gear-fill",
      redirectTo: "/"
    },
    {
      label: "Support",
      icon: "bi bi-question-circle",
      redirectTo: "/"
    },
    {
      label: "Lock Screen",
      icon: "bi bi-lock",
      redirectTo: "/auth/lock-screen"
    },
    {
      label: "Logout",
      icon: "bi bi-box-arrow-right",
      redirectTo: "/auth/logout"
    }
  ];

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  /*
   * toggle dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="user-box text-center">
      <img src={""} alt="" title="Mat Helme" className="rounded-circle avatar-md" />
      <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
        <Dropdown.Toggle
          id="dropdown-notification"
          as="a"
          onClick={toggleDropdown}
          className="cursor-pointer text-dark h5 mt-2 mb-1 d-block"
        >
          User Name
        </Dropdown.Toggle>
        <Dropdown.Menu className="user-pro-dropdown m-0">
          {(ProfileMenus || []).map((item, index) => {
            return (
              <React.Fragment key={index + "-profile-menu"}>
                {index === ProfileMenus.length - 1 && <div className="dropdown-divider"></div>}
                <Link to={item.redirectTo} className="dropdown-item notify-item">
                  <i className={item.icon + " icon-xs me-1"} />
                  <span>{item.label}</span>
                </Link>
              </React.Fragment>
            );
          })}
          {/* </div> */}
        </Dropdown.Menu>
      </Dropdown>
      <p className="text-muted">Role</p>
    </div>
  );
};

/* sidebar content */
const SideBarContent = () => {
  return (
    <>
      <UserBox />

      <div id="sidebar-menu">
        <AppMenu menuItems={getMenuItems()} />
      </div>

      <div className="clearfix" />
    </>
  );
};

const LeftSidebar = () => {
  const menuNodeRef: any = useRef(null);

  /**
   * Handle the click anywhere in doc
   */
  const handleOtherClick = (e: any) => {
    if (menuNodeRef && menuNodeRef.current && menuNodeRef.current.contains(e.target)) return;
    // else hide the menubar
    if (document.body) {
      document.getElementsByTagName("html")[0].classList.remove("sidebar-enable");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOtherClick, false);
    return () => {
      document.removeEventListener("mousedown", handleOtherClick, false);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="left-side-menu" ref={menuNodeRef}>
        {/* {!isCondensed && ( */}
        <Scrollbar style={{ maxHeight: "100%" }} timeout={500} scrollbarMaxSize={320}>
          <SideBarContent />
        </Scrollbar>
        {/* )} */}
        {/* {isCondensed && <SideBarContent />} */}
      </div>
    </React.Fragment>
  );
};

LeftSidebar.defaultProps = {
  isCondensed: false
};

export default LeftSidebar;

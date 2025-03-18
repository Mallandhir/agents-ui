import React, { useCallback, useEffect, useState } from "react";

// constants

// custom hook
import { useViewport } from "../../hooks/useViewPort";

// components
import { useThemeContext } from "@/context";
import { OffcanvasBody, OffcanvasHeader } from "react-bootstrap";
import Scrollbar from "../Scrollbar";
import LayoutTheme from "./LayoutTheme";
import LayoutTypes from "./LayoutTypes";
import LayoutWidth from "./LayoutWidth";
import LeftSideBarTheme from "./LeftSideBarTheme";
import LeftSideBarType from "./LeftSideBarType";
import MenuPositions from "./MenuPositions";
import SidebarUserInfo from "./SidebarUserInfo";
import TopbarTheme from "./TopbarTheme";

const ThemeCustomizer = () => {
  const { width } = useViewport();

  const {
    settings: { layoutType }
  } = useThemeContext();

  const [disableMenuPositions, setDisableMenuPositions] = useState<boolean>(false);
  const [disableSidebarTheme, setDisableSidebarTheme] = useState<boolean>(false);
  const [disableSidebarType, setDisableSidebarType] = useState<boolean>(false);
  const [disableSidebarUser, setDisableSidebarUser] = useState<boolean>(false);

  /**
   * change state based on props changes
   */
  const _loadStateFromProps = useCallback(() => {
    setDisableMenuPositions(layoutType !== "two-column");
    setDisableSidebarTheme(layoutType !== "horizontal");
    setDisableSidebarType(layoutType !== "horizontal" && layoutType !== "two-column" && width > 991);
    setDisableSidebarUser(layoutType !== "horizontal" && layoutType !== "two-column");
  }, [layoutType, width]);

  useEffect(() => {
    _loadStateFromProps();
  }, [_loadStateFromProps]);

  /**
   * Reset everything
   */

  const { resetSettings } = useThemeContext();

  return (
    <React.Fragment>
      <OffcanvasHeader closeButton className="px-3 m-0 py-2 text-uppercase bg-light">
        <h6 className="fw-medium d-block mb-0">Theme Settings</h6>
      </OffcanvasHeader>

      <OffcanvasBody className="m-0 p-0">
        <Scrollbar style={{ height: "calc(100% - 10px)", zIndex: 10000 }} timeout={500} scrollbarMaxSize={320}>
          <div className="p-3">
            <div className="alert alert-warning" role="alert">
              <strong>Customize </strong> the overall color scheme, sidebar menu, etc.
            </div>

            <LayoutTheme />

            {/* Layouts */}
            <LayoutTypes />

            {/* Width */}
            <LayoutWidth />

            {/* Menu Posiotions */}
            {disableMenuPositions && <MenuPositions />}

            {/* Left Sidebar */}
            {disableSidebarTheme && <LeftSideBarTheme />}

            {/* Left Sidebar Size */}
            {disableSidebarType && <LeftSideBarType />}

            {/* User Info */}
            {disableSidebarUser && <SidebarUserInfo />}

            {/* Topbar */}
            <TopbarTheme />
          </div>
        </Scrollbar>
      </OffcanvasBody>
      <div className="d-flex flex-column gap-2 px-3 py-2 offcanvas-footer border-top border-dashed">
        <button className="btn btn-primary w-100 d-none d-lg-block" onClick={() => resetSettings()} id="resetBtn">
          Reset to Default
        </button>
        <a href="https://1.envato.market/shreyu_admin" className="btn btn-danger w-100" target="_blank">
          <i className="mdi mdi-basket me-1" /> Purchase Now
        </a>
      </div>
    </React.Fragment>
  );
};

export default ThemeCustomizer;

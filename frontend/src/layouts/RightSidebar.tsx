import React from "react";

// components
import { useThemeContext } from "@/context";
import { Offcanvas } from "react-bootstrap";
import ThemeCustomizer from "../components/ThemeCustomizer/";

const RightSideBar = () => {
  // const rightBarNodeRef: any = useRef(null);

  const {
    settings: { showRightsideBar },
    updateShowRightsideBar
  } = useThemeContext();

  console.log(showRightsideBar);
  /**
   * Handle the click anywhere in doc
   */
  // const handleOtherClick = useCallback(
  //   (e: any) => {
  //     if (isOpenRightSideBar) {
  //       if (
  //         rightBarNodeRef &&
  //         rightBarNodeRef.current &&
  //         rightBarNodeRef.current.contains(e.target)
  //       ) {
  //         return;
  //       } else {
  //         dispatch(hideRightSidebar());
  //       }
  //     }
  //   },
  //   [rightBarNodeRef, dispatch, isOpenRightSideBar]
  // );

  return (
    <React.Fragment>
      <Offcanvas
        show={showRightsideBar}
        onHide={updateShowRightsideBar}
        placement="end"
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="theme-settings-offcanvas"
        style={{ width: 260, zIndex: 10000 }}
      >
        <ThemeCustomizer />
      </Offcanvas>
    </React.Fragment>
  );
};

export default RightSideBar;

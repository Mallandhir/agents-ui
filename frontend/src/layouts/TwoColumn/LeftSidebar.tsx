import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//constants

// helpers
import { findAllParent, findMenuItem, getTwoColumnMenuItems } from "../../helpers/menu";

// components
import { useThemeContext } from "@/context";
import IconMenu from "./IconMenu";
import MainMenu from "./MainMenu";

interface Item {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: string;
  url?: string;
  badge?: {
    variant: string;
    text: string;
  };
  parentKey?: string;
  target?: string;
  children?: Item[];
}

const LeftSidebar = () => {
  const location = useLocation();

  const menuItems = getTwoColumnMenuItems();

  const [activeMenuItems, setActiveMenuItems] = useState<Array<string>>([]);

  /*
   * toggle the menus
   */
  const toggleMenu = (menuItem: Item, show: boolean) => {
    if (menuItem.children) {
      if (sidenav.mode === "condensed") mode("default");
    }

    if (show) setActiveMenuItems([menuItem["key"], ...findAllParent(menuItems, menuItem)]);
  };

  /**
   * activate the menuitems
   */

  const activeMenu = useCallback(() => {
    const div = document.getElementById("sidebar-content");
    let matchingMenuItem = null;

    if (div) {
      let items: any = div.getElementsByClassName("nav-link-ref");
      for (let i = 0; i < items.length; ++i) {
        let trimmedURL = location?.pathname?.replaceAll("", "");
        if (trimmedURL === items[i]?.pathname?.replaceAll("", "")) {
          matchingMenuItem = items[i];
          break;
        }
      }

      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute("data-menu-key");
        const activeMt = findMenuItem(menuItems, mid);
        if (activeMt) {
          setActiveMenuItems([activeMt["key"], ...findAllParent(menuItems, activeMt)]);
        }
      }
    }
  }, [location, menuItems]);

  const {
    settings: { sidenav },
    updateSidenav: { mode }
  } = useThemeContext();

  useEffect(() => {
    activeMenu();
  }, [activeMenu]);

  useEffect(() => {
    if (activeMenuItems && activeMenuItems.length && activeMenuItems.length === 1) {
      const parentLevel0 = findMenuItem(menuItems, activeMenuItems[0]);
      const hasChildren = parentLevel0 && parentLevel0["children"] && parentLevel0["children"].length;

      if (!hasChildren && (sidenav.mode === "default" || sidenav.mode === "compact")) {
        mode("condensed");
      } else {
        mode(sidenav.mode);
      }
    }
  }, [activeMenuItems, menuItems]);

  return (
    <>
      <div className="left-side-menu">
        <div className="h-100">
          <div className="sidebar-content" id="sidebar-content">
            <IconMenu menuItems={getTwoColumnMenuItems()} toggleMenu={toggleMenu} activeMenuItems={activeMenuItems} />

            <MainMenu menuItems={menuItems} activeMenuItems={activeMenuItems} toggleMenu={toggleMenu} />
          </div>

          <div className="clearfix" />
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;

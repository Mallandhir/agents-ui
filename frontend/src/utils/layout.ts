// app constants
import { ElementType } from "react";
import { LayoutWidth, SideBarTypes } from "../constants";

interface ConfigTypes {
  leftSideBarType:
    | SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT
    | SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED
    | SideBarTypes.LEFT_SIDEBAR_TYPE_COMPACT
    | SideBarTypes.LEFT_SIDEBAR_TYPE_MOBILE;
}

const getLayoutConfigs = (layoutWidth: string | boolean | null) => {
  // add property to change in particular layoutWidth
  const config: ConfigTypes = {
    leftSideBarType: SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT
  };

  switch (layoutWidth) {
    case LayoutWidth.LAYOUT_WIDTH_FLUID:
      config.leftSideBarType = SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT;
      break;
    case LayoutWidth.LAYOUT_WIDTH_BOXED:
      config.leftSideBarType = SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED;
      break;
    default:
      return config;
  }
  return config;
};

/**
 * Changes the body attribute
 */
// const changeBodyAttribute = (attribute: string, value: string): void => {
//   if (document.body) document.body.setAttribute(attribute, value);

// };

type ToggleDocumentAttributeType = (attribute: string, value: string, remove?: boolean, tag?: ElementType) => void;

const toggleDocumentAttribute: ToggleDocumentAttributeType = (attribute, value, remove, tag = "html"): void => {
  if (document.body) {
    const element = document.getElementsByTagName(tag.toString())[0];
    const hasAttribute = element.getAttribute(attribute);
    if (remove && hasAttribute) element.removeAttribute(attribute);
    else element.setAttribute(attribute, value);
  }
};

export { getLayoutConfigs, toggleDocumentAttribute };

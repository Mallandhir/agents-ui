type LayoutTheme = "light" | "dark";

type LayoutDir = "ltr" | "rtl";

type LayoutTopbarTheme = "light" | "dark";

type LayoutMode = "fluid" | "boxed";
type LayoutTypes = "vertical" | "horizontal" | "two-column";

type LayoutSidenav = {
  theme: LayoutTheme;
  position: "scrollable" | "fixed";
  mode: "default" | "condensed" | "compact" | "mobile";
};

export type OffcanvasControlType = {
  open: boolean;
  toggle: () => void;
};

type LayoutState = {
  layoutType: LayoutTypes;
  theme: LayoutTheme;
  dir: LayoutDir;
  mode: LayoutMode;
  sidenav: LayoutSidenav;
  topbarTheme: LayoutTopbarTheme;
  showRightsideBar: boolean;
};

export type LayoutOffcanvasStatesType = {
  showThemeCustomizer: boolean;
  showBackdrop: boolean;
};

type LayoutType = {
  settings: LayoutState;
  updateLayoutType: (newType: LayoutTypes) => void;
  updateTheme: (newTheme: LayoutTheme) => void;
  updateMode: (newMode: LayoutMode) => void;
  updateDir: (newDir: LayoutDir) => void;
  updateSidenav: {
    theme: (theme: LayoutSidenav["theme"]) => void;
    position: (position: LayoutSidenav["position"]) => void;
    mode: (mode: LayoutSidenav["mode"]) => void;
  };
  themeCustomizer: OffcanvasControlType;
  updateTopbar: (newTopbar: Partial<LayoutTopbarTheme>) => void;
  updateShowRightsideBar: (show: LayoutState["showRightsideBar"]) => void;
  resetSettings: () => void;
};

export type {
  LayoutDir,
  LayoutMode,
  LayoutSidenav,
  LayoutState,
  LayoutTheme,
  LayoutTopbarTheme,
  LayoutType,
  LayoutTypes
};

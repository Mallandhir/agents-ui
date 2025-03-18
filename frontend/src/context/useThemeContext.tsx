import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  LayoutDir,
  LayoutMode,
  LayoutOffcanvasStatesType,
  LayoutSidenav,
  LayoutState,
  LayoutTheme,
  LayoutTopbarTheme,
  LayoutType,
  LayoutTypes,
  OffcanvasControlType
} from "@/types";
import useLocalStorage from "@/hooks/useLocalStorage";
import { toggleDocumentAttribute } from "@/utils";

const ThemeContext = createContext<LayoutType | undefined>(undefined);

function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within an ThemeProvider");
  }
  return context;
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const INIT_STATE: LayoutState = {
    theme: "light",
    dir: "ltr",
    layoutType: "vertical",
    mode: "fluid",
    sidenav: {
      mode: "default",
      position: "fixed",
      theme: "light"
    },
    topbarTheme: "light",
    showRightsideBar: false
  };

  const [offcanvasStates, setOffcanvasStates] = useState<LayoutOffcanvasStatesType>({
    showThemeCustomizer: false,
    showBackdrop: false
  });

  const [settings, setSettings] = useLocalStorage<LayoutState>("__SHREYU_REACT_CONFIG__", INIT_STATE);
  // const [settings, setSettings] = useState<LayoutState>(INIT_STATE)

  // update settings
  const updateSettings = (_newSettings: Partial<LayoutType["settings"]>) => {
    setSettings({ ...settings, ..._newSettings });
  };

  const updateTheme = (newTheme: LayoutTheme) => {
    updateSettings({ ...settings, theme: newTheme });
  };

  const updateDir = (newDir: LayoutDir) => updateSettings({ ...settings, dir: newDir });

  const updateLayoutType = (newType: LayoutTypes) => updateSettings({ ...settings, layoutType: newType });

  const updateMode = (newMode: LayoutMode) => updateSettings({ ...settings, mode: newMode });

  const updateSidenavMode = (newSidenavMode: LayoutSidenav["mode"]) =>
    updateSettings({ sidenav: { ...settings.sidenav, mode: newSidenavMode } });

  const updateSidenavPosition = (newSidenavPosition: LayoutSidenav["position"]) =>
    updateSettings({
      sidenav: { ...settings.sidenav, position: newSidenavPosition }
    });

  const updateSidenavTheme = (newSidenavTheme: LayoutSidenav["theme"]) =>
    updateSettings({
      sidenav: { ...settings.sidenav, theme: newSidenavTheme }
    });

  const updateTopbar = (newTopbar: LayoutTopbarTheme) => updateSettings({ ...settings, topbarTheme: newTopbar });

  const updateShowRightsideBar = (show: LayoutState["showRightsideBar"]) =>
    setSettings({ ...settings, showRightsideBar: show });

  const resetSettings = () => {
    setSettings(INIT_STATE);
  };

  // toggle theme customizer offcanvas
  const toggleThemeCustomizer: OffcanvasControlType["toggle"] = () => {
    setOffcanvasStates({
      ...offcanvasStates,
      showThemeCustomizer: !offcanvasStates.showThemeCustomizer
    });
  };

  const themeCustomizer: LayoutType["themeCustomizer"] = {
    open: offcanvasStates.showThemeCustomizer,
    toggle: toggleThemeCustomizer
  };

  useEffect(() => {
    toggleDocumentAttribute("data-bs-theme", settings.theme);
    toggleDocumentAttribute("data-layout-mode", settings.layoutType);
    toggleDocumentAttribute("data-layout-width", settings.mode);
    toggleDocumentAttribute("data-layout-position", settings.sidenav.position);
    toggleDocumentAttribute("data-menu-color", settings.sidenav.theme);
    toggleDocumentAttribute("data-topbar-color", settings.topbarTheme);
    toggleDocumentAttribute("data-sidebar-size", settings.sidenav.mode);

    return () => {
      toggleDocumentAttribute("data-bs-theme", settings.theme, true);
      toggleDocumentAttribute("data-layout-mode", settings.layoutType, true);
      toggleDocumentAttribute("data-layout-width", settings.mode, true);
      toggleDocumentAttribute("data-layout-position", settings.sidenav.position, true);
      toggleDocumentAttribute("data-menu-color", settings.sidenav.theme, true);
      toggleDocumentAttribute("data-topbar-color", settings.topbarTheme);
      toggleDocumentAttribute("data-sidebar-size", settings.sidenav.mode, true);
    };
  }, [settings]);

  return (
    <ThemeContext.Provider
      value={useMemo(
        () => ({
          settings,
          updateTheme,
          updateDir,
          updateMode,
          updateLayoutType,
          updateTopbar,
          themeCustomizer,
          updateSidenav: {
            mode: updateSidenavMode,
            position: updateSidenavPosition,
            theme: updateSidenavTheme
          },
          updateShowRightsideBar,
          resetSettings
        }),
        [settings]
      )}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export { useThemeContext, ThemeProvider };

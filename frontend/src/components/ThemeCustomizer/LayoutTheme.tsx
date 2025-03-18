import { useThemeContext } from "@/context";

const LayoutTheme = () => {
  const {
    settings: { theme },
    updateTheme
  } = useThemeContext();
  return (
    <div>
      <h6 className="fw-medium mt-4 mb-2 pb-1">Color Scheme</h6>
      <div className="form-switch d-flex align-items-center gap-1 mb-1">
        <input
          onChange={() => updateTheme("light")}
          checked={theme === "light"}
          type="radio"
          className="form-check-input mt-0"
          name="color-scheme-mode"
          id="light-mode-check"
        />
        <label className="form-check-label" htmlFor="light-mode-check">
          Light Mode
        </label>
      </div>
      <div className="form-switch d-flex align-items-center gap-1 mb-1">
        <input
          onChange={() => updateTheme("dark")}
          checked={theme === "dark"}
          type="radio"
          className="form-check-input mt-0"
          name="color-scheme-mode"
          id="dark-mode-check"
        />
        <label className="form-check-label" htmlFor="dark-mode-check">
          Dark Mode
        </label>
      </div>
    </div>
  );
};

export default LayoutTheme;

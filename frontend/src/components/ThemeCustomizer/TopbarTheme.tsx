import { useThemeContext } from "@/context";
import { Form } from "react-bootstrap";

const TopbarTheme = () => {
  const {
    settings: { topbarTheme },
    updateTopbar
  } = useThemeContext();
  return (
    <>
      <h6 className="fw-medium mt-4 mb-2 pb-1">Topbar</h6>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          name="topbar-color"
          id="darktopbar-check"
          onChange={() => updateTopbar("dark")}
          checked={topbarTheme === "dark"}
        />
        <Form.Check.Label htmlFor="darktopbar-check">Dark</Form.Check.Label>
      </Form.Check>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          name="topbar-color"
          id="lighttopbar-check"
          onChange={() => updateTopbar("light")}
          checked={topbarTheme === "light"}
        />
        <Form.Check.Label htmlFor="lighttopbar-check">Light</Form.Check.Label>
      </Form.Check>
    </>
  );
};

export default TopbarTheme;

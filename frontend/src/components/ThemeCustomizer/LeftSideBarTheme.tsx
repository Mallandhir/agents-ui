import { useThemeContext } from "@/context";
import { Form } from "react-bootstrap";

const LeftSideBarTheme = () => {
  const {
    settings: { sidenav },
    updateSidenav: { theme }
  } = useThemeContext();
  return (
    <>
      <h6 className="fw-medium mt-4 mb-2 pb-1">Left Sidebar Color</h6>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          name="theme"
          id="light-check"
          onChange={() => theme("light")}
          checked={sidenav.theme === "light"}
        />
        <Form.Check.Label htmlFor="light-check">Light</Form.Check.Label>
      </Form.Check>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          name="theme"
          id="dark-check"
          onChange={() => theme("dark")}
          checked={sidenav.theme === "dark"}
        />
        <Form.Check.Label htmlFor="dark-check">Dark</Form.Check.Label>
      </Form.Check>
    </>
  );
};

export default LeftSideBarTheme;

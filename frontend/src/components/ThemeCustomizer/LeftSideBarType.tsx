import { useThemeContext } from "@/context";
import { Form } from "react-bootstrap";

const LeftSideBarType = () => {
  const {
    settings: { sidenav },
    updateSidenav: { mode }
  } = useThemeContext();
  return (
    <>
      <h6 className="fw-medium mt-4 mb-2 pb-1">Left Sidebar Size</h6>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          name="leftsidebar-size"
          id="default-check"
          onChange={() => mode("default")}
          checked={sidenav.mode === "default"}
        />
        <Form.Check.Label htmlFor="default-check">Default</Form.Check.Label>
      </Form.Check>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          name="leftsidebar-size"
          id="condensed-check"
          onChange={() => mode("condensed")}
          checked={sidenav.mode === "condensed"}
        />
        <Form.Check.Label htmlFor="condensed-check">
          Condensed <small>(Extra Small size)</small>
        </Form.Check.Label>
      </Form.Check>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          name="leftsidebar-size"
          id="compact-check"
          onChange={() => mode("compact")}
          checked={sidenav.mode === "compact"}
        />
        <Form.Check.Label htmlFor="compact-check">
          Compact <small>(Small size)</small>
        </Form.Check.Label>
      </Form.Check>
    </>
  );
};

export default LeftSideBarType;

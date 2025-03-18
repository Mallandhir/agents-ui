import { useThemeContext } from "@/context";
import { Form } from "react-bootstrap";

const MenuPositions = () => {
  const {
    settings: { sidenav },
    updateSidenav: { position }
  } = useThemeContext();
  return (
    <>
      <h6 className="fw-medium mt-4 mb-2 pb-1">Menus (Leftsidebar and Topbar) Position</h6>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          name="menus-position"
          id="fixed-check"
          onChange={() => position("fixed")}
          checked={sidenav.position === "fixed"}
        />
        <Form.Check.Label htmlFor="fixed-check">Fixed</Form.Check.Label>
      </Form.Check>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          name="menus-position"
          id="scrollable-check"
          onChange={() => position("scrollable")}
          checked={sidenav.position === "scrollable"}
        />
        <Form.Check.Label htmlFor="scrollable-check">Scrollable</Form.Check.Label>
      </Form.Check>
    </>
  );
};

export default MenuPositions;

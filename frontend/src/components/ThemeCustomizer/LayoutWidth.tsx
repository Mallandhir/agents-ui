import { useThemeContext } from "@/context";
import { Form } from "react-bootstrap";

const LayoutWidth = () => {
  const {
    settings: { mode },
    updateMode
  } = useThemeContext();
  return (
    <>
      <h6 className="fw-medium mt-4 mb-2 pb-1">Width</h6>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          name="width"
          id="fluid-check"
          onChange={() => updateMode("fluid")}
          checked={mode === "fluid"}
        />
        <Form.Check.Label htmlFor="fluid-check">Fluid</Form.Check.Label>
      </Form.Check>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          name="width"
          id="boxed-check"
          onChange={() => updateMode("boxed")}
          checked={mode === "boxed"}
        />
        <Form.Check.Label htmlFor="boxed-check">Boxed</Form.Check.Label>
      </Form.Check>
    </>
  );
};

export default LayoutWidth;

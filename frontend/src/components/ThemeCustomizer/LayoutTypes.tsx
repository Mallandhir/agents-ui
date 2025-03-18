import { useThemeContext } from "@/context";
import { Form } from "react-bootstrap";

const LayoutTypes = () => {
  const {
    settings: { layoutType },
    updateLayoutType
  } = useThemeContext();

  return (
    <>
      <h6 className="fw-medium mt-4 mb-2 pb-1">Layout</h6>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          onChange={() => updateLayoutType("vertical")}
          name="layout-type"
          id="vertical-layout"
          checked={layoutType === "vertical"}
        />
        <Form.Check.Label htmlFor="vertical-layout">Vertical Layout</Form.Check.Label>
      </Form.Check>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          onChange={() => updateLayoutType("horizontal")}
          name="layout-type"
          id="horizontal-layout"
          checked={layoutType === "horizontal"}
        />
        <Form.Check.Label htmlFor="horizontal-layout">Horizontal Layout</Form.Check.Label>
      </Form.Check>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="radio"
          onChange={(e) => updateLayoutType("two-column")}
          name="layout-type"
          id="two-column-layout"
          checked={layoutType === "two-column"}
        />
        <Form.Check.Label htmlFor="two-column-layout">Two Column Layout</Form.Check.Label>
      </Form.Check>
    </>
  );
};

export default LayoutTypes;

import { toggleDocumentAttribute } from "@/utils";
import { useState } from "react";
import { Form } from "react-bootstrap";

const SidebarUserInfo = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleUserInfo = () => {
    const toggleUser = () => {
      setOpen(!open);
    };
    toggleUser();

    if (isOpen) {
      toggleDocumentAttribute("data-sidebar-user", "true");
    } else {
      toggleDocumentAttribute("data-sidebar-user", "true", true);
    }
  };

  return (
    <>
      <h6 className="fw-medium mt-4 mb-2 pb-1">Sidebar User Info</h6>

      <Form.Check className="form-check form-switch mb-1">
        <Form.Check.Input
          type="checkbox"
          name="leftsidebar-user"
          id="sidebaruser-check"
          onChange={() => toggleUserInfo()}
        />
        <Form.Check.Label htmlFor="sidebaruser-check">Enable</Form.Check.Label>
      </Form.Check>
    </>
  );
};

export default SidebarUserInfo;

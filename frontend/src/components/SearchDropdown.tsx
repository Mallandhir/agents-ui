import classNames from "classnames";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

const SearchDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  /*
   * toggle search-dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        id="dropdown-apps"
        as="a"
        onClick={toggleDropdown}
        className={classNames("nav-link", "cursor-pointer", {
          show: dropdownOpen
        })}
      >
        <i className="bi bi-search"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-animated dropdown-lg p-0">
        <form className="p-3">
          <input type="text" className="form-control" placeholder="Search ..." />
        </form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchDropdown;

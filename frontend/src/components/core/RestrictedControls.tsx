import { ReactNode, useRef, useState } from "react";

import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";

const ROLES: { [key: string]: IUserRole } = {
  SuperAdmin: "SuperAdmin",
  Manager: "Manager",
  SalesRep: "SalesRep",
  Developer: "Developer",
  BetaSuperAdmin: "BetaSuperAdmin"
};

type IUserRole = "SuperAdmin" | "Manager" | "SalesRep" | "Developer" | "BetaSuperAdmin";

const RestrictedControls = ({ children }: { children: ReactNode }) => children;

type Props = {
  children: ReactNode;
  disable?: boolean;
  feedback?: string;
  showDefaultFeedback?: boolean;
};
// higher order component which decides if the children should be rendered or not based on role
const withRoleAuthorization = (allowedRoles: IUserRole[]) => {
  return observer(({ children, disable, feedback, showDefaultFeedback }: Props) => {
    const targetRef = useRef(null);
    const [show, setShow] = useState(false);
    const store = useStore();

    const loggedInUser = store.user.data?.response?.loggedInUser;
    const isAllowed = loggedInUser?.roles.some((roleValue) => allowedRoles.includes(roleValue));

    return (
      <>
        {isAllowed ? (
          children
        ) : (
          <>
            {disable ? (
              <>
                <div
                  style={{ width: "fit-content" }}
                  ref={targetRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}
                >
                  <div className="disabled-grey">{children}</div>
                </div>
                {/* {(Boolean(feedback) || showDefaultFeedback) && (
                    <Overlay
                      target={targetRef.current}
                      show={show}
                      placement="top"
                    >
                      <Tooltip style={{ backgroundColor: "#b6b6b6" }}>
                        {feedback || "Not Authorized"}
                      </Tooltip>
                    </Overlay>
                  )} */}
              </>
            ) : null}
          </>
        )}
      </>
    );
  });
};

RestrictedControls.SuperAdmin = withRoleAuthorization([ROLES.SuperAdmin]);

RestrictedControls.Manager = withRoleAuthorization([ROLES.SuperAdmin, ROLES.Manager]);

RestrictedControls.Developer = withRoleAuthorization([
  // ROLES.SuperAdmin,
  ROLES.Developer
]);

RestrictedControls.BetaSuperAdmin = withRoleAuthorization([ROLES.BetaSuperAdmin]);

export default RestrictedControls;

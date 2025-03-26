import useStore from "@/hooks/useStore";
import AppResource from "@/lib/AppResource";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TopBar: React.FC = () => {
  const store = useStore();
  const navigate = useNavigate();

  const [logoutResource, setLogoutResource] = useState<AppResource<{ success: boolean }> | null>(null);

  const handleLogout = async () => {
    const logout = store.user.logout();
    setLogoutResource(logout);
    await logout;
    navigate("/login");
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-16">
        <div className="flex flex-row justify-end w-full h-16 p-4">
          <div onClick={handleLogout}>
            {logoutResource?.status === "pending" ? (
              <Loader2Icon size={14} className="cursor-pointer text-gray-500 animate-spin" />
            ) : (
              <LogOutIcon size={14} className="cursor-pointer text-gray-500" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(TopBar);

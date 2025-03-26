import { Input } from "@/components/agent-chat/ui/input";
import { Button } from "@/components/start-mission/ui/button";
import useStore from "@/hooks/useStore";
import AppResource from "@/lib/AppResource";
import { cn } from "@/lib/utils";
import Logger from "@/services/Logger";
import { ILoginApi } from "@/types/api/userApi.types";
import { Loader2Icon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const logger = new Logger("Login");

const Login: React.FC = () => {
  const store = useStore();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginResource, setLoginResource] = useState<AppResource<ILoginApi["response"]> | null>(null);

  const handleLogin = async () => {
    try {
      const resource = store.user.login({
        body: {
          username: username,
          password: password
        }
      });

      setLoginResource(resource);
      const response = await resource;
      if (response?.success) {
        navigate("/");
      } else {
        toast.error(response?.message || "Failed to login");
      }
    } catch (error) {
      toast.error("Failed to login");
      logger.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-2xl font-normal">Login</h1>

      <div
        className={cn(
          "flex flex-col gap-4 items-center justify-center",
          loginResource?.status === "pending" && "opacity-50 pointer-events-none"
        )}
      >
        <Input type="text" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
        <Button onClick={handleLogin} variant="default">
          {loginResource?.status === "pending" && <Loader2Icon size={14} className="animate-spin" />}
          Login
        </Button>
      </div>
    </div>
  );
};

export default observer(Login);

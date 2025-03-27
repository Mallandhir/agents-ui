import { motion } from "framer-motion";
import { Loader2Icon } from "lucide-react";

const AuthLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-32">
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        src="/logo-long.svg"
        alt="Logo"
        className="w-48 mb-2"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center gap-1 text-gray-500 text-sm font-light"
      >
        <Loader2Icon size={14} className="animate-spin" /> Loading
      </motion.div>
    </div>
  );
};

export default AuthLoading;

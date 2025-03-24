import { motion } from "framer-motion";

const Header: React.FC = () => {
  return (
    <header className="w-full text-center space-y-6">
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.8
        }}
        className="text-black text-3xl sm:text-[32px] tracking-[-0.31px] leading-[1.2]"
      >
        Welcome!
      </motion.h1>
      <div className="space-y-1">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.8,
            delay: 0.2
          }}
          className="text-[#8b8b8b] text-lg sm:text-[22px] tracking-[-0.15px] leading-[1.2]"
        >
          Let&apos;s Supercharge Your Productivity with
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.8,
            delay: 0.3
          }}
          className="text-black text-lg sm:text-[22px] tracking-[-0.15px] leading-[1.2]"
        >
          AI &amp; Human Agents!
        </motion.p>
      </div>
    </header>
  );
};

export default Header;

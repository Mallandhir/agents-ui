export const containerVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const sidebarVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 30,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      mass: 0.9
    }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 14,
      mass: 0.9,
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 30,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 0.8
    }
  }
};

export const chatSectionVariants = {
  initial: {
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 0.8
    }
  },

  exit: {
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 0.8
    }
  }
};

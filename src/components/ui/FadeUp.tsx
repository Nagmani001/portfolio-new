import React from 'react';
import { motion } from 'framer-motion';

export const fadeUpContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      ease: "easeOut"
    }
  }
};

export const fadeUpItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const FadeUpContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div variants={fadeUpContainerVariants} initial="hidden" animate="show" className={className}>
    {children}
  </motion.div>
);

export const FadeUpItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div variants={fadeUpItemVariants} className={className}>
    {children}
  </motion.div>
);

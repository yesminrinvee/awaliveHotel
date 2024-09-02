import { AnimatePresence, motion } from "framer-motion";


const PageAnimation = ({ children }) => {
 
  return (
    <>
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
    
    </>
  );
};

export default PageAnimation;

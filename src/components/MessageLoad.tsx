import { motion } from "framer-motion";

const loadingContainer = {
  animating: {
    transition: {
      staggerChildren: 0.5,
      duration: 1,
    },
  },
};

const dot = {
  animating: {
    scale: [1, 1.2, 1],
    transition: { duration: 2, repeat: Infinity },
  },
  initial: {
    scale: 1,
  },
};

export default function MessageLoad() {
  return (
    <motion.div
      variants={loadingContainer}
      initial="initial"
      animate="animating"
      className="bg-opacity-5 bg-black w-16 h-10 rounded-3xl flex justify-between px-2"
    >
      <motion.div
        variants={dot}
        className="bg-opacity-10 bg-black w-3 h-3 rounded-full self-center"
      />
      <motion.div
        variants={dot}
        className="bg-opacity-10 bg-black w-3 h-3 rounded-full place-self-center"
      />
      <motion.div
        variants={dot}
        className="bg-opacity-10 bg-black w-3 h-3 rounded-full place-self-center"
      />
    </motion.div>
  );
}

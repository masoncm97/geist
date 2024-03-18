import { ThemeContext, ThemeType } from "@/providers/ThemeProvider";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useContext } from "react";

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
  const theme = useContext(ThemeContext);
  const currentTheme = theme?.themeType;

  return (
    <motion.div
      variants={loadingContainer}
      initial="initial"
      animate="animating"
      className={classNames(
        currentTheme == ThemeType.Dark
          ? "bg-opacity-15 bg-white"
          : "bg-opacity-5 bg-black",
        "w-16 h-10 rounded-3xl flex justify-between px-2"
      )}
    >
      {[1, 2, 3].map((index) => (
        <motion.div
          key={index}
          variants={dot}
          className={classNames(
            currentTheme == ThemeType.Dark
              ? "bg-opacity-25 bg-white"
              : "bg-opacity-10 bg-black",
            "w-3 h-3 rounded-full self-center"
          )}
        />
      ))}
    </motion.div>
  );
}

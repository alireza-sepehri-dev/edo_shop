import { motion } from "framer-motion";
import "./loading.css";


/* loading animate dots */
export const LoadingDots = () => (
  <span className="inline-flex gap-0.5">
    <span className="dot animate-bounce delay-0">.</span>
    <span className="dot animate-bounce delay-200">.</span>
    <span className="dot animate-bounce delay-400">.</span>
  </span>
)

/* loading animate coffeemath */
export const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <motion.svg
        className="loader-graphic"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 200"
      >
        <defs>
          <linearGradient id="loader_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>

        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".35em"
          fontFamily="Vazir, sans-serif"
          fontSize="48"
          fill="url(#loader_gradient)"
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          CoffeeMath
        </motion.text>
      </motion.svg>
    </div>
  );
};
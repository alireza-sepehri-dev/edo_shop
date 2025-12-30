import "./loading.css";

export const LoadingDots = () => (
  <span className="inline-flex gap-0.5">
    <span className="dot animate-bounce delay-0">.</span>
    <span className="dot animate-bounce delay-200">.</span>
    <span className="dot animate-bounce delay-400">.</span>
  </span>
)
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create floating elements dynamically
    const container = containerRef.current;
    if (!container) return;

    const elements = [];
    for (let i = 0; i < 15; i++) {
      const element = document.createElement("div");
      element.className = "absolute border border-white/10 bg-white/5 rounded-sm";
      element.style.width = `${Math.random() * 40 + 20}px`;
      element.style.height = `${Math.random() * 40 + 20}px`;
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      element.style.animation = `float ${Math.random() * 4 + 4}s ease-in-out infinite`;
      element.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(element);
      elements.push(element);
    }

    return () => {
      elements.forEach(el => el.remove());
    };
  }, []);

  const lines = Array.from({ length: 5 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
      style={{
        top: `${20 + i * 15}%`,
      }}
      animate={{
        opacity: [0.1, 0.3, 0.1],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: i * 0.5,
      }}
    />
  ));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      {lines}
    </div>
  );
};

export default ThreeBackground;

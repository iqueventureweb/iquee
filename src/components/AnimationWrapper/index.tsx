"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimationWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export function AnimationWrapper({
  children,
  className = "",
  // delay = 0,
  // duration = 0.6,
  direction = "up",
  distance = 50,
}: AnimationWrapperProps) {
  const duration = 0.8;
  const delay = 0.2;
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 };
      case "down":
        return { y: -distance, opacity: 0 };
      case "left":
        return { x: distance, opacity: 0 };
      case "right":
        return { x: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case "up":
        return { y: 0, opacity: 1 };
      case "down":
        return { y: 0, opacity: 1 };
      case "left":
        return { x: 0, opacity: 1 };
      case "right":
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      whileInView={getAnimatePosition()}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

// Staggered animation wrapper for multiple children
export function StaggeredAnimationWrapper({
  children,
  className = "",
  staggerDelay = 0.1,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 50,
}: AnimationWrapperProps & { staggerDelay?: number }) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 };
      case "down":
        return { y: -distance, opacity: 0 };
      case "left":
        return { x: distance, opacity: 0 };
      case "right":
        return { x: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case "up":
        return { y: 0, opacity: 1 };
      case "down":
        return { y: 0, opacity: 1 };
      case "left":
        return { x: 0, opacity: 1 };
      case "right":
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        staggerChildren: staggerDelay,
        delayChildren: delay,
      }}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: getInitialPosition(),
              visible: {
                ...getAnimatePosition(),
                transition: {
                  duration,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              },
            }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div
          variants={{
            hidden: getInitialPosition(),
            visible: {
              ...getAnimatePosition(),
              transition: {
                duration,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            },
          }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

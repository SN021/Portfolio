import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export const AnimatedBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  // Smoother spring physics for background movement
  const springConfig = { damping: 40, stiffness: 70, mass: 2 };
  const circleX = useSpring(mouseX, springConfig);
  const circleY = useSpring(mouseY, springConfig);
  
  // Subtle rotation based on mouse position
  const rotate = useTransform(
    [circleX, circleY],
    ([latestX, latestY]) => (latestX + latestY) * 0.02
  );

  // Gentle breathing animation
  const baseScale = useMotionValue(1);
  const scale = useSpring(baseScale, { damping: 20, stiffness: 100 });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleMouseMove = (e) => {
      const centerX = windowSize.width / 2;
      const centerY = windowSize.height / 2;
      mouseX.set((e.clientX - centerX) * 0.3);
      mouseY.set((e.clientY - centerY) * 0.3);
      
      baseScale.set(1.05);
      setTimeout(() => baseScale.set(1), 500);
    };

    // Subtle breathing animation
    const breathingAnimation = () => {
      baseScale.set(1.03);
      setTimeout(() => baseScale.set(0.97), 3000);
      setTimeout(() => breathingAnimation(), 6000);
    };
    breathingAnimation();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouseX, mouseY, baseScale, windowSize]);

  return (
    <motion.div 
      className="fixed inset-0 overflow-hidden pointer-events-none bg-[#030014]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Background texture */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      {/* Primary orb */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: circleX,
          y: circleY,
          rotate,
          scale,
        }}
      >
        <motion.div 
          className="relative w-[150vh] h-[150vh]"
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "60% 40% 30% 70% / 40% 40% 60% 50%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
            ],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 20,
            ease: "easeInOut",
          }}
        >
          {/* Main gradient */}
          <motion.div
            className="absolute inset-0 rounded-[inherit]"
            style={{
              background: "linear-gradient(135deg, #4C1D95, #2563EB, #0EA5E9)",
              filter: "blur(80px)",
              opacity: 0.5,
            }}
            animate={{
              background: [
                "linear-gradient(135deg, #4C1D95, #2563EB, #0EA5E9)",
                "linear-gradient(225deg, #2563EB, #4C1D95, #0EA5E9)",
                "linear-gradient(315deg, #0EA5E9, #4C1D95, #2563EB)",
              ],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 20,
              ease: "linear",
            }}
          />

          {/* Accent gradient */}
          <motion.div
            className="absolute inset-0 rounded-[inherit]"
            style={{
              background: "linear-gradient(135deg, #C026D3, #9333EA)",
              filter: "blur(100px)",
              opacity: 0.25,
              mixBlendMode: "soft-light",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.25, 0.35, 0.25],
            }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Secondary orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[50vh] h-[50vh]"
          style={{
            left: `${25 + i * 25}%`,
            top: `${20 + i * 30}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            y: [0, -30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10 + i * 2,
            delay: i * 2,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle at center, rgba(147, 51, 234, 0.3) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </motion.div>
      ))}

      {/* Ambient light effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030014] opacity-80" />
    </motion.div>
  );
};

export default AnimatedBackground
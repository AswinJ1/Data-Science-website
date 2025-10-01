"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 45, suffix: "%", label: "Lorem ipsum dolor sit amet consectetur" },
  { value: 15500, suffix: "+", label: "Lorem ipsum dolor sit amet consectetur" },
  { value: 20000000000, suffix: "+", label: "Lorem ipsum dolor sit amet consectetur" },
];

type CountUpProps = {
  target: number;
  suffix?: string;
};

function CountUp({ target, suffix }: CountUpProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const duration = 2000; // 2 seconds

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(target * easeOut);
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, target]);

  // Format large numbers
  const formatNumber = (n: number) => {
    if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(0) + "B";
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(0) + "M";
    if (n >= 1_000) return (n / 1000).toFixed(1) + "K";
    return n.toString();
  };

  return (
    <motion.span ref={ref} className="text-4xl font-bold text-black">
      {formatNumber(count)}
      {suffix}
    </motion.span>
  );
}

function StatsSection() {
  return (
    <section className="w-full py-16">
      <div className="max-w-5xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-sm font-medium tracking-wide text-indigo-600 uppercase">
          Build trust with your users with a{" "}
          <span className="text-indigo-500 font-semibold">
            beautiful landing page
          </span>
        </h2>

        {/* Stats Grid */}
        <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center"
            >
              {/* Divider */}
              {index !== 0 && (
                <span className="hidden sm:block absolute left-0 top-1/2 h-12 w-px bg-gradient-to-b from-transparent via-indigo-300 to-transparent -translate-x-6" />
              )}
              <CountUp target={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-gray-500 text-sm max-w-[200px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;

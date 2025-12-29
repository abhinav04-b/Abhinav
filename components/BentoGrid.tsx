import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  className,
  children,
  colSpan = 4,
  rowSpan = 1,
  delay = 0,
}: {
  className?: string;
  children?: React.ReactNode;
  colSpan?: number; // 1 to 12
  rowSpan?: number; // 1 to n
  delay?: number;
}) => {
  // Map prop numbers to Tailwind classes safely
  // Note: Tailwind requires full class names to be present at build time or mapped correctly.
  // We'll use inline styles for span if dynamic, but standard tailwind classes are better.
  
  const getColSpan = (span: number) => {
    const map: Record<number, string> = {
      1: "lg:col-span-1",
      2: "lg:col-span-2",
      3: "lg:col-span-3",
      4: "lg:col-span-4",
      5: "lg:col-span-5",
      6: "lg:col-span-6",
      7: "lg:col-span-7",
      8: "lg:col-span-8",
      9: "lg:col-span-9",
      10: "lg:col-span-10",
      11: "lg:col-span-11",
      12: "lg:col-span-12",
    };
    return map[span] || "lg:col-span-4";
  };
  
  const getRowSpan = (span: number) => {
     const map: Record<number, string> = {
      1: "row-span-1",
      2: "row-span-2",
      3: "row-span-3",
    };
    return map[span] || "row-span-1";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl shadow-black/20",
        getColSpan(colSpan),
        getRowSpan(rowSpan),
        // Mobile fallback: usually full width or half width
        colSpan > 6 ? "md:col-span-6 col-span-1" : "md:col-span-3 col-span-1",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
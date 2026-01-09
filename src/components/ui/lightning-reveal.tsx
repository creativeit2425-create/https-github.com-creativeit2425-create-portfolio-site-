"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
    children: React.ReactNode;
    className?: string;
    delay?: number; // Delay in ms before reveal after flash starts
}

export const LightningReveal = ({ children, className, delay = 100 }: Props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isInView && !isVisible) {
            setTimeout(() => {
                setIsVisible(true);
            }, delay);
        }
    }, [isInView, isVisible, delay]);

    return (
        <div ref={ref} className={cn("relative", className)}>
            <motion.div
                initial={{ opacity: 0, filter: "brightness(0)" }}
                animate={isVisible ? { opacity: 1, filter: "brightness(1)" } : {}}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }} // Smooth "cloud-like" float in
            >
                {children}
            </motion.div>
        </div>
    );
};

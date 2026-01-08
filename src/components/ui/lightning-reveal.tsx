"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useStorm } from "@/components/providers/storm-provider";
import { cn } from "@/lib/utils";

interface Props {
    children: React.ReactNode;
    className?: string;
    delay?: number; // Delay in ms before reveal after flash starts
}

export const LightningReveal = ({ children, className, delay = 100 }: Props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { triggerFlash } = useStorm();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isInView && !isVisible) {
            // 1. Trigger the flash
            triggerFlash(0.8); // High intensity flash

            // 2. Reveal content exactly when flash is bright
            setTimeout(() => {
                setIsVisible(true);
            }, delay);
        }
    }, [isInView, isVisible, triggerFlash, delay]);

    return (
        <div ref={ref} className={cn("relative", className)}>
            <motion.div
                initial={{ opacity: 0, filter: "brightness(0)" }}
                animate={isVisible ? { opacity: 1, filter: "brightness(1)" } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }} // Smooth fade in from the flash
            >
                {children}
            </motion.div>
        </div>
    );
};

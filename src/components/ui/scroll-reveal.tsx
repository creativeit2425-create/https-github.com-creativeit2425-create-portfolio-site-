"use client";

import { motion } from "framer-motion";

interface Props {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}

export const ScrollReveal = ({ children, className, staggerDelay = 0.1 }: Props) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay
            }
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const RevealItem = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 15
            }
        }
    };

    return (
        <motion.div variants={item} className={className}>
            {children}
        </motion.div>
    );
};

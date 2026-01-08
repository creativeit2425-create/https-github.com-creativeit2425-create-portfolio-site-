"use client"

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import personalData from "@/lib/data.json";

// Skill keywords to fall
const SKILLS = [
    "SEO", "Meta Ads", "A/B Testing", "Analytics",
    "PPC", "Content", "Strategy", "Growth", "CRO"
];

interface Projectile {
    id: number;
    text: string;
    startX: string; // % or pixel value
}

export function Hero() {
    const { personalInfo } = personalData;
    const nameRef = useRef<HTMLHeadingElement>(null);
    const [shockActive, setShockActive] = useState(false);
    const [projectiles, setProjectiles] = useState<Projectile[]>([]);
    const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

    // Update target position based on nameRef
    useEffect(() => {
        const updateTarget = () => {
            if (nameRef.current) {
                const rect = nameRef.current.getBoundingClientRect();
                // Target the center of the name text relative to the viewport/container
                // We'll use offsetLeft/Top if simpler, but since we are inside a relative container, 
                // let's try to aim for effective center.
                // Actually, the projectiles will be absolute in the section. 
                // So we need coordinates relative to the section.
                setTargetPos({
                    x: nameRef.current.offsetLeft + nameRef.current.offsetWidth / 2,
                    y: nameRef.current.offsetTop + nameRef.current.offsetHeight / 2
                });
            }
        };

        updateTarget();
        window.addEventListener("resize", updateTarget);
        return () => window.removeEventListener("resize", updateTarget);
    }, []);

    // Spawn projectiles loop
    useEffect(() => {
        let count = 0;
        const interval = setInterval(() => {
            const id = Date.now();
            const text = SKILLS[count % SKILLS.length];
            const startX = `${Math.random() * 80 + 10}%`; // Random X between 10-90%

            setProjectiles(prev => [...prev, { id, text, startX }]);
            count++;
        }, 2000); // New skill every 2 seconds

        return () => clearInterval(interval);
    }, []);

    const handleImpact = (id: number) => {
        // Trigger Shock
        setShockActive(true);
        setTimeout(() => setShockActive(false), 200); // 200ms flicker

        // Remove projectile
        setProjectiles(prev => prev.filter(p => p.id !== id));
    };

    return (
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden relative">
            {/* Projectile Layer */}
            <div className="absolute inset-0 pointer-events-none z-20">
                <AnimatePresence>
                    {projectiles.map(p => (
                        <SkillProjectile
                            key={p.id}
                            projectile={p}
                            target={targetPos}
                            onImpact={() => handleImpact(p.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Background Elements */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10 animate-pulse delay-1000" />

            <div className="max-w-4xl z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-accent-foreground/60 font-medium tracking-wide text-lg">
                        Hello, I'm
                    </span>
                </motion.div>

                {/* Name Target */}
                <motion.h1
                    ref={nameRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={shockActive ? {
                        scale: 1.05,
                        textShadow: "0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(147, 51, 234, 0.5)",
                        x: [0, -5, 5, -5, 5, 0], // Shake
                        color: "#ffffff"
                    } : {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        textShadow: "none",
                        x: 0
                    }}
                    transition={shockActive ? { duration: 0.2 } : { duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mt-2 mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent inline-block transition-colors"
                >
                    {personalInfo.name}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl md:text-2xl text-muted-foreground font-light mb-8 max-w-2xl"
                >
                    {personalInfo.title}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap gap-4"
                >
                    <Button size="lg" className="rounded-full text-base group" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
                        View Work
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full text-base" asChild>
                        <a href="/resume.pdf" target="_blank">
                            Resume <Download className="ml-2 w-4 h-4" />
                        </a>
                    </Button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </motion.div>
        </section>
    );
}

const SkillProjectile = ({
    projectile,
    target,
    onImpact
}: {
    projectile: Projectile,
    target: { x: number, y: number },
    onImpact: () => void
}) => {
    return (
        <motion.div
            initial={{ left: projectile.startX, top: "-50px", opacity: 0, scale: 0.5 }}
            animate={{
                left: target.x,
                top: target.y,
                opacity: [0, 1, 1],
                scale: [0.5, 1, 0.2] // Grow then shrink to nothing at impact
            }}
            transition={{ duration: 1.5, ease: "linear" }}
            onAnimationComplete={onImpact}
            className="absolute text-blue-300/80 font-bold text-lg blur-[1px] z-50 whitespace-nowrap"
            style={{ textShadow: "0 0 10px rgba(59, 130, 246, 0.8)" }}
        >
            {projectile.text}
        </motion.div>
    );
};

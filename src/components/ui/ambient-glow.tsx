"use client"

import { cn } from "@/lib/utils";

interface AmbientGlowProps {
    className?: string; // Additional classes for the container
    color?: "blue" | "purple" | "cyan" | "indigo";
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
    delay?: number;
}

export function AmbientGlow({ className, color = "blue", position = "top-right", delay = 0 }: AmbientGlowProps) {
    let colorClass = "bg-blue-500/10";
    if (color === "purple") colorClass = "bg-purple-500/10";
    if (color === "cyan") colorClass = "bg-cyan-500/10";
    if (color === "indigo") colorClass = "bg-indigo-500/10";

    let posClass = "top-[-10%] right-[-5%]";
    if (position === "top-left") posClass = "top-[-10%] left-[-5%]";
    if (position === "bottom-left") posClass = "bottom-[-10%] left-[-5%]";
    if (position === "bottom-right") posClass = "bottom-[-10%] right-[-5%]";
    if (position === "center") posClass = "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";

    return (
        <div
            className={cn(
                "absolute w-[500px] h-[500px] rounded-full blur-[100px] -z-10 animate-pulse pointer-events-none",
                colorClass,
                posClass,
                className
            )}
            style={{ animationDelay: `${delay}ms` }}
        />
    );
}

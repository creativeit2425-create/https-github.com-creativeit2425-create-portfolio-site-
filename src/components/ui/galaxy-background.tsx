"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
}

interface Particle {
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    alpha: number;
    targetAlpha: number;
    color: string;
}

export const GalaxyBackground = ({ className }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Particle[] = [];
        let nebulaParticles: Particle[] = [];
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Mouse position for interaction
        let mouseX = width / 2;
        let mouseY = height / 2;

        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        const initParticles = () => {
            stars = [];
            nebulaParticles = [];

            const numStars = Math.floor((width * height) / 3000);
            const numNebula = 15; // Few large nebula clouds

            // Create Stars
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5,
                    vx: (Math.random() - 0.5) * 0.15,
                    vy: (Math.random() - 0.5) * 0.15,
                    alpha: Math.random(),
                    targetAlpha: Math.random(),
                    color: Math.random() > 0.8 ? "#a5b4fc" : "#ffffff", // Occasional blue-ish stars
                });
            }

            // Create Nebula Particles (Large, soft, colorful blobs)
            const colors = ["#4c1d95", "#312e81", "#be185d", "#0f172a"]; // Indigo, violet, pink, dark slate
            for (let i = 0; i < numNebula; i++) {
                nebulaParticles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 200 + 150, // Large radius
                    vx: (Math.random() - 0.5) * 0.05, // Very slow
                    vy: (Math.random() - 0.5) * 0.05,
                    alpha: Math.random() * 0.2 + 0.1, // Low opacity
                    targetAlpha: Math.random() * 0.2 + 0.1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                });
            }
        };

        const draw = () => {
            if (!ctx) return;

            // Clear
            ctx.fillStyle = "#020617"; // Base dark color
            ctx.fillRect(0, 0, width, height);

            // Draw Nebula
            ctx.globalCompositeOperation = "screen"; // Additive blending for glow
            nebulaParticles.forEach((p) => {
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                gradient.addColorStop(0, p.color);
                gradient.addColorStop(1, "transparent");

                ctx.fillStyle = gradient;
                ctx.globalAlpha = p.alpha;
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around
                if (p.x < -p.radius) p.x = width + p.radius;
                if (p.x > width + p.radius) p.x = -p.radius;
                if (p.y < -p.radius) p.y = height + p.radius;
                if (p.y > height + p.radius) p.y = -p.radius;
            });
            ctx.globalCompositeOperation = "source-over"; // Reset blending

            // Draw Stars
            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = star.color;
                ctx.globalAlpha = star.alpha;
                ctx.fill();

                // Move
                star.x += star.vx;
                star.y += star.vy;

                // Gentle parallax based on mouse
                // star.x += (mouseX - width / 2) * 0.0001 * star.radius;
                // star.y += (mouseY - height / 2) * 0.0001 * star.radius;

                // Wrap
                if (star.x < 0) star.x = width;
                if (star.x > width) star.x = 0;
                if (star.y < 0) star.y = height;
                if (star.y > height) star.y = 0;

                // Twinkle
                if (Math.random() > 0.95) {
                    star.targetAlpha = Math.random();
                }
                const da = (star.targetAlpha - star.alpha) * 0.05;
                star.alpha += da;
            });
            ctx.globalAlpha = 1.0;

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);

        resizeCanvas();
        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={cn("fixed top-0 left-0 w-full h-full -z-10 pointer-events-none", className)}
        />
    );
};

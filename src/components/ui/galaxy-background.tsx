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
        // Target scroll position for parallax
        let targetScrollY = 0;
        let currentScrollY = 0;

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
            const numNebula = 8; // Fewer, larger nebula clouds for better performance

            // Create Stars
            for (let i = 0; i < numStars; i++) {
                const depth = Math.random(); // 0 = far, 1 = close
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5 + (depth * 0.5),
                    vx: (Math.random() - 0.5) * 0.05,
                    vy: (Math.random() - 0.5) * 0.05,
                    alpha: Math.random() * 0.8 + 0.2,
                    targetAlpha: Math.random(),
                    color: Math.random() > 0.8 ? "#a5b4fc" : "#ffffff",
                    // Custom property for parallax depth
                    // @ts-ignore
                    depth: depth,
                } as any);
            }

            // Create Nebula Particles
            const colors = ["#4c1d95", "#312e81", "#be185d", "#0f172a"];
            for (let i = 0; i < numNebula; i++) {
                nebulaParticles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 300 + 200,
                    vx: (Math.random() - 0.5) * 0.02,
                    vy: (Math.random() - 0.5) * 0.02,
                    alpha: Math.random() * 0.15 + 0.05,
                    targetAlpha: 0,
                    color: colors[Math.floor(Math.random() * colors.length)],
                });
            }
        };

        const drawMoon = () => {
            // Draw Moon in top right corner
            const moonX = width * 0.85;
            const moonY = height * 0.2;
            const moonRadius = 60;

            // Glow
            const gradient = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.8, moonX, moonY, moonRadius * 4);
            gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(moonX, moonY, moonRadius * 4, 0, Math.PI * 2);
            ctx.fill();

            // Moon Main Body
            ctx.fillStyle = "#e2e8f0"; // slate-200
            ctx.beginPath();
            ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
            ctx.fill();

            // Craters (Optional detail)
            ctx.fillStyle = "#cbd5e1"; // slate-300
            ctx.beginPath();
            ctx.arc(moonX - 15, moonY + 10, 8, 0, Math.PI * 2);
            ctx.arc(moonX + 20, moonY - 15, 12, 0, Math.PI * 2);
            ctx.arc(moonX + 5, moonY + 25, 6, 0, Math.PI * 2);
            ctx.fill();
        }

        const draw = () => {
            if (!ctx) return;

            // Smooth scroll interpolation
            currentScrollY += (targetScrollY - currentScrollY) * 0.05;

            // Clear
            ctx.fillStyle = "#020617";
            ctx.fillRect(0, 0, width, height);

            // Draw Nebula
            ctx.globalCompositeOperation = "screen";
            nebulaParticles.forEach((p) => {
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                gradient.addColorStop(0, p.color);
                gradient.addColorStop(1, "transparent");

                ctx.fillStyle = gradient;
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;

                // Wrap
                if (p.x < -p.radius) p.x = width + p.radius;
                if (p.x > width + p.radius) p.x = -p.radius;
                if (p.y < -p.radius) p.y = height + p.radius;
                if (p.y > height + p.radius) p.y = -p.radius;
            });
            ctx.globalCompositeOperation = "source-over";

            drawMoon();

            // Draw Stars
            stars.forEach((star: any) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = star.color;
                ctx.globalAlpha = star.alpha;
                ctx.fill();

                // Move
                star.x += star.vx;
                star.y += star.vy;

                // Parallax based on mouse and scroll
                // Deeper stars move slower
                const parallaxX = (mouseX - width / 2) * 0.02 * star.depth;
                const parallaxY = (mouseY - height / 2) * 0.02 * star.depth;
                // Add scroll effect - stars move up as you scroll down
                const scrollOffset = currentScrollY * 0.2 * star.depth;

                // We apply parallax as an offset during draw effectively, but here we are modifying position directly?
                // Providing a temporary offset is better for "parallax", but for simplicity doing a slight drift:
                star.x += (mouseX - width / 2) * 0.0001 * star.depth;
                star.y += (mouseY - height / 2) * 0.0001 * star.depth;


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

        const handleScroll = () => {
            targetScrollY = window.scrollY;
        }

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);

        resizeCanvas();
        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
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

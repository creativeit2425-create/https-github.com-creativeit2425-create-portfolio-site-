"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useStorm } from "@/components/providers/storm-provider";

interface Props {
    className?: string;
}

export const StormBackground = ({ className }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // We use ref for flash intensity to avoid re-renders of the canvas effect loop
    const { flashIntensity } = useStorm();
    const externalFlashRef = useRef(0);

    useEffect(() => {
        externalFlashRef.current = flashIntensity;
    }, [flashIntensity]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let rain: { x: number; y: number; length: number; velocity: number; alpha: number }[] = [];
        let clouds: { x: number; y: number; radius: number; vx: number; alpha: number }[] = [];

        let width = window.innerWidth;
        let height = window.innerHeight;

        // Thunder control (Internal ambient flashes)
        let ambientFlashTimer = 0;
        let nextAmbientFlashTime = Math.random() * 500 + 200;

        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        const initParticles = () => {
            rain = [];
            clouds = [];

            const numDrops = Math.floor((width * height) / 1000);
            const numClouds = 8; // Large drifting clouds

            // Rain
            for (let i = 0; i < numDrops; i++) {
                rain.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    length: Math.random() * 20 + 10,
                    velocity: Math.random() * 10 + 15,
                    alpha: Math.random() * 0.4 + 0.1,
                });
            }

            // Clouds
            for (let i = 0; i < numClouds; i++) {
                clouds.push({
                    x: Math.random() * width,
                    y: Math.random() * (height * 0.4), // Top 40% only
                    radius: Math.random() * 300 + 200,
                    vx: (Math.random() - 0.5) * 0.2, // Slow horizontal drift
                    alpha: Math.random() * 0.1 + 0.05, // Very subtle, ghostly
                });
            }
        };

        let currentVisFlashIntensity = 0;

        const draw = () => {
            if (!ctx) return;

            // 1. Dark Background
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(0, 0, width, height);

            // 2. Clouds (Before rain and flash, acting as background texture)
            clouds.forEach(cloud => {
                const gradient = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.radius);
                gradient.addColorStop(0, "rgba(200, 210, 230, 0.1)");
                gradient.addColorStop(1, "transparent");

                ctx.beginPath();
                ctx.fillStyle = gradient;
                ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
                ctx.fill();

                cloud.x += cloud.vx;
                if (cloud.x < -cloud.radius) cloud.x = width + cloud.radius;
                if (cloud.x > width + cloud.radius) cloud.x = -cloud.radius;
            });

            // 3. Update Flash Logic

            // Check External Trigger (from Context)
            if (externalFlashRef.current > 0) {
                currentVisFlashIntensity = externalFlashRef.current;
            }

            // Check Ambient Trigger
            if (ambientFlashTimer > nextAmbientFlashTime) {
                currentVisFlashIntensity = Math.random() * 0.3 + 0.1; // Softer ambient flash
                ambientFlashTimer = 0;
                nextAmbientFlashTime = Math.random() * 500 + 200;
            }
            ambientFlashTimer++;

            // Render Flash Overlay
            if (currentVisFlashIntensity > 0) {
                // Use lighter blending for flash
                ctx.fillStyle = `rgba(255, 255, 255, ${currentVisFlashIntensity})`;
                ctx.fillRect(0, 0, width, height);

                // Decay
                currentVisFlashIntensity -= 0.05;
                if (currentVisFlashIntensity < 0) currentVisFlashIntensity = 0;
            }

            // 4. Rain
            ctx.strokeStyle = "rgba(148, 163, 184, 0.5)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let i = 0; i < rain.length; i++) {
                const drop = rain[i];
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x, drop.y + drop.length);
                drop.y += drop.velocity;
                if (drop.y > height) {
                    drop.y = -drop.length;
                    drop.x = Math.random() * width;
                }
            }
            ctx.stroke();

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []); // Remove dependency on flashIntensity to prevent full re-init 

    return (
        <canvas
            ref={canvasRef}
            className={cn("fixed top-0 left-0 w-full h-full -z-10 pointer-events-none transition-colors duration-1000", className)}
        />
    );
};

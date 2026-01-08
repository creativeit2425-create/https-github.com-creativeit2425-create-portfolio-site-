"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";

interface StormContextType {
    isFlashing: boolean;
    triggerFlash: (intensity?: number) => void;
    flashIntensity: number;
}

const StormContext = createContext<StormContextType | undefined>(undefined);

export const useStorm = () => {
    const context = useContext(StormContext);
    if (!context) {
        throw new Error("useStorm must be used within a StormProvider");
    }
    return context;
};

export const StormProvider = ({ children }: { children: ReactNode }) => {
    const [flashIntensity, setFlashIntensity] = useState(0);

    // Wetness effect: 0 to 1 over 60 seconds
    useEffect(() => {
        let startTime = Date.now();
        const duration = 60000; // 60 seconds to full wetness

        const updateWetness = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Update CSS variable for global access
            document.documentElement.style.setProperty("--wetness", progress.toString());

            if (progress < 1) {
                requestAnimationFrame(updateWetness);
            }
        };

        requestAnimationFrame(updateWetness);
    }, []);

    const triggerFlash = useCallback((intensity = 1) => {
        setFlashIntensity(intensity);

        // Reset after a short duration to allow decay logic in consumers or just simple state reset
        setTimeout(() => {
            setFlashIntensity(0);
        }, 100);
    }, []);

    return (
        <StormContext.Provider
            value={{
                isFlashing: flashIntensity > 0,
                triggerFlash,
                flashIntensity,
            }}
        >
            {children}
        </StormContext.Provider>
    );
};

"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

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

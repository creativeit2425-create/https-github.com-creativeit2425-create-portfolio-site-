"use client";

import React from "react";
import { useStorm } from "@/components/providers/storm-provider";
import { GalaxyBackground } from "@/components/ui/galaxy-background";
import { StormBackground } from "@/components/ui/storm-background";
import { cn } from "@/lib/utils";

export const BackgroundManager = () => {
    const { theme } = useStorm();

    return (
        <>
            <div className={cn("fixed inset-0 -z-30 transition-opacity duration-1000", theme === "galaxy" ? "opacity-100" : "opacity-0")}>
                <GalaxyBackground />
            </div>
            <div className={cn("fixed inset-0 -z-20 transition-opacity duration-1000", theme === "storm" ? "opacity-100" : "opacity-0")}>
                <StormBackground />
            </div>
        </>
    );
};

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import personalData from "@/lib/data.json";
import { LightningReveal } from "@/components/ui/lightning-reveal";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { ScrollReveal, RevealItem } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";

import { motion } from "framer-motion";

export function Skills() {
    const { skills } = personalData;

    return (
        <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
            <AmbientGlow color="purple" position="top-left" />
            <div className="max-w-7xl mx-auto relative z-10">
                <h2
                    className="text-3xl md:text-5xl font-bold mb-16 tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent inline-block"
                >
                    Expertise & Tools
                </h2>

                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {Object.entries(skills).map(([category, items], index) => (
                        <LightningReveal key={index} delay={index * 500}>
                            <ScrollReveal className="h-full">
                                <RevealItem className="h-full">
                                    <TiltCard className="h-full">
                                        <Card className="h-full bg-card/50 backdrop-blur-sm border-white/5 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] transition-all duration-300">
                                            <CardHeader>
                                                <CardTitle className="text-xl font-medium text-primary/90">{category}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex flex-wrap gap-2">
                                                    {(items as string[]).map((skill, i) => (
                                                        <span
                                                            key={i}
                                                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-100 border border-blue-500/20 hover:bg-blue-500/20 transition-colors cursor-default shadow-[0_0_10px_-5px_rgba(59,130,246,0.3)]"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TiltCard>
                                </RevealItem>
                            </ScrollReveal>
                        </LightningReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

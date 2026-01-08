"use client"

import { motion } from "framer-motion";
import personalData from "@/lib/data.json";

import { LightningReveal } from "@/components/ui/lightning-reveal";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { ScrollReveal, RevealItem } from "@/components/ui/scroll-reveal";

export function Experience() {
    const { experience } = personalData;

    return (
        <section id="experience" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
            <AmbientGlow color="blue" position="bottom-right" className="opacity-50" />
            <div className="max-w-4xl mx-auto relative z-10">
                <LightningReveal>
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent inline-block">
                        Professional History
                    </h2>
                </LightningReveal>

                <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
                    {experience.map((job, index) => (
                        <div key={index} className="relative pl-6 md:pl-12">
                            {/* Timeline Dot with Electric Glow */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 + 0.2, type: "spring", stiffness: 200 }}
                                className="absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] ring-4 ring-black/20 z-10"
                            />

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    delay: index * 0.2,
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1] // Custom "Classy" Bezier
                                }}
                                className="p-5 md:p-6 rounded-lg bg-card/10 backdrop-blur-sm border border-white/5 hover:border-blue-500/30 hover:bg-card/20 transition-all duration-300 group"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                    <h3 className="text-xl font-semibold text-primary group-hover:text-blue-400 transition-colors">{job.title}</h3>
                                    <span className="text-sm text-muted-foreground font-mono bg-white/5 px-2 py-1 rounded border border-white/5">{job.period}</span>
                                </div>
                                <div className="text-lg text-accent-foreground/80 mb-4">{job.company} — <span className="text-muted-foreground text-sm">{job.location}</span></div>

                                <ul className="space-y-2 text-muted-foreground/90 list-disc pl-4">
                                    {job.responsibilities.map((resp, i) => (
                                        <li key={i} className="pl-1 text-sm leading-relaxed">
                                            {resp}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

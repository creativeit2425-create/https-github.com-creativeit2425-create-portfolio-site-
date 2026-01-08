"use client"

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { LightningReveal } from "@/components/ui/lightning-reveal";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { TiltCard } from "@/components/ui/tilt-card";

export function Projects() {
    const projects = [
        {
            title: "Simulated Brand Growth",
            description: "Developed a cross-platform content strategy growing follower engagement by 25% over four months.",
            tags: ["Content Strategy", "Social Media", "Analytics"],
            github: "#",
            demo: "#"
        },
        {
            title: "Email Marketing Campaign",
            description: "Executed multi-step campaigns with A/B testing achieving a 28% lift in engagement rate.",
            tags: ["Email Marketing", "A/B Testing", "CRM"],
            github: "#",
            demo: "#"
        },
        {
            title: "Technical SEO Audit",
            description: "Comprehensive audit identifying 30+ critical structural issues for a 10% organic visibility increase.",
            tags: ["SEMrush", "Ahrefs", "Technical SEO"],
            github: "#",
            demo: "#"
        }
    ];

    return (
        <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
            <AmbientGlow color="cyan" position="top-right" delay={500} />
            <AmbientGlow color="purple" position="bottom-left" delay={1000} className="w-[300px] h-[300px]" />
            <div className="max-w-7xl mx-auto relative z-10">
                <LightningReveal>
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent inline-block">
                        Featured Projects
                    </h2>
                </LightningReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <LightningReveal key={index} delay={index * 200}>
                            <TiltCard className="h-full">
                                <Card className="h-full flex flex-col bg-card/10 backdrop-blur-sm border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <CardHeader>
                                        <div className="flex justify-between items-start z-10">
                                            <CardTitle className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                                                {project.title}
                                            </CardTitle>
                                            <div className="flex gap-3">
                                                {project.github && (
                                                    <Link href={project.github} target="_blank" className="text-muted-foreground hover:text-white transition-colors">
                                                        <Github className="w-5 h-5" />
                                                    </Link>
                                                )}
                                                {project.demo && (
                                                    <Link href={project.demo} target="_blank" className="text-muted-foreground hover:text-white transition-colors">
                                                        <ExternalLink className="w-5 h-5" />
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col z-10">
                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.tags.map((tag, i) => (
                                                <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-200 border border-blue-500/20 whitespace-nowrap">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TiltCard>
                        </LightningReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

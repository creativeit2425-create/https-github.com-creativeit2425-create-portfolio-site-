"use client"

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { LightningReveal } from "@/components/ui/lightning-reveal";

export function Projects() {
    const projects = [
        {
            title: "Simulated Brand Growth",
            description: "Developed a cross-platform content strategy growing follower engagement by 25% over four months.",
            tags: ["Content Strategy", "Social Media", "Analytics"],
            link: "#"
        },
        {
            title: "Email Marketing Campaign",
            description: "Executed multi-step campaigns with A/B testing achieving a 28% lift in engagement rate.",
            tags: ["Email Marketing", "A/B Testing", "CRM"],
            link: "#"
        },
        {
            title: "Technical SEO Audit",
            description: "Comprehensive audit identifying 30+ critical structural issues for a 10% organic visibility increase.",
            tags: ["SEMrush", "Ahrefs", "Technical SEO"],
            link: "#"
        }
    ];

    return (
        <section id="projects" className="py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <LightningReveal>
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent inline-block">
                        Featured Projects
                    </h2>
                </LightningReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                delay: index * 0.15,
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                        >
                            <Card className="bg-card/10 backdrop-blur-md border-white/5 hover:border-blue-500/50 hover:shadow-[0_0_20px_-10px_rgba(59,130,246,0.5)] transition-all duration-300 h-full flex flex-col group overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <CardHeader>
                                    <div className="flex justify-between items-start z-10">
                                        <CardTitle className="text-2xl group-hover:text-blue-400 transition-colors">{project.title}</CardTitle>
                                        <Link href={project.link} className="text-muted-foreground hover:text-blue-400 transition-colors">
                                            <ExternalLink className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col justify-between z-10">
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="text-xs font-medium px-2 py-1 rounded-full bg-blue-500/10 text-blue-200 border border-blue-500/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

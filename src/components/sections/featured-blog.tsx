"use client"

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { LightningReveal } from "@/components/ui/lightning-reveal";

// Placeholder data - in a real app this would come from MDX files
const recentPosts = [
    {
        title: "The Future of SEO in an AI-First World",
        excerpt: "How Large Language Models are reshaping search engine optimization strategies for 2026 and beyond.",
        date: "Jan 05, 2026",
        readTime: "5 min read",
        slug: "future-of-seo-ai",
        category: "SEO"
    },
    {
        title: "Scaling Paid Media Campaigns with CAPI",
        excerpt: "A deep dive into implementing Conversion API for robust tracking and improved ROAS on Meta platforms.",
        date: "Dec 28, 2025",
        readTime: "8 min read",
        slug: "scaling-paid-media-capi",
        category: "Paid Media"
    },
    {
        title: "Designing High-Converting Landing Pages",
        excerpt: "Key principles of CRO that drove a 28% engagement lift in my recent campaigns.",
        date: "Dec 15, 2025",
        readTime: "6 min read",
        slug: "high-converting-landing-pages",
        category: "CRO"
    }
];

export function FeaturedBlog() {
    return (
        <section id="blog" className="py-24 px-6 md:px-12 lg:px-24 border-t border-white/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <LightningReveal>
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent inline-block">
                                Latest Thoughts
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-xl">
                                Insights on digital marketing, technology, and design.
                            </p>
                        </div>
                    </LightningReveal>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Button variant="ghost" className="group text-lg hover:bg-blue-500/10 hover:text-blue-400" asChild>
                            <Link href="/blog">
                                Read all articles
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recentPosts.map((post, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                delay: index * 0.15,
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <Card className="bg-card/10 backdrop-blur-md border-white/5 hover:border-blue-500/50 hover:shadow-[0_0_20px_-10px_rgba(59,130,246,0.5)] transition-all duration-300 h-full flex flex-col group overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-2 text-xs text-blue-400 font-medium uppercase tracking-wider">
                                            <span>{post.category}</span>
                                        </div>
                                        <CardTitle className="leading-tight group-hover:text-blue-200 transition-colors text-xl">
                                            {post.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>
                                    </CardContent>
                                    <CardFooter className="flex items-center gap-4 text-xs text-muted-foreground mt-auto border-t border-white/5 pt-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {post.readTime}
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

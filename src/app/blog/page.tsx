"use client"

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";

export default function BlogIndex() {
    return (
        <div className="min-h-screen bg-background py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto">
                <Link href="/">
                    <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all text-muted-foreground"><ArrowLeft className="mr-2 w-4 h-4" /> Back to Home</Button>
                </Link>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold mb-12 tracking-tight"
                >
                    Blog
                </motion.h1>

                <div className="grid gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <Card className="bg-card/40 border-white/5 hover:border-white/20 transition-all hover:bg-card/60 group">
                                    <CardHeader>
                                        <div className="flex items-center gap-2 text-sm text-primary/80 mb-2">
                                            <span className="font-semibold">{post.category}</span>
                                            <span>•</span>
                                            <span className="text-muted-foreground">{post.date}</span>
                                        </div>
                                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{post.excerpt}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {post.readTime}
                                        </span>
                                    </CardFooter>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Linkedin, MapPin, Send } from "lucide-react";
import personalData from "@/lib/data.json";

import { LightningReveal } from "@/components/ui/lightning-reveal";


export function Contact() {
    const { personalInfo } = personalData;

    return (
        <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
            <AmbientGlow color="indigo" position="center" className="opacity-40" />
            <div className="max-w-3xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <LightningReveal delay={0}>
                        <Card className="bg-card/10 border-white/5 backdrop-blur-xl overflow-hidden shadow-2xl shadow-blue-900/10">
                            <div className="grid md:grid-cols-2">
                                <div className="p-8 md:p-12 bg-blue-950/20 flex flex-col justify-between border-r border-white/5">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-6 text-white">Let's Connect</h2>
                                        <p className="text-muted-foreground mb-12">
                                            I'm currently open to new opportunities and collaborations.
                                            Whether you have a question or just want to say hi, I'll try my best to get back to you!
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-blue-400 transition-colors">
                                            <Mail className="w-5 h-5 text-blue-500" />
                                            {personalInfo.email}
                                        </a>
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <Phone className="w-5 h-5 text-blue-500" />
                                            {personalInfo.phone}
                                        </div>
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <MapPin className="w-5 h-5 text-blue-500" />
                                            {personalInfo.location}
                                        </div>
                                        <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-blue-400 transition-colors">
                                            <Linkedin className="w-5 h-5 text-blue-500" />
                                            {personalInfo.linkedin}
                                        </a>
                                    </div>
                                </div>

                                <div className="p-8 md:p-12 bg-transparent">
                                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-blue-200/80">Name</label>
                                            <input
                                                id="name"
                                                className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:bg-white/10 transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-blue-200/80">Email</label>
                                            <input
                                                id="email"
                                                type="email"
                                                className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:bg-white/10 transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-medium text-blue-200/80">Message</label>
                                            <textarea
                                                id="message"
                                                className="flex min-h-[120px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:bg-white/10 transition-all"
                                                placeholder="Your message..."
                                            />
                                        </div>
                                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all">
                                            Send Message
                                            <Send className="ml-2 w-4 h-4" />
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </Card>
                    </LightningReveal>
                </motion.div>
            </div>
        </section>
    );
}

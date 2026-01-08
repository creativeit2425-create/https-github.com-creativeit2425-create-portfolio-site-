"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navItems = [
    { name: "Skills", href: "/#skills" },
    { name: "Experience", href: "/#experience" },
    { name: "Projects", href: "/#projects" },
    { name: "Blog", href: "/#blog" }, // Use hash for home sections, distinct path for full page
    { name: "Contact", href: "/#contact" },
]

export function SiteHeader() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const { scrollY } = useScroll()
    const pathname = usePathname()

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious()
        if (latest > 50 && latest > (previous ?? 0)) {
            // Scroll Down could hide nav if desired, but for now just check threshold
            setIsScrolled(true)
        } else if (latest <= 50) {
            setIsScrolled(false)
        }
    })

    // Close mobile menu on route change
    React.useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 transition-all duration-300",
                isScrolled ? "py-4" : "py-6"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ stiffness: 100, damping: 20, type: "spring" }}
        >
            <div
                className={cn(
                    "flex items-center justify-between w-full max-w-5xl px-6 py-3 bg-background/50 backdrop-blur-md rounded-full border border-white/10 shadow-lg transition-all",
                    isScrolled ? "bg-background/80" : ""
                )}
            >
                <Link href="/" className="mr-8 group">
                    <div className="relative w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 group-hover:scale-110">
                        {/* Ambient Glow Background */}
                        <div className="absolute inset-0 bg-cyan-500/40 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen" />

                        <Image
                            src="/logo-v3.png"
                            alt="Rayhan Logo"
                            fill
                            className="object-contain drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] z-10"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href}>
                            <Button variant="ghost" className="text-sm font-medium hover:bg-white/10 hover:text-primary rounded-full px-4">
                                {item.name}
                            </Button>
                        </Link>
                    ))}
                </nav>

                {/* Mobile Nav Toggle */}
                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-20 left-4 right-4 p-4 bg-card border border-border rounded-xl shadow-2xl flex flex-col gap-2 md:hidden"
                >
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start text-lg">
                                {item.name}
                            </Button>
                        </Link>
                    ))}
                </motion.div>
            )}
        </motion.header>
    )
}

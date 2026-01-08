export function SiteFooter() {
    return (
        <footer className="py-8 bg-background border-t border-white/5 text-center text-sm text-muted-foreground">
            <div className="container px-4">
                <p>© {new Date().getFullYear()} S.N.M. Rayhan. All rights reserved.</p>
                <p className="mt-2 text-xs opacity-50">Built with Next.js & Framer Motion</p>
            </div>
        </footer>
    )
}

import { blogPosts } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Generate static params for export
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = blogPosts.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-background py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto">
                <Link href="/blog">
                    <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all text-muted-foreground"><ArrowLeft className="mr-2 w-4 h-4" /> Back to Blog</Button>
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-2 text-primary/80 mb-4 text-sm font-medium uppercase tracking-wide">
                        <span>{post.category}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap gap-6 text-muted-foreground text-sm border-y border-white/10 py-4">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>S.N.M. Rayhan</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </header>

                <div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground">
                    {/* Creating a simple renderer for the mock content since it's just strings currently. 
                 In a real app, use next-mdx-remote or similar. */}
                    {post.content.split('\n').map((line, i) => {
                        if (line.trim().startsWith('## ')) return <h2 key={i} className="mt-8 mb-4">{line.replace('## ', '')}</h2>
                        if (line.trim().startsWith('### ')) return <h3 key={i} className="mt-6 mb-3">{line.replace('### ', '')}</h3>
                        if (line.trim().length === 0) return <br key={i} />
                        return <p key={i} className="mb-4">{line}</p>
                    })}
                </div>
            </div>
        </article>
    );
}

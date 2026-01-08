import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { FeaturedBlog } from "@/components/sections/featured-blog";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <FeaturedBlog />
      <Contact />
    </main>
  );
}

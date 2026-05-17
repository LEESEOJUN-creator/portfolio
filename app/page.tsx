import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
      </main>
    </>
  );
}

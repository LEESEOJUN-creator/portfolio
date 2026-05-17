import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";

function Divider() {
  return (
    <div className="flex justify-center px-6 sm:px-10 lg:px-16 py-4">
      <div className="w-full max-w-3xl border-t border-white/6" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <Hero />
        <Projects />
        <Skills />
        <Divider />
        <Experience />
        <Divider />
        <Education />
        <Divider />
        <Certifications />
        <Footer />
      </main>
    </>
  );
}

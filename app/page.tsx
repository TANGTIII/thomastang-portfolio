import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Summary from "@/components/Summary";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import ResumeDownload from "@/components/ResumeDownload";
import Footer from "@/components/Footer";
import TarotSection from "./components/TarotSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Hero />
        <Summary />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <TarotSection />
        <ResumeDownload />
      </main>
      <Footer />
    </>
  );
}

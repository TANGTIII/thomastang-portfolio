export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0a0a0f]/90 backdrop-blur">
      <nav className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-mono text-cyan-400 font-semibold tracking-tight">
          TTT
        </span>
        <div className="flex gap-6 text-sm text-slate-400">
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
          <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
          <a href="#resume" className="hover:text-cyan-400 transition-colors">Resume</a>
        </div>
      </nav>
    </header>
  );
}

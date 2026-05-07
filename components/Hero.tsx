export default function Hero() {
  return (
    <section className="py-20 border-b border-slate-800">
      <p className="text-cyan-400 font-mono text-sm mb-3">Hello, I&apos;m</p>
      <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
        Thomas T. Tang III
      </h1>
      <h2 className="text-2xl text-slate-400 font-light mb-6">
        Senior Software Engineer
      </h2>
      <p className="text-slate-400 max-w-xl leading-relaxed mb-8">
        Palm City, FL &nbsp;·&nbsp; 262-501-8997 &nbsp;·&nbsp;{" "}
        <a
          href="mailto:Tang.T.Thomas@gmail.com"
          className="text-cyan-400 hover:underline"
        >
          Tang.T.Thomas@gmail.com
        </a>
      </p>
      <div className="flex gap-4 flex-wrap">
        <a
          href="mailto:Tang.T.Thomas@gmail.com"
          className="px-5 py-2.5 bg-cyan-400 text-[#0a0a0f] font-semibold rounded hover:bg-cyan-300 transition-colors text-sm"
        >
          Get in Touch
        </a>
        <a
          href="#resume"
          className="px-5 py-2.5 border border-slate-700 text-slate-300 rounded hover:border-cyan-400 hover:text-cyan-400 transition-colors text-sm"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}

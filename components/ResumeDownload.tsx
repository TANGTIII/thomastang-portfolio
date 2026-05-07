export default function ResumeDownload() {
  return (
    <section id="resume" className="py-16 border-b border-slate-800">
      <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-8">
        Resume
      </h3>
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h4 className="text-white font-semibold text-lg mb-1">
            Thomas T. Tang III — Senior Engineer
          </h4>
          <p className="text-slate-400 text-sm">
            Full resume available for download · Last updated 2025
          </p>
        </div>
        <a
          href="/ThomasTTangIII-Senior-Engineer.docx"
          download
          className="shrink-0 px-6 py-3 bg-cyan-400 text-[#0a0a0f] font-semibold rounded hover:bg-cyan-300 transition-colors text-sm flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Resume
        </a>
      </div>
    </section>
  );
}

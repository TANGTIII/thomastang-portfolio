export default function Education() {
  return (
    <section className="py-16 border-b border-slate-800">
      <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-8">
        Education
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
        <p className="text-slate-500 text-sm">2015</p>
        <div>
          <h4 className="text-white font-semibold">
            Bachelor of Science in Biology
          </h4>
          <p className="text-cyan-400 text-sm">
            University of Wisconsin-Milwaukee
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Summary() {
  return (
    <section id="about" className="py-16 border-b border-slate-800">
      <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-6">
        About
      </h3>
      <p className="text-slate-300 leading-relaxed text-lg max-w-3xl">
        Senior Software Engineer with{" "}
        <span className="text-white font-medium">10+ years</span> building
        mission-critical healthcare platforms that power{" "}
        <span className="text-white font-medium">75% of U.S. organ donation</span>
        . Delivered HIPAA-compliant distributed systems, cross-border FHIR API
        integrations, and multi-tenant SaaS platforms serving transplant centers
        worldwide — cutting operational costs, improving system performance, and
        enabling life-saving coordination at scale.
      </p>
    </section>
  );
}

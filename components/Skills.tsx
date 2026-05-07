const skillGroups = [
  {
    label: "Languages & Frameworks",
    items: ["C#", ".NET", "Entity Framework Core", "JavaScript", "Python"],
  },
  {
    label: "Cloud & DevOps",
    items: ["Bitbucket", "Octopus Deploy", "CI/CD"],
  },
  {
    label: "Data & Integration",
    items: ["Microsoft SQL Server", "PostgreSQL", "Redis", "S3", "FHIR / HL7"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 border-b border-slate-800">
      <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-8">
        Technical Expertise
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <p className="text-slate-500 text-xs uppercase tracking-wider mb-3">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 text-sm bg-slate-900 border border-slate-700 text-slate-300 rounded"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

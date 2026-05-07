const jobs = [
  {
    title: "Senior Software Engineer",
    company: "Invita Healthcare",
    location: "Santa Monica, CA",
    period: "January 2022 – Present",
    bullets: [
      "Technical lead for building FHIR-compliant API gateway integrating Canada's national healthcare network (CIHI) with U.S. transplant systems, significantly reducing cross-provincial organ allocation time and enabling transplants across Canada.",
      "Built i18n framework supporting multiple languages with real-time locale switching, reducing client onboarding time and expanding platform reach internationally.",
      "Modernized legacy RDLC reporting to parameterized SQL procedures with dynamic rendering, reducing maintenance overhead and improving report generation performance.",
      "Orchestrated zero-downtime deployments across multi-tenant SaaS infrastructure serving healthcare organizations nationwide, consistently maintaining 99.9% uptime SLA commitments.",
      "Mentored 2 developers through task delegation, code reviews, onboarding, and training on DevOps workflows, support processes, and team coding standards.",
    ],
  },
  {
    title: "Full-Stack Engineer",
    company: "Transplant Connect",
    location: "Santa Monica, CA",
    period: "June 2017 – December 2021",
    bullets: [
      "Designed and built 30+ white-label transplant management platforms in .NET with multi-tenant architecture, scaling the product across transplant centers worldwide.",
      "Developed financial integration API connecting QuickBooks via QBWC protocol for automated invoice generation and reconciliation with transplant inventory, eliminating manual accounting workflows and reducing billing errors.",
      "Delivered a real-time dashboard with Google Maps API integration, rendering live geolocation markers for flagged donor organs and providing call center operators with an interactive status board for active case monitoring.",
      "Optimized critical database queries through indexing strategy, query refactoring, and Redis caching, reducing dashboard load times by 30%.",
      "Built internal workforce management platform with time tracking and PTO scheduling, reducing HR admin workload.",
    ],
  },
  {
    title: "Software Engineer",
    company: "WonderBox Technologies",
    location: "Mequon, WI",
    period: "June 2016 – June 2017",
    bullets: [
      "Built a customer account management CRM using .NET and jQuery with a responsive interface and streamlined client tracking.",
      "Expanded automated test coverage in an Agile CI/CD environment, improving release stability and contributing to consistent sprint delivery.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-16 border-b border-slate-800">
      <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-10">
        Experience
      </h3>
      <div className="space-y-12">
        {jobs.map((job) => (
          <div key={job.title + job.company} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
            <div>
              <p className="text-slate-500 text-sm">{job.period}</p>
              <p className="text-slate-500 text-sm mt-1">{job.location}</p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg">{job.title}</h4>
              <p className="text-cyan-400 text-sm mb-4">{job.company}</p>
              <ul className="space-y-2">
                {job.bullets.map((b, i) => (
                  <li key={i} className="text-slate-400 text-sm leading-relaxed flex gap-2">
                    <span className="text-cyan-400 mt-1 shrink-0">▸</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

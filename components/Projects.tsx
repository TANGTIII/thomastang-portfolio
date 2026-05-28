import Link from 'next/link'

const projects = [
  {
    name: 'Tarot Card Reader',
    description: 'Interactive tarot reading app with animated card flips, multiple spread layouts (Single, Past·Present·Future, Five Card Cross, Celtic Cross), and a full 78-card deck.',
    tags: ['React', 'Next.js', 'TypeScript'],
    href: '/tarot',
    internal: true,
  },
  {
    name: 'ASCII Renderer',
    description: 'Converts images and video (including live webcam) to ASCII art using 6-point shape-based luminance sampling and nearest-character matching in 6D vector space.',
    tags: ['Canvas API', 'WebRTC', 'TypeScript'],
    href: '/ascii',
    internal: true,
  },
  {
    name: 'Blackjack Card Counting Trainer',
    description: 'Terminal blackjack game with real-time Hi-Lo card counting. Tracks running and true count across a configurable multi-deck shoe, with basic strategy hints and an interactive count quiz mode.',
    tags: ['Python', 'CLI', 'Card Counting'],
    href: 'https://tangtiii.github.io/blackjack-card-counting/',
    internal: false,
  },
]

const cardClass = "group block bg-slate-900 border border-slate-700 rounded-lg p-6 hover:border-cyan-400 transition-colors"

export default function Projects() {
  return (
    <section id="projects" className="py-16 border-b border-slate-800">
      <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-8">
        Projects
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((p) => {
          const inner = (
            <>
              <div className="flex items-start justify-between gap-2 mb-3">
                <h4 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                  {p.name}
                </h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0 mt-1"
                >
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 text-xs bg-slate-800 border border-slate-700 text-slate-400 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </>
          )

          return p.internal ? (
            <Link key={p.name} href={p.href} className={cardClass}>
              {inner}
            </Link>
          ) : (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
              {inner}
            </a>
          )
        })}
      </div>
    </section>
  )
}

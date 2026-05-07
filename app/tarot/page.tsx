import type { Metadata } from 'next'
import Link from 'next/link'
import TarotApp from '@/components/tarot/TarotApp'

export const metadata: Metadata = {
  title: 'Tarot — Thomas T. Tang III',
}

export default function TarotPage() {
  return (
    <div className="min-h-screen bg-[#09071a]">
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <Link
          href="/"
          className="text-sm text-slate-500 hover:text-cyan-400 transition-colors font-mono"
        >
          ← back to portfolio
        </Link>
      </div>
      <TarotApp />
    </div>
  )
}

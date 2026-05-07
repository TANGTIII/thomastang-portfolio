'use client'

import { useState } from 'react'
import TarotCard from './TarotCard'
import './tarot.css'

interface CardData {
  id: number
  name: string
  arcana: string
  suit: string | null
  uprightMeaning: string
  reversedMeaning: string
  isReversed: boolean
}

const SPREADS: Record<string, { label: string; count: number; positions: string[] }> = {
  single: {
    label: 'Single Card',
    count: 1,
    positions: ['Guidance'],
  },
  'three-card': {
    label: 'Past · Present · Future',
    count: 3,
    positions: ['Past', 'Present', 'Future'],
  },
  'five-card': {
    label: 'Five Card Cross',
    count: 5,
    positions: ['Situation', 'Challenge', 'Advice', 'Hidden Influence', 'Outcome'],
  },
  'celtic-cross': {
    label: 'Celtic Cross',
    count: 10,
    positions: ['Present', 'Challenge', 'Past', 'Future', 'Crown', 'Foundation', 'Self', 'Environment', 'Hopes & Fears', 'Outcome'],
  },
}

export default function TarotApp() {
  const [spreadKey, setSpreadKey] = useState('three-card')
  const [cards, setCards] = useState<CardData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [drawId, setDrawId] = useState(0)

  const drawCards = async () => {
    const { count } = SPREADS[spreadKey]
    setLoading(true)
    setError(null)
    setCards([])
    try {
      const res = await fetch(`/api/cards/draw?count=${count}`)
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const data = await res.json()
      setDrawId(d => d + 1)
      setCards(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleSpreadChange = (key: string) => {
    setSpreadKey(key)
    setCards([])
    setError(null)
  }

  return (
    <div className="tarot-app">
      <header className="tarot-header">
        <div className="moon-symbols">☽ ✦ ☾</div>
        <h1 className="tarot-title">Tarot</h1>
        <p className="tarot-subtitle">Draw the cards and discover your path</p>
      </header>

      <main>
        <div className="tarot-controls">
          <div className="spread-selector">
            {Object.entries(SPREADS).map(([key, { label, count }]) => (
              <button
                key={key}
                className={`spread-btn${spreadKey === key ? ' active' : ''}`}
                onClick={() => handleSpreadChange(key)}
              >
                <span className="spread-label">{label}</span>
                <span className="spread-count">{count} card{count !== 1 ? 's' : ''}</span>
              </button>
            ))}
          </div>
          <button className="draw-btn" onClick={drawCards} disabled={loading}>
            {loading ? 'Drawing…' : cards.length > 0 ? 'Draw Again' : 'Draw Cards'}
          </button>
        </div>

        {error && <p className="tarot-error">{error}</p>}

        {cards.length > 0 && (
          <div key={drawId} className={`card-grid count-${cards.length}`}>
            {cards.map((card, i) => (
              <TarotCard
                key={`${drawId}-${card.id}`}
                card={card}
                position={SPREADS[spreadKey].positions[i]}
                index={i}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

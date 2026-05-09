'use client'

import { useState } from 'react'
import TarotCard from './TarotCard'
import type { CardData } from './TarotCard'
import './tarot.css'

interface SpreadDef {
  label: string
  count: number
  positions: string[]
}

const SPREADS: Record<string, SpreadDef> = {
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

// Celtic Cross absolute positions [left, top] in px within a 732×1148 container.
// The cross section is vertically centered alongside the 4-card staff column.
// Index matches SPREADS['celtic-cross'].positions order.
const CELTIC_POSITIONS: Array<[number, number]> = [
  [176, 437],  // 0: Present      — cross center
  [176, 437],  // 1: Challenge    — crossing card (rotated 90°, same center)
  [0,   437],  // 2: Past         — cross left
  [352, 437],  // 3: Future       — cross right
  [176, 146],  // 4: Crown        — cross top
  [176, 728],  // 5: Foundation   — cross bottom
  [572, 873],  // 6: Self         — staff row 4 (bottom)
  [572, 582],  // 7: Environment  — staff row 3
  [572, 291],  // 8: Hopes & Fears — staff row 2
  [572, 0  ],  // 9: Outcome      — staff row 1 (top)
]

export default function TarotApp() {
  const [spreadKey, setSpreadKey] = useState('three-card')
  const [cards, setCards] = useState<CardData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [drawId, setDrawId] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const drawCards = async () => {
    const { count } = SPREADS[spreadKey]
    setLoading(true)
    setError(null)
    setCards([])
    setHoveredIndex(null)
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
    setHoveredIndex(null)
  }

  const isCelticCross = spreadKey === 'celtic-cross'
  const hoveredCard = hoveredIndex !== null ? cards[hoveredIndex] : null
  const hoveredPosition = hoveredIndex !== null ? SPREADS[spreadKey].positions[hoveredIndex] : null

  return (
    <div className="tarot-app">
      {/* Page-wide blur overlay */}
      {hoveredIndex !== null && (
        <div className="tarot-blur-overlay" />
      )}

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
          <>
            {isCelticCross ? (
              <div key={drawId} className="celtic-cross-container">
                {cards.map((card, i) => (
                  <div
                    key={`${drawId}-${card.id}`}
                    className="celtic-cross-slot"
                    style={{ left: CELTIC_POSITIONS[i][0], top: CELTIC_POSITIONS[i][1] }}
                  >
                    <TarotCard
                      card={card}
                      position={SPREADS['celtic-cross'].positions[i]}
                      index={i}
                      crossing={i === 1}
                      isHovered={hoveredIndex === i}
                      isAnyHovered={hoveredIndex !== null}
                      onHoverEnter={() => setHoveredIndex(i)}
                      onHoverLeave={() => setHoveredIndex(null)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div key={drawId} className={`card-grid count-${cards.length}`}>
                {cards.map((card, i) => (
                  <TarotCard
                    key={`${drawId}-${card.id}`}
                    card={card}
                    position={SPREADS[spreadKey].positions[i]}
                    index={i}
                    isHovered={hoveredIndex === i}
                    isAnyHovered={hoveredIndex !== null}
                    onHoverEnter={() => setHoveredIndex(i)}
                    onHoverLeave={() => setHoveredIndex(null)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Hover tooltip */}
      {hoveredIndex !== null && hoveredCard && hoveredPosition && (
        <div className="tarot-tooltip">
          <div className="tarot-tooltip-position">
            {isCelticCross && `Position ${hoveredIndex + 1} · `}{hoveredPosition}
          </div>
          <div className="tarot-tooltip-header">
            {hoveredCard.isReversed && <span className="tarot-tooltip-reversed">↓ Reversed</span>}
            <span className="tarot-tooltip-name">{hoveredCard.name}</span>
          </div>
          <div className="tarot-tooltip-meaning">
            {hoveredCard.isReversed ? hoveredCard.reversedMeaning : hoveredCard.uprightMeaning}
          </div>
        </div>
      )}
    </div>
  )
}

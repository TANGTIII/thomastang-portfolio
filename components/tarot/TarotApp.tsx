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

// Celtic Cross absolute positions [left, top] in px.
// Card-wrapper dimensions: 160px wide, ~304px tall (21px label + 8px gap + 275px card).
// Spacing is sized so labels never overlap adjacent cards.
const CELTIC_POSITIONS: Array<[number, number]> = [
  [195, 420],  // 0: Present       — cross center
  [195, 420],  // 1: Challenge     — same center, card rotated 90° via CSS
  [0,   420],  // 2: Past          — cross left  (40px gap from Present)
  [380, 420],  // 3: Future        — cross right (40px gap from Present)
  [195, 86 ],  // 4: Crown         — above Present (30px gap between Crown bottom & Present label)
  [195, 754],  // 5: Foundation    — below Present (30px gap between Present bottom & Foundation label)
  [610, 1030], // 6: Self          — staff row 4 (bottom)
  [610, 700],  // 7: Environment   — staff row 3
  [610, 370],  // 8: Hopes & Fears — staff row 2
  [610, 40 ],  // 9: Outcome       — staff row 1 (top, 40px from container top)
]

// Card-wrapper hit-box dimensions used by the container-level mouse tracker.
const CARD_W = 160
const CARD_H = 304   // label (~21px) + gap (~8px) + card-inner (275px)

// The Challenge card (index 1) is rotated 90°. Its visual hit region is a
// 275×160 rectangle centered on the same point as the Present card-inner center.
//   center-x = 195 + 80 = 275
//   center-y = 420 + 21 + 8 + 137.5 ≈ 587
const CHALLENGE_HIT = { left: 138, top: 507, right: 413, bottom: 667 }

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

  // Container-level mouse tracking for Celtic Cross.
  // Handles both the Present card and the rotated Challenge card cleanly,
  // since Challenge's visual hit area partially overlaps Present's slot.
  const handleCelticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Challenge visual hit region takes priority over the Present slot
    if (
      x >= CHALLENGE_HIT.left && x <= CHALLENGE_HIT.right &&
      y >= CHALLENGE_HIT.top  && y <= CHALLENGE_HIT.bottom
    ) {
      if (hoveredIndex !== 1) setHoveredIndex(1)
      return
    }

    for (let i = 0; i < cards.length; i++) {
      if (i === 1) continue  // Challenge handled above
      const [cx, cy] = CELTIC_POSITIONS[i]
      if (x >= cx && x <= cx + CARD_W && y >= cy && y <= cy + CARD_H) {
        if (hoveredIndex !== i) setHoveredIndex(i)
        return
      }
    }

    if (hoveredIndex !== null) setHoveredIndex(null)
  }

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
              <div
                key={drawId}
                className="celtic-cross-container"
                onMouseMove={handleCelticMove}
                onMouseLeave={() => setHoveredIndex(null)}
              >
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
                      hidePosLabel={i === 1}
                      isHovered={hoveredIndex === i}
                      isAnyHovered={hoveredIndex !== null}
                    />
                  </div>
                ))}

                {/* Challenge label rendered separately below its visual hit region */}
                {cards.length === 10 && (
                  <div className="celtic-challenge-label">
                    Challenge
                  </div>
                )}
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

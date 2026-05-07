'use client'

import { useState, useEffect } from 'react'

const SUIT_COLOR: Record<string, string> = {
  Wands:     '#d4821a',
  Cups:      '#3a8ec4',
  Swords:    '#9aaab4',
  Pentacles: '#4aab5a',
}

const SUIT_SYMBOL: Record<string, string> = {
  Wands:     '♦',
  Cups:      '♥',
  Swords:    '✦',
  Pentacles: '★',
}

interface CardData {
  id: number
  name: string
  arcana: string
  suit: string | null
  uprightMeaning: string
  reversedMeaning: string
  isReversed: boolean
}

export default function TarotCard({ card, position, index }: { card: CardData; position: string; index: number }) {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setFlipped(true), index * 180 + 250)
    return () => clearTimeout(id)
  }, [index])

  const accentColor = card.suit ? SUIT_COLOR[card.suit] : '#c9a227'
  const meaning = card.isReversed ? card.reversedMeaning : card.uprightMeaning

  return (
    <div className="card-wrapper">
      <p className="card-position-label">{position}</p>
      <div className={`card-inner${flipped ? ' flipped' : ''}`}>
        <div className="card-face card-back">
          <div className="card-back-fill">
            <span className="card-back-star">✦</span>
          </div>
        </div>
        <div className="card-face card-front" style={{ '--accent': accentColor } as React.CSSProperties}>
          <div className="card-header">
            <span className="card-arcana-tag">
              {card.arcana === 'Major'
                ? 'Major Arcana'
                : `${SUIT_SYMBOL[card.suit ?? ''] ?? ''} ${card.suit}`}
            </span>
          </div>
          <div className="card-name">{card.name}</div>
          {card.isReversed && <div className="card-reversed-tag">↓ Reversed</div>}
          <div className="card-divider" />
          <div className="card-meaning">{meaning}</div>
        </div>
      </div>
    </div>
  )
}

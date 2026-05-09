'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const SUIT_COLOR: Record<string, string> = {
  Wands:     '#d4821a',
  Cups:      '#3a8ec4',
  Swords:    '#9aaab4',
  Pentacles: '#4aab5a',
}

const MAJOR_IMAGE: Record<string, string> = {
  'The Fool':           'Arcana-TheFool',
  'The Magician':       'Arcana-TheMagician',
  'The High Priestess': 'Arcana-TheHighPriestess',
  'The Empress':        'Arcana-TheEmpress',
  'The Emperor':        'Arcana-TheEmperor',
  'The Hierophant':     'Arcana-TheHierophant',
  'The Lovers':         'Arcana-TheLovers',
  'The Chariot':        'Arcana-TheChariot',
  'Strength':           'Arcana-TheStrength',
  'The Hermit':         'Arcana-TheHermit',
  'Wheel of Fortune':   'Arcana-TheWheelOfFortune',
  'Justice':            'Arcana-TheJustice',
  'The Hanged Man':     'Arcana-TheHangedMan',
  'Death':              'Arcana-TheDeath',
  'Temperance':         'Arcana-TheTemperance',
  'The Devil':          'Arcana-TheDevil',
  'The Tower':          'Arcana-TheTower',
  'The Star':           'Arcana-TheStar',
  'The Moon':           'Arcana-TheMoon',
  'The Sun':            'Arcana-TheSun',
  'Judgement':          'Arcana-TheJudgement',
  'The World':          'Arcana-TheWorld',
}

const RANK_MAP: Record<string, string> = {
  Ace: '1', Two: '2', Three: '3', Four: '4', Five: '5',
  Six: '6', Seven: '7', Eight: '8', Nine: '9', Ten: '10',
  Page: 'Page', Knight: 'Knight', Queen: 'Queen', King: 'King',
}

function getCardImage(name: string, arcana: string, suit: string | null): string {
  if (arcana === 'Major') {
    return `/tarot/${MAJOR_IMAGE[name]}.jpg`
  }
  const rank = name.split(' of ')[0]
  return `/tarot/Minor-${suit}${RANK_MAP[rank]}.jpg`
}

export interface CardData {
  id: number
  name: string
  arcana: string
  suit: string | null
  uprightMeaning: string
  reversedMeaning: string
  isReversed: boolean
}

export default function TarotCard({
  card,
  position,
  index,
  crossing = false,
  isHovered = false,
  isAnyHovered = false,
  onHoverEnter,
  onHoverLeave,
}: {
  card: CardData
  position: string
  index: number
  crossing?: boolean
  isHovered?: boolean
  isAnyHovered?: boolean
  onHoverEnter?: () => void
  onHoverLeave?: () => void
}) {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setFlipped(true), index * 200 + 300)
    return () => clearTimeout(id)
  }, [index])

  const accentColor = card.suit ? SUIT_COLOR[card.suit] : '#c9a227'
  const meaning = card.isReversed ? card.reversedMeaning : card.uprightMeaning
  const imageSrc = getCardImage(card.name, card.arcana, card.suit)

  return (
    <div
      className="card-wrapper"
      style={{
        position: 'relative',
        zIndex: isHovered ? 50 : undefined,
        transform: isHovered ? 'scale(1.15)' : undefined,
        transformOrigin: 'center center',
        opacity: isAnyHovered && !isHovered ? 0.4 : 1,
        transition: 'transform 0.2s ease, opacity 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
    >
      <p className="card-position-label">{position}</p>

      <div className={`card-inner${flipped ? ' flipped' : ''}${crossing ? ' crossing' : ''}`}>

        {/* ── Back ── */}
        <div className="card-face card-back">
          <Image
            src="/tarot/back.jpg"
            alt="Card back"
            fill
            sizes="160px"
            className="card-back-img"
            priority={index === 0}
          />
        </div>

        {/* ── Front ── */}
        <div
          className="card-face card-front"
          style={{ '--accent': accentColor } as React.CSSProperties}
        >
          <div className={`card-art${card.isReversed ? ' reversed' : ''}`}>
            <Image
              src={imageSrc}
              alt={card.name}
              fill
              sizes="160px"
              className="card-art-img"
            />
          </div>

          <div className="card-overlay">
            {card.isReversed && <div className="card-reversed-tag">↓ Reversed</div>}
            <div className="card-name">{card.name}</div>
            <div className="card-meaning">{meaning}</div>
          </div>
        </div>

      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

const CARD_W = 70
const CARD_H = 110

interface TarotCard {
  id: number
  name: string
  numeral: string
  meaning: string
}

const CARDS: TarotCard[] = [
  { id: 0,  name: 'The Fool',           numeral: '0',     meaning: 'New beginnings, innocence, spontaneity, a free spirit. The Fool leaps into the unknown with pure trust and open-hearted joy. Represents adventure, idealism, and the courage to start fresh without knowing the outcome.' },
  { id: 1,  name: 'The Magician',       numeral: 'I',     meaning: 'Manifestation, resourcefulness, and inspired action. The Magician channels universal energy through focused will. All four elements — wands, cups, swords, pentacles — lie before him, awaiting direction.' },
  { id: 2,  name: 'The High Priestess', numeral: 'II',    meaning: 'Intuition, sacred knowledge, and the subconscious mind. She sits between the pillars of light and dark, guardian of hidden mysteries. Trust your inner voice and what cannot yet be seen.' },
  { id: 3,  name: 'The Empress',        numeral: 'III',   meaning: 'Femininity, beauty, nature, and nurturing abundance. The Empress is the great mother — creative, sensual, and fertile. Growth flourishes under her care; life itself is her gift.' },
  { id: 4,  name: 'The Emperor',        numeral: 'IV',    meaning: 'Authority, structure, stability, and fatherly leadership. The Emperor rules through reason and order. He establishes laws and protects his domain through disciplined power and determination.' },
  { id: 5,  name: 'The Hierophant',     numeral: 'V',     meaning: 'Spiritual wisdom, tradition, and group identity. The Hierophant bridges the earthly and divine, transmitting sacred teachings. Conformity and conventional approaches hold deep wisdom.' },
  { id: 6,  name: 'The Lovers',         numeral: 'VI',    meaning: 'Love, harmony, relationships, and values alignment. A profound choice stands before you. The union of opposites — heart and mind, self and other — asks you to choose authentically.' },
  { id: 7,  name: 'The Chariot',        numeral: 'VII',   meaning: 'Control, willpower, success, and determination. The Chariot surges forward, taming opposing forces through sheer focus. Victory comes to those who harness conflicting drives toward a single goal.' },
  { id: 8,  name: 'Strength',           numeral: 'VIII',  meaning: 'Courage, compassion, patience, and inner power. True strength is not brute force — it is the gentle mastery that calms the lion within. Persistence and love overcome where aggression fails.' },
  { id: 9,  name: 'The Hermit',         numeral: 'IX',    meaning: 'Soul-searching, introspection, solitude, and inner guidance. The Hermit retreats from the world to find the light within. This is the wisdom earned through the long, quiet journey inward.' },
  { id: 10, name: 'Wheel of Fortune',   numeral: 'X',     meaning: 'Good luck, karma, life cycles, and destiny. The wheel ever turns — what was down rises; what was up descends. Embrace the turning point; fate is already in motion.' },
  { id: 11, name: 'Justice',            numeral: 'XI',    meaning: 'Justice, fairness, truth, and cause and effect. The scales weigh every action without sentiment. What you have sown, you shall reap. Clarity, accountability, and impartial truth prevail.' },
  { id: 12, name: 'The Hanged Man',     numeral: 'XII',   meaning: 'Pause, surrender, letting go, and new perspectives. The Hanged Man suspends himself voluntarily, seeing the world upside-down. In stillness and sacrifice comes a revelation that cannot be forced.' },
  { id: 13, name: 'Death',              numeral: 'XIII',  meaning: 'Endings, transformation, transition, and release. Death is not finality — it is metamorphosis. Something must end before something new can be born. Welcome the necessary change.' },
  { id: 14, name: 'Temperance',         numeral: 'XIV',   meaning: 'Balance, moderation, patience, and higher purpose. Temperance blends and flows, pouring endlessly between vessels. The soul finds its calling in the alchemy of harmony and measured grace.' },
  { id: 15, name: 'The Devil',          numeral: 'XV',    meaning: 'Shadow self, attachment, addiction, and restriction. The chains you wear are looser than they appear — you could remove them. Examine what holds you in bondage and choose freedom.' },
  { id: 16, name: 'The Tower',          numeral: 'XVI',   meaning: 'Sudden change, upheaval, chaos, and revelation. Lightning strikes the false tower and it falls. What was built on unstable ground is swept away to make room for truth. Painful, but liberating.' },
  { id: 17, name: 'The Star',           numeral: 'XVII',  meaning: 'Hope, faith, purpose, renewal, and healing. After the storm comes the Star — pouring living waters, restoring what was lost. Trust in the universe; you are guided and not forgotten.' },
  { id: 18, name: 'The Moon',           numeral: 'XVIII', meaning: 'Illusion, fear, the subconscious, and anxiety. The Moon reveals shadows and stirs ancient fears. Not all is as it seems. Navigate the foggy path with caution and intuitive care.' },
  { id: 19, name: 'The Sun',            numeral: 'XIX',   meaning: 'Positivity, vitality, warmth, success, and joy. The Sun shines without reservation, bringing clarity and delight. You are seen, celebrated, and fully alive. Let yourself radiate.' },
  { id: 20, name: 'Judgement',          numeral: 'XX',    meaning: 'Reflection, reckoning, awakening, and absolution. A great trumpet calls you to rise and be assessed. Hear the higher calling within yourself and answer it fearlessly and honestly.' },
  { id: 21, name: 'The World',          numeral: 'XXI',   meaning: 'Completion, integration, accomplishment, and wholeness. The World dancer moves in the wreath of eternity — the cycle complete. You have arrived. Celebrate all you have become and all you have done.' },
]

const POSITIONS: Record<number, { label: string; description: string }> = {
  1:  { label: 'The Present',     description: 'Your current situation and the central issue at hand' },
  2:  { label: 'The Challenge',   description: 'What crosses or opposes you — the immediate obstacle or aid' },
  3:  { label: 'The Foundation',  description: 'The root or hidden basis underlying the situation' },
  4:  { label: 'The Recent Past', description: 'Influences and events that are now passing out of your life' },
  5:  { label: 'The Crown',       description: 'Your conscious goal, hope, or the best possible outcome' },
  6:  { label: 'Near Future',     description: 'What is coming — events about to enter your life' },
  7:  { label: 'Your Attitude',   description: 'How you perceive yourself and your role in this situation' },
  8:  { label: 'Ext. Forces',     description: 'How others see you; environment and outside influences' },
  9:  { label: 'Hopes & Fears',   description: 'Your innermost hopes and fears surrounding this matter' },
  10: { label: 'The Outcome',     description: 'The likely result if the current path continues unchanged' },
}

// [left, top, rotated?]
// Cross occupies 0–239px wide, 0–359px tall.
// Staff column starts at left=310, runs 0–485px tall (top to bottom = pos 10 down to 7).
const LAYOUT: Record<number, [number, number, boolean?]> = {
  5:  [85,  0],
  4:  [0,   125],
  1:  [85,  125],
  2:  [85,  125, true],   // crossing card — same center as pos 1, rotated 90°
  6:  [170, 125],
  3:  [85,  250],
  10: [310, 0],
  9:  [310, 125],
  8:  [310, 250],
  7:  [310, 375],
}

const POS_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function shuffleDeck(): TarotCard[] {
  return [...CARDS].sort(() => Math.random() - 0.5).slice(0, 10)
}

export default function TarotSection() {
  const [drawn, setDrawn] = useState<TarotCard[] | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  const draw = () => {
    setDrawn(shuffleDeck())
    setHovered(null)
  }

  const hoveredCard = hovered !== null && drawn ? drawn[hovered - 1] : null
  const hoveredPos  = hovered !== null ? POSITIONS[hovered] : null

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-8"
      style={{ background: 'linear-gradient(160deg, #0d0d1a 0%, #1a0a2e 60%, #0d0d1a 100%)' }}
    >
      {/* Page-wide blur overlay — renders behind hovered card */}
      {hovered !== null && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 40, backdropFilter: 'blur(6px)', backgroundColor: 'rgba(0,0,0,0.35)' }}
        />
      )}

      <h2 className="text-4xl font-bold tracking-widest mb-1" style={{ color: '#e8c97a' }}>
        Celtic Cross
      </h2>
      <p className="text-xs tracking-[0.3em] uppercase mb-10" style={{ color: '#9b72cf' }}>
        Tarot Reading
      </p>

      <button
        onClick={draw}
        className="mb-14 px-8 py-3 text-xs tracking-widest uppercase transition-all duration-200"
        style={{
          border: '1px solid #e8c97a',
          color: '#e8c97a',
          borderRadius: '2px',
          background: 'transparent',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = '#e8c97a'
          ;(e.currentTarget as HTMLButtonElement).style.color = '#0d0d1a'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
          ;(e.currentTarget as HTMLButtonElement).style.color = '#e8c97a'
        }}
      >
        {drawn ? 'Redraw Cards' : 'Draw Cards'}
      </button>

      {!drawn && (
        <p className="text-xs text-center max-w-xs opacity-40" style={{ color: '#c0a8e0' }}>
          Draw ten cards for a Celtic Cross reading. Hover each card to reveal its full meaning.
        </p>
      )}

      {drawn && (
        <>
          {/* Celtic Cross layout container */}
          <div className="relative" style={{ width: 380, height: 490 }}>
            {POS_ORDER.map((posId) => {
              const [left, top, rotate] = LAYOUT[posId]
              const card = drawn[posId - 1]
              const isHovered = hovered === posId

              const transforms: string[] = []
              if (rotate) transforms.push('rotate(90deg)')
              if (isHovered) transforms.push('scale(1.22)')
              const transformStr = transforms.length ? transforms.join(' ') : undefined

              return (
                <div
                  key={posId}
                  style={{
                    position: 'absolute',
                    left,
                    top,
                    width: CARD_W,
                    height: CARD_H,
                    transform: transformStr,
                    transformOrigin: 'center center',
                    zIndex: isHovered ? 50 : 30,
                    transition: 'transform 0.18s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHovered(posId)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '4px',
                      border: isHovered ? '1.5px solid #e8c97a' : '1px solid #5b3fa0',
                      background: 'linear-gradient(170deg, #1a0a2e 0%, #0f0a1e 100%)',
                      boxShadow: isHovered ? '0 0 18px 4px rgba(232,201,122,0.25)' : 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '5px 3px',
                      userSelect: 'none',
                      transition: 'border 0.18s ease, box-shadow 0.18s ease',
                    }}
                  >
                    {/* Top: position number */}
                    <span style={{ fontSize: '7px', color: '#9b72cf', letterSpacing: '0.05em' }}>
                      {posId}
                    </span>

                    {/* Center: Roman numeral */}
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: isHovered ? '#e8c97a' : '#c0a8e0',
                        transition: 'color 0.18s ease',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {card.numeral}
                    </span>

                    {/* Bottom: card name */}
                    <span
                      style={{
                        fontSize: '6.5px',
                        color: '#e2daf0',
                        textAlign: 'center',
                        lineHeight: 1.3,
                        paddingBottom: '1px',
                      }}
                    >
                      {card.name}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Position labels legend */}
          <p className="mt-6 text-xs opacity-40 tracking-wider" style={{ color: '#c0a8e0' }}>
            Hover a card to reveal its meaning
          </p>

          {/* Hover tooltip */}
          {hovered !== null && hoveredCard && hoveredPos && (
            <div
              className="fixed left-1/2 -translate-x-1/2"
              style={{
                bottom: '32px',
                zIndex: 50,
                width: '360px',
                background: '#100a20',
                border: '1px solid #e8c97a',
                borderRadius: '8px',
                padding: '20px 22px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
              }}
            >
              <div style={{ fontSize: '10px', color: '#e8c97a', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '3px' }}>
                Position {hovered} &middot; {hoveredPos.label}
              </div>
              <div style={{ fontSize: '11px', color: '#9b72cf', marginBottom: '14px' }}>
                {hoveredPos.description}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', color: '#9b72cf' }}>{hoveredCard.numeral}</span>
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#f0e6c8' }}>{hoveredCard.name}</span>
              </div>
              <div style={{ fontSize: '13px', color: '#c8bfe0', lineHeight: 1.65 }}>
                {hoveredCard.meaning}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  )
}

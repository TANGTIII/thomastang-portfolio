import { NextRequest, NextResponse } from 'next/server'

interface TarotCard {
  id: number
  name: string
  arcana: 'Major' | 'Minor'
  suit: string | null
  uprightMeaning: string
  reversedMeaning: string
  isReversed: boolean
}

function createDeck(): TarotCard[] {
  const cards: TarotCard[] = []
  let id = 0

  const major: [string, string, string][] = [
    ['The Fool',           'New beginnings, innocence, spontaneity',        'Recklessness, risk-taking, naivety'],
    ['The Magician',       'Willpower, resourcefulness, manifestation',      'Manipulation, poor planning, untapped potential'],
    ['The High Priestess', 'Intuition, mystery, inner knowledge',            'Secrets, disconnection from intuition'],
    ['The Empress',        'Fertility, abundance, nurturing',                'Dependence, smothering, creative block'],
    ['The Emperor',        'Authority, structure, stability',                'Domination, excessive control, rigidity'],
    ['The Hierophant',     'Tradition, conformity, spiritual guidance',      'Rebellion, subversiveness, restriction'],
    ['The Lovers',         'Love, union, alignment of values',               'Disharmony, imbalance, misaligned values'],
    ['The Chariot',        'Willpower, victory, assertion',                  'Lack of control, aggression, obstacles'],
    ['Strength',           'Courage, patience, inner strength',              'Self-doubt, weakness, insecurity'],
    ['The Hermit',         'Soul-searching, solitude, inner guidance',       'Isolation, loneliness, withdrawal'],
    ['Wheel of Fortune',   'Luck, cycles, turning point',                    'Bad luck, resistance to change, delays'],
    ['Justice',            'Fairness, truth, law and order',                 'Unfairness, dishonesty, bias'],
    ['The Hanged Man',     'Pause, new perspective, surrender',              'Stalling, needless sacrifice, resistance'],
    ['Death',              'Endings, transformation, new chapter',           'Resistance to change, stagnation, fear'],
    ['Temperance',         'Balance, moderation, patience',                  'Imbalance, excess, lack of harmony'],
    ['The Devil',          'Bondage, addiction, materialism',                'Breaking free, releasing chains, detachment'],
    ['The Tower',          'Sudden change, upheaval, revelation',            'Avoiding disaster, delaying the inevitable'],
    ['The Star',           'Hope, renewal, spirituality',                    'Lack of faith, despair, disconnection'],
    ['The Moon',           'Illusion, fear, the unconscious',                'Release of fear, clarity, facing shadows'],
    ['The Sun',            'Joy, success, vitality, positivity',             'Temporary sadness, blocked joy'],
    ['Judgement',          'Reflection, reckoning, self-evaluation',         'Inability to forgive, harsh self-judgment'],
    ['The World',          'Completion, integration, accomplishment',        'Incompletion, shortcuts, seeking closure'],
  ]

  for (const [name, up, rev] of major)
    cards.push({ id: id++, name, arcana: 'Major', suit: null, uprightMeaning: up, reversedMeaning: rev, isReversed: false })

  const suits: Record<string, [string, string, string][]> = {
    Wands: [
      ['Ace of Wands',    'Creative spark, new initiative, inspiration',       'Delays, blocks, lack of motivation'],
      ['Two of Wands',    'Future planning, discovery, personal power',         'Fear of unknown, lack of planning'],
      ['Three of Wands',  'Expansion, foresight, overseas opportunities',       'Playing small, delays, lack of foresight'],
      ['Four of Wands',   'Celebration, joy, harmony, homecoming',              'Instability, lack of foundation'],
      ['Five of Wands',   'Conflict, competition, disagreement',                'Avoiding conflict, releasing tension'],
      ['Six of Wands',    'Victory, success, public recognition',               'Egotism, disrepute, lack of confidence'],
      ['Seven of Wands',  'Perseverance, defending position, determination',    'Giving up, overwhelmed, wavering'],
      ['Eight of Wands',  'Speed, action, swift change, momentum',              'Delays, frustration, slowing down'],
      ['Nine of Wands',   'Resilience, persistence, final stretch',             'Exhaustion, fatigue, giving up'],
      ['Ten of Wands',    'Burden, extra responsibility, hard work',            'Doing it all alone, letting go, burnout'],
      ['Page of Wands',   'Free spirit, adventure, discovery',                  'Delays, self-limiting beliefs, immaturity'],
      ['Knight of Wands', 'Energy, passion, fearlessness',                      'Anger, impulsiveness, recklessness'],
      ['Queen of Wands',  'Courage, confidence, independence',                  'Selfishness, jealousy, demanding'],
      ['King of Wands',   'Natural leader, vision, entrepreneur',               'Impulsive, overbearing, arrogance'],
    ],
    Cups: [
      ['Ace of Cups',    'New love, emotional awakening, compassion',           'Blocked emotions, lost opportunity'],
      ['Two of Cups',    'Mutual attraction, partnership, connection',          'Imbalance, broken communication'],
      ['Three of Cups',  'Celebration, friendship, community',                  'Independence, overindulgence, gossip'],
      ['Four of Cups',   'Apathy, contemplation, re-evaluation',                'Renewed motivation, awareness, gratitude'],
      ['Five of Cups',   'Loss, grief, focusing on negatives',                  'Moving on, acceptance, forgiveness'],
      ['Six of Cups',    'Nostalgia, reunion, childhood innocence',             'Living in past, naivety, stuck'],
      ['Seven of Cups',  'Fantasy, illusion, wishful thinking',                 'Alignment, personal values, clarity'],
      ['Eight of Cups',  'Abandonment, walking away, withdrawal',               'Fear of change, avoidance, staying'],
      ['Nine of Cups',   'Contentment, satisfaction, wishes fulfilled',         'Dissatisfaction, materialism, greed'],
      ['Ten of Cups',    'Divine love, family bliss, harmony',                  'Broken family, disconnection, disharmony'],
      ['Page of Cups',   'Creative opportunity, intuition, curiosity',          'Emotional immaturity, escapism'],
      ['Knight of Cups', 'Romance, charm, following the heart',                 'Moodiness, jealousy, unrealistic'],
      ['Queen of Cups',  'Compassion, care, emotional security',                'Insecurity, dependence, martyrdom'],
      ['King of Cups',   'Emotional balance, compassion, diplomacy',            'Manipulation, moodiness, emotional volatility'],
    ],
    Swords: [
      ['Ace of Swords',    'New ideas, mental clarity, breakthrough',           'Confusion, chaos, misinformation'],
      ['Two of Swords',    'Difficult choices, stalemate, avoidance',           'Indecision, confusion, information overload'],
      ['Three of Swords',  'Heartbreak, grief, sorrow',                         'Recovery, forgiveness, moving on'],
      ['Four of Swords',   'Rest, recovery, contemplation',                     'Exhaustion, burnout, restlessness'],
      ['Five of Swords',   'Conflict, defeat, betrayal',                        'Reconciliation, regret, moving on'],
      ['Six of Swords',    'Transition, change, moving on',                     'Resistance to change, unfinished business'],
      ['Seven of Swords',  'Deception, strategy, trickery',                     'Confession, coming clean, rethinking'],
      ['Eight of Swords',  'Restriction, imprisonment, powerlessness',          'Freedom, release, new perspective'],
      ['Nine of Swords',   'Anxiety, worry, nightmares',                        'Inner turmoil, releasing worry, hope'],
      ['Ten of Swords',    'Endings, failure, crisis, betrayal',                'Survival, recovery, unavoidable end'],
      ['Page of Swords',   'Curious, restless, eager to learn',                 'All talk, deception, haste'],
      ['Knight of Swords', 'Ambitious, action-oriented, driven',                'Restless, unfocused, impulsive'],
      ['Queen of Swords',  'Clarity, independence, honest',                     'Coldness, cruelty, bitterness'],
      ['King of Swords',   'Mental clarity, authority, truth',                  'Manipulation, cruelty, abuse of power'],
    ],
    Pentacles: [
      ['Ace of Pentacles',    'New financial opportunity, manifestation',       'Lost opportunity, missed chances'],
      ['Two of Pentacles',    'Balance, adaptability, time management',         'Imbalance, disorganization, overwhelmed'],
      ['Three of Pentacles',  'Teamwork, collaboration, learning',              'Lack of teamwork, disorganization'],
      ['Four of Pentacles',   'Stability, security, conservatism',              'Materialism, possessiveness, letting go'],
      ['Five of Pentacles',   'Financial loss, poverty, hardship',              'Recovery, improvement, spiritual wealth'],
      ['Six of Pentacles',    'Generosity, charity, giving and receiving',      'Debt, selfishness, power imbalance'],
      ['Seven of Pentacles',  'Long-term investment, perseverance, patience',   'Impatience, lack of reward, no results'],
      ['Eight of Pentacles',  'Skill, diligence, craftsmanship',                'Perfectionism, lack of motivation, laziness'],
      ['Nine of Pentacles',   'Abundance, luxury, self-reliance',               'Financial setbacks, self-worth issues'],
      ['Ten of Pentacles',    'Wealth, legacy, family, stability',              'Financial failure, fleeting success'],
      ['Page of Pentacles',   'Manifestation, new beginnings, scholarship',     'Lack of progress, procrastination'],
      ['Knight of Pentacles', 'Efficiency, hard work, routine',                 'Laziness, boredom, stubbornness'],
      ['Queen of Pentacles',  'Nurturing, practical, comfortable abundance',    'Neglect, imbalance, financial insecurity'],
      ['King of Pentacles',   'Wealth, ambition, security, enterprise',         'Greedy, materialistic, indulgent'],
    ],
  }

  for (const [suit, suitCards] of Object.entries(suits))
    for (const [name, up, rev] of suitCards)
      cards.push({ id: id++, name, arcana: 'Minor', suit, uprightMeaning: up, reversedMeaning: rev, isReversed: false })

  return cards
}

const DECK = createDeck()

export async function GET(req: NextRequest) {
  const count = parseInt(req.nextUrl.searchParams.get('count') ?? '1', 10)
  if (isNaN(count) || count < 1 || count > 78)
    return NextResponse.json({ error: 'Count must be between 1 and 78.' }, { status: 400 })

  const shuffled = [...DECK].sort(() => Math.random() - 0.5).slice(0, count)
  const drawn = shuffled.map(c => ({ ...c, isReversed: Math.random() < 0.5 }))
  return NextResponse.json(drawn)
}

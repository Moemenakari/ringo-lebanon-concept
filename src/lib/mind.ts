/**
 * "Why are you so quiet? What's on your mind?" (Ringo's own story, turned into a game).
 * Three taps, and the head works out which Ringo you're thinking about. Pure scoring, so it's tested.
 */

export interface Choice {
  id: string;
  label: string;
  /** product id → points */
  points: Record<string, number>;
}

export interface Question {
  id: string;
  ask: string;
  choices: Choice[];
}

export const QUESTIONS: Question[] = [
  {
    id: 'where',
    ask: 'Where are you right now?',
    choices: [
      { id: 'recess', label: 'Recess, bell just rang', points: { peanut: 3, ketchup: 2, popcorn: 1 } },
      { id: 'gaming', label: 'Gaming night', points: { 'cheese-cocktail': 3, chilli: 2, barby: 1 } },
      { id: 'road', label: 'Road trip to the south', points: { crinkles: 3, 'paprika-rings': 2, 'salt-vinegar': 1 } },
      { id: 'study', label: 'Studying (pretending to)', points: { popcorn: 3, 'salt-vinegar': 2, peanut: 1 } },
    ],
  },
  {
    id: 'sidekick',
    ask: 'Pick a sidekick',
    choices: [
      { id: 'boxer', label: 'The boxer', points: { peanut: 4 } },
      { id: 'shark', label: 'The shark', points: { barby: 4 } },
      { id: 'tiger', label: 'The tiger', points: { 'salt-vinegar': 4 } },
      { id: 'croc', label: 'The crocodile', points: { 'cheese-cocktail': 4 } },
      { id: 'cat', label: 'The blue cat', points: { crinkles: 4 } },
      { id: 'kid', label: 'The ketchup kid', points: { ketchup: 4 } },
      { id: 'turtle', label: 'The turtle', points: { 'paprika-rings': 4 } },
      { id: 'corn', label: 'The corn', points: { popcorn: 4 } },
    ],
  },
  {
    id: 'taste',
    ask: 'How do you like it?',
    choices: [
      { id: 'salty', label: 'Salty & sharp', points: { 'salt-vinegar': 3, barby: 2, crinkles: 1 } },
      { id: 'cheesy', label: 'Cheesy', points: { 'cheese-cocktail': 3, crinkles: 1 } },
      { id: 'hot', label: 'Hot, dare me', points: { chilli: 4, 'paprika-rings': 2 } },
      { id: 'sweet', label: 'A bit sweet', points: { popcorn: 3, ketchup: 2, peanut: 2 } },
    ],
  },
];

/** Adds up the points for the chosen answers. Ties go to the earlier pack on the wheel. */
export function readMind(answers: Record<string, string>, order: string[]): string {
  const score = new Map(order.map((id) => [id, 0]));
  for (const q of QUESTIONS) {
    const choice = q.choices.find((c) => c.id === answers[q.id]);
    if (!choice) continue;
    for (const [id, pts] of Object.entries(choice.points)) score.set(id, (score.get(id) ?? 0) + pts);
  }
  let best = order[0];
  for (const id of order) if ((score.get(id) ?? 0) > (score.get(best) ?? 0)) best = id;
  return best;
}

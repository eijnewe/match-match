export const ALL_CATEGORIES = {
  13461733: {
    name: 'Premier League Clubs',
    stripPatterns: [' F.C.', ' FC'],
  },
  710421: {
    name: 'Cat breeds',
    stripPatterns: [' cat'],
  },
  37691805: {
    name: 'European Countries',
    stripPatterns: [' (country)'],
  },
  6202752: {
    name: 'Best Actress Academy Award winners',
    stripPatterns: [],
  },
  38559183: {
    name: 'Walt Disney Pictures films',
    stripPatterns: [],
  },
  12246605: {
    name: 'Swedish brands',
    stripPatterns: [],
  },
} as const satisfies Record<
  number,
  {
    name: string
    stripPatterns: readonly string[]
  }
>

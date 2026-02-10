export const ALL_CATEGORIES = {
  13461733: {
    name: 'Premier League Clubs',
    stripPatterns: [' F.C.', ' FC'],
  },
  710421: {
    name: 'Cat breeds',
    stripPatterns: [],
  },
  37691805: {
    name: 'European Countries',
    stripPatterns: [' (country)'],
  },
} as const satisfies Record<
  number,
  {
    name: string
    stripPatterns: readonly string[]
  }
>


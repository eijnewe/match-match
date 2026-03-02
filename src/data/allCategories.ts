export const ALL_CATEGORIES = {
  13461733: {
    name: 'Premier League Clubs',
    stripPatterns: [' F.C.', ' FC', ' A.F.C.'],
  },
  710421: {
    name: 'Cat breeds',
    stripPatterns: [' cat', ' Cat'],
  },
  37691805: {
    name: 'European Countries',
    stripPatterns: [' (country)'],
  },
  38559183: {
    name: 'Walt Disney Pictures films',
    stripPatterns: [/\s\([^()]*\)/]
  },
  12246605: {
    name: 'Swedish brands',
    stripPatterns: [/\s\([^()]*\)/]
  },
  39829191: {
    name: 'A Song of Ice and Fire Characters',
    stripPatterns: [/\s\([^()]*\)/]
  },
  1697307: {
    name: "Edged and Bladed Weapons",
    stripPatterns: [/\s\([^()]*\)/]
  },
  2507466: {
    name: "Abba Songs",
    stripPatterns: [/\s\([^()]*\)/]
  },
  53606176: {
    name: "Star Wars Locations",
    stripPatterns: [/\s\([^()]*\)/]
  },
  8718648: {
    name: "Films about Horses",
    stripPatterns: [/\s\([^()]*\)/]
  },
  34843437: {
    name: "Wedding Dress Designers",
    stripPatterns: [/\s\([^()]*\)/]
  },
  6002463: {
    name: "Best Picture Oscar Winners",
    stripPatterns: [/\s\([^()]*\)/]
  },
  3910913: {
    name: "American Talk Show Hosts",
    stripPatterns: [/\s\([^()]*\)/]
  },
  76097192: {
    name: "Supernatural Urban Legends",
    stripPatterns: [/\s\([^()]*\)/]
  },
  6769223: {
    name: "Edible Nuts and Seeds",
    stripPatterns: [/\s\([^()]*\)/]
  },
  2674250: {
    name: "Horse Colors",
    stripPatterns: [' horse', ' gene', /\s\([^()]*\)/]
  },
  35245756: {
    name: "Doctor Who episodes",
    stripPatterns: [/\s\([^()]*\)/]
  },
  8319540: {
    name: "Interjections",
    stripPatterns: [/\s\([^()]*\)/]
  },
  38327736: {
    name: "Biscuits",
    stripPatterns: [/\s\([^()]*\)/]
  },
  79388248: {
    name: "Netflix Stand-up Comedy Specials",
    stripPatterns: [/\s\([^()]*\)/]
  },
  6452254: {
    name: "JavaScript Libraries",
    stripPatterns: [/\s\([^()]*\)/]
  },
  11829358: {
    name: "Theatrical Occupations",
    stripPatterns: [/\s\([^()]*\)/]
  },
  3319679: {
    name: "Carsharing Companies",
    stripPatterns: [/\s\([^()]*\)/]
  },
  1117038: {
    name: "Fashion Magazines",
    stripPatterns: [/\s\([^()]*\)/]
  },
  695341: {
    name: "Chess Openings",
    stripPatterns: [/\s\([^()]*\)/]
  },
  1642774: {
    name: "Skateboarding Tricks",
    stripPatterns: [/\s\([^()]*\)/]
  },
  38596685: {
    name: "Fonts",
    stripPatterns: [/\s\([^()]*\)/, " fonts"]
  },
  750958: {
    name: "Hats",
    stripPatterns: [/\s\([^()]*\)/, " hat"]
  },
  9562608: {
    name: "Video Games made in 2000",
    stripPatterns: [/\s\([^()]*\)/]
  },
  12213826: {
    name: "Taylor Swift Songs",
    stripPatterns: [' (Taylor Swift song)', ' (song)', ' (Big Red Machine song)', ' (Luna Halo song)', ' (Gracie Abrams song)' ]
  },
  18236595: {
    name: "Apple Varieties",
    stripPatterns: [/\s\([^()]*\)/, ' apple', ' Apples', ' Apple', ' apples']
  }

} as const satisfies Record<
    number,
    {
      name: string
      stripPatterns: readonly (string | RegExp)[]
    }
  >

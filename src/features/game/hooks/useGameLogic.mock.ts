export function useGameLogicMock() {
  return {
    isLoading: false,

    data: {
      difficulty: 'medium',

      categories: [
        {
          id: 1,
          name: 'Frukt',
          words: ['äpple', 'päron', 'banan', 'kiwi'],
        },
        {
          id: 2,
          name: 'Djur',
          words: ['hund', 'katt', 'häst', 'fisk'],
        },
        {
          id: 3,
          name: 'Färger',
          words: ['röd', 'blå', 'grön', 'gul'],
        },
        {
          id: 4,
          name: 'Sport',
          words: ['fotboll', 'tennis', 'golf', 'hockey'],
        },
        {
          id: 5,
          name: 'Länder',
          words: ['Sverige', 'Norge', 'Danmark', 'Finland'],
        },
        {
          id: 6,
          name: 'Drycker',
          words: ['kaffe', 'te', 'juice', 'vatten'],
        },
      ],

      allWords: [
        'äpple',
        'päron',
        'banan och päronsallad bansndjnocjc',
        'kiwi',
        'hund',
        'katt',
        'häst',
        'fisk',
        'röd',
        'blå',
        'grön',
        'gul',
        'fotboll',
        'tennis',
        'golf',
        'hockey',
        'Sverige',
        'Norge',
        'Danmark',
        'Finland',
        'kaffe',
        'te',
        'juice',
        'vatten',
      ],
    },

    // Mockat spelstate
    selectedWords: ['äpple', 'päron'],
    solvedCategories: [1],
    pinnedCategories: ['Frukt', 'Drycker', 'Sport', 'Färger', 'Frukt', 'Drycker', 'Sport', 'Färger', 'Frukt', 'Drycker', 'Sport', 'Färger', 'Frukt', 'Drycker', 'Sport', 'Färger'],

    // Mockade actions
    addPinnedCategory: (name: string) => console.log('add pinned:', name),
    removePinnedCategory: (name: string) => console.log('remove pinned:', name),
    selectWord: (word: string) => console.log('select word:', word),

    isGameWon: false,
  }
}

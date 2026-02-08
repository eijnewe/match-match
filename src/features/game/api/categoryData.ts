type Category = {
  title: string
  searchterm: string
}

export const Categories: Category[] = [
  {
    title: "A Song of Ice and Fire Characters",
    searchterm: "A Song of Ice and Fire character redirects to lists"
  },
  {
    title: "Edged & Bladed Weapons",
    searchterm: "Edged and bladed weapons"
  },
  {
    title: "ABBA Song Titles",
    searchterm: "ABBA songs"
  },
  {
    title: "Star Wars Locations",
    searchterm: "Star Wars location redirects"
  },
  {
    title: "Wedding Dress Designers",
    searchterm: "Wedding dress designers"
  },
  {
    title: "Films about Horses",
    searchterm: "Films about horses"
  },
  {
    title: "Best Picture Oscar Winners",
    searchterm: "Best Picture Academy Award winners"
  },
  {
    title: "American Talk Show Hosts",
    searchterm: "American television talk show hosts"
  },
  {
    title: "Urban Legends",
    searchterm: "Supernatural urban legends"
  },
  {
    title: "Doctor Who Episode Titles",
    searchterm: "Doctor Who episode redirects to lists"
  },
  {
    title: "Nuts",
    searchterm: "Edible nuts and seeds"
  },
  {
    title: "Horse Colors",
    searchterm: "Horse coat colors"
  },
  {
    title: "Interjections",
    searchterm: "Interjections"
  },
  {
    title: "Biscuits",
    searchterm: "Biscuits"
  },
  {
    title: "Cat Breeds",
    searchterm: "Cat breeds"
  },
  {
    title: "Netflix Stand-up Comedy Specials",
    searchterm: "Netflix stand-up comedy specials"
  }
]

// In an article title string, exclude everything after a starting "("
// Do not include any articles starting with "List"
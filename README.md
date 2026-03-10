# MATCH-MATCH Game by WARJ
## Project Structure
### Planning Stage
During the planning stage, we got together to brain storm about what kind of app we would like to build. During this session, we also had to take into account what we believed we could achieve in the four weeks we had at our disposal. 

![Brain Storm Board](/public/ReadMeImg%20(6).png)

We quickly agreed on building a "mega connections"; a game of assigning words to categories without knowing the categories beforehand. We were inspired by the [NYT's Connections](https://www.nytimes.com/games/connections), as well as [Thomas Colthurst's 2025 Game](https://thomaswc.com/2025.html), and had ideas on how to improve on them both.

![Inspiration Board](/public/ReadMeImg%20(3).png)

Our main improvement was the mobile aspect of it- Thomas' game was very hard to navigate on a small screen, with a lot of scrolling. It was also lacking the color and design that we enjoyed in Connections. We imagined colour customization that could make it easier for the user to keep track of the categories, as well as pinning all the categories in a banner, rather than have them spread out across the board.  

We continued by establishing what API to use: we didn't want to create up to 900 custom articles and categories ourselves. We settled on using Wikipedia, which contains a wide array of categories that suited our game. We also sat down to discuss the functionality of the game: how  the user would actually be playing.

![Trello Board](/public/ReadMeImg%20(2).png)

After this session, we started planning our sprints and created a Trello board to track our tickets and progress.

![Sprint Planning](/public/ReadMeImg%20(5).png)
![Trello Board](/public/ReadMeImg%20(4).png)

When we had broken down the project in manageable pieces and created the relevant tickets, we started making wireframes to give ourselves a clearer idea of what we were building.

![Wireframes](/public/ReadMeImg%20(1).png)

## Project Accessibility 
### Styling
We implemented styling and colors with contrast in mind to make sure the text was legible, both in light and dark modes. We followed standard font sizing to ensure no text got too small.
### WAI-ARIA & HTML 
We have added WAI-ARIA labels on our custom focusable elements so they work with screen readers. For native components and elements we have used HTML attributes with clear descriptions. 
### Other a11y
The app is available on both desktop and mobile screens; tooltips with crucial information on desktop have been converted to pop-ups (shadcn drawer components) on mobile so that the information is still available. In one place the tooltips were instead changed into a small badge with minimal information that, when pressed, would open a drawer with further info.
We have made sure the app also is able to be navigated through and the game playable with keyboard only. 
Labels, forms and input have been clearly labelled. 

## Game Functionality
Before a new game, the user gets to choose difficulty: this reflects the number of categories on the game board. All categories will have as many matching articles as there are categories: a choice of 5 categories will generate a total of 25 articles on the board. The maximum amount of 30 categories will generate 900 articles. The user will also have the option to choose a custom amount of categories.
At the start of a new game, the game board will show all the article cards.

### Category Cards
 In the category bar, an empty category card and a "+" card will show. If the empty category card has been assigned at least one article, then clicking the "+" will create a new empty category card. Only as many category cards as there are categories can be created.
 Category cards will have a generic placeholder name, but the titles can be edited by the user. The user will not know a category's title until they have assigned it all its correct article cards.

The "+" category will always be to the furthest right in the category bar. It will disappear when all category cards have been created.

When a category has been completed, its title will be shown, its opacity will increase, and it will be fixed at the end of the category bar. The completed category card will not have any possible interactions other than viewing the full list of articles.

#### Interactions
- During gameplay, toggling Editing Mode will let the user edit the color and title of the category cards.
- On hover, the Category Card will show a full list of all the articles it contains, as well as a counter, such as 12/20 cards. On mobile this will be shown as a badge of the total of cards, and upon a tap, the full list will show in a drawer.
- On click, a Category Card will be selected; after this any article cards can be selected to match them with the category. The category will remain selected until the user deselects it or makes a mistake.

### Word/Article Cards
To pair an article with a category, the user must first click the article, then select a category card.
If there already are articles in the category card and they do not match the selected article, the user will get an error and the article card will be deselected. The category card has a short change in appearance to display that an error occurred.

If an article is selected and then attempted to be put in an empty category card, but the article's category already has been started in another card, the game will react as if the user tried to put the article in the wrong card. 

When an article is added to an empty card or to its correct category card, the user will get points and the article card will disappear.
The article's title will be added to the list of the category card, which can be viewed upon hover.

#### Interactions
- A Word Card can be selected to be assigned to a category card.

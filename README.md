# MATCH-MATCH Game by WARJ
## Project Structure
### Planning Stage
During the planning stage, we got together to brain storm about what kind of app we would like to build. During this session, we also had to take into account what we believed we could achieve in the four weeks we had to our disposal. 
We quickly agreed on building a "mega connections"; a game of assigning words to categories without knowing the categories beforehand. We were inspired by the [NYT's Connections](https://www.nytimes.com/games/connections), as well as [Thomas Colthurst's 2025 Game](https://thomaswc.com/2025.html), and had ideas on how to improve on them both.


## Project Accessibility 

## Game Functionality
Before a new game, the user gets to choose difficulty: this reflects the number of categories and articles belonging to each category. For example, 10 will generate 10 categories with 10 articles each.
At the start of a new game, the game board will show all the article cards.

### Category Cards
 In the category bar, an empty category card and a "+" card will show. If the empty category card has been assigned at least one article, then clicking the "+" will create a new empty category card. Only as many category cards as there are categories can be created.
 Category cards will have a generic placeholder name, but the titles can be edited by the user. The user will not know the categories until they have been assigned all their article cards.

The "+" category will always be to the furthest right in the category bar. It will disappear when all category cards have been created.

When a category has been completed, its title will be shown, its opacity will increase, and it will be fixed at the end of the category bar. The completed category card will not have any possible interactions other than viewing the full list of articles.

The "+" card will always be furthest right, even if there are completed category cards.

#### Interactions
- During gameplay, toggling Editing Mode will let the user edit the color and title of the category cards.
- On hover, the Category Card will show a full list of all the articles it contains, as well as a counter, such as 12/20 cards.
- On click, a Category Card will be selected; after this any article cards can be selected to match them with the category. The category will remain selected until the user deselects it.

### Word/Article Cards
To pair an article with a category, the user must first click the article, then select a category card.
If there already are articles in the category card and they do not match the selected article, the user will get an error and the article card will be deselected. The category card will have a short change in appearance to display that an error occurred.

If an article is selected and then attempted to be put in an empty category card, but the article's category already has been started in another card, the game will react as if the user tried to put the article in the wrong card. 

When an article is added to an empty card or to its correct category card, the user will get points and the article card will disappear.
The article's title will be added to the list of the category card, which can be viewed upon hover.

#### Interactions
- A Word Card can be selected to be assigned to a category card.

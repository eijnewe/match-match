# React + TypeScript + Vite + shadcn/ui

MATCH-MATCH Game by WARJ

# Game Functionality
Before a new game, the user gets to choose difficulty: this reflects the number of categories and articles belonging to each category. For example, 10 will generate 10 categories with 10 words in each.

At the start of a new game, the game board will show all the article cards.
## Categories
 In the category bar, an empty category card and a "+" card will show. Clicking the "+" will create a new empty category card. Only as many category cards as there are categories can be created.
 Category cards will have a generic placeholder name, but the titles can be edited by the user. 

The "+" category will always be to the furthest right in the category bar. It will disappear when all category cards have been created.

When a category has been completed, its title will be shown, its opacity will increase, and it will be fixed at the end of the category bar. The completed category card will not have any possible interactions other than viewing the full list of articles.

The "+" card will always be furthest right, even if there are completed category cards.

### Interactions
- Upon hover, a Category Card will show a full list of all the articles it contains, as well as a counter, such as 12/20 cards.
- On click, a Category Card will show a tooltip including a color changer where the user can change its color, as well as a line to change the name of the category.  
- See optional functionality below

## Words/Articles
To pair an article with a category, the user must first click the article, then select a category card.
If there already are articles in the category card and they do not match the selected article, the user will get an error and both the category and the article will be deselected. The category card will have a short change in appearance to display that an error occurred.

If an article is selected and then attempted to be put in an empty category card, but the article's category already has been started in another card, the game will react as if the user tried to put the article in the wrong card. 

When an article is added to an empty card or to its correct category card the user will get points and the article card will disappear.
The article's title will be added to the list of the category card, which can be viewed upon hover. With this list is also the category card's own counter, which will show how many articles have been collected out of the total.

### Interactions
- A Word Card can be selected to then be assigned to a category card.

## Optional functionality
If a category card is selected first, an article card can then be selected to be added to it. No matter if the article is correct or not, the category will remain selected and further articles can be selected to be matched. 

If this is implemented, we then have three actions that need to be handled by interactions with the category card:
1. Select the card for gameplay to be able to pair with articles
2. View the full list of articles already in the category, as well as the counter of articles
3. Edit the card's name and color.
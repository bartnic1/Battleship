# Battleship Project (v1.0.0)

Battleship is a mostly client-side web application that allows users to play a game of battleship against the computer. The project aims to reinforce an understanding on how to manage server requests through AJAX (without having to reload the page), as well as how to manipulate the DOM using jQuery.

## Final Product

### Starting a Game of Battleship:
!["A game of Battleship"](https://github.com/bartnic1/tweeter/blob/master/loggedin.png)

### Winning a Game:
!["A won game"](https://github.com/bartnic1/tweeter/blob/master/loggedin.png)

### The Leaderboard:
!["The Leaderboard"](https://github.com/bartnic1/tweeter/blob/master/loggedout.png)

## Dependencies

- Express
- Node 5.10.x or above
- Body-parser
- Method-override
- Path

## Dev-dependencies

- Eslint
- Eslint-config-lighthouselabs
- nodemon

## Getting Started

1. From the terminal, clone a copy of this repository into a directory (i.e. git clone git@github.com:bartnic1/Battleship.git battleship)
2. Install all dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Navigate to <http://localhost:8080/> in your browser.
5. Enter a new user ID (if not entered, you won't be able to see any of your win/loss stats)
6. Press the "New Game" button. All of the relevant gameplay instructions are listed on a notifications panel placed on the left-hand side of the screen
7. Once your game is complete, you may navigate back to the home page (press quit) to see updates on the leaderboard.


## Useful Features

- Allows users to compare their scores against others to see who has the greatest battleship skills.
- A battle log maintains a constant feed of whether a player's shot hit, missed, sunk a ship, or won the game.
- Dynamic graphics allows the player to see whose turn it is, as well as to view changes in the state of the ships as they are sunk.
- Users are given complete freedom to place and replace their own ships on the board during the startup phase of the game.
- The notifications panel guides users along each step of the way, from the start of the game until victory or defeat.


## Future Additions

- I really want to improve on the AI so that it intelligently clusters shots after it hits a ship, but for now I am happy that the basic functionality exists.
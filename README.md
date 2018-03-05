# Battleship Project (v1.0.0)

Battleship is a mostly client-side web application that allows users to play a game of battleship against the computer. The project aims to reinforce an understanding on how to manage server requests through AJAX (without having to reload the page), as well as how to manipulate the DOM using jQuery.

## Final Product

### Starting a Game of Battleship:
!["A game of Battleship"](https://github.com/bartnic1/Battleship/blob/master/Battleship.png)

### Winning a Game:
!["A won game"](https://github.com/bartnic1/Battleship/blob/master/Victory.png)

### The Leaderboard:
!["The Leaderboard"](https://github.com/bartnic1/Battleship/blob/master/Leaderboard.png)

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
6. Press the "New Game" button. All of the relevant gameplay instructions are listed on a notifications panel placed on the left-hand side of the screen.
7. Once your game is complete, you may navigate back to the home page (press quit) to see updates on the leaderboard.

## Detailed Gameplay Instructions

- Players will play on the left-most board, while the computer AI will use the right-most board.
- First, select ships on the bottom of your board - you will know they are selected when they are greyed out.
- Then, left-click on the board to outline the shape of the ship you wish to place. Details on this are provided in the notifications panel. Once finished, press "d" and the computer will ensure that the dimension are correct.
- If the user wishes to change placement, simply click the relevant ship pane again and it will reset placement.
- Once all ships have been placed, press the "New Game" button. The user will be prompted to roll a twelve-sided die; whoever scores higher goes first.
- Each turn will be shown by the fact that the Player or Opponent name will be illuminated. When its the player's turn, he/she should select a square to shoot (this will light up as a yellow marker). When ready, either press the "Fire" button or hit "f" on the keyboard.
- Hits are shown as black spots, while misses are white. This is also reinforced in the battle log on the lower left hand side of the screen.
- Once a ship is sunk, it will visibly show that it has been destroyed on the lower ship pane. Once all of a player's ships are sunk, the remaining player wins.


## Useful Features

- Allows users to compare their scores against others to see who has the greatest battleship skills.
- A battle log maintains a constant feed of whether a player's shot hit, missed, sunk a ship, or won the game.
- Dynamic graphics allows the player to see whose turn it is, as well as to view changes in the state of the ships as they are sunk.
- Users are given complete freedom to place and replace their own ships on the board during the startup phase of the game.
- The notifications panel guides users along each step of the way, from the start of the game until victory or defeat.


## Future Additions

- I really want to improve on the AI so that it intelligently clusters shots after it hits a ship, but for now I am happy that the basic functionality exists.
- For now, the AI makes guesses by choosing random numbers from 1 to 10 on each move.

## Resources Used

- MDN guide on grids: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout
- How to use google fonts: https://www.w3schools.com/howto/howto_google_fonts.asp
- Hosting google fonts locally: http://www.thephphero.com/how-to-host-google-fonts-locally/
- Wire-frame drawings and archive images of battleships and other naval vessels were taken from Wikipedia commons. Example: https://en.wikipedia.org/wiki/Japanese_battleship_Kong%C5%8D
- The overflow property for scrolling windows (battle log): https://www.w3schools.com/cssref/pr_pos_overflow.asp
- A very cool neon glow effect: https://codepen.io/FelixRilling/pen/qzfoc?editors=1100
- How to use keyframe animations: https://www.w3schools.com/cssref/css3_pr_animation-keyframes.asp
- The timeout method for simulating server "thinking": https://www.w3schools.com/jsref/met_win_settimeout.asp
- A UI that shows users how to use CSS' background-image property: https://www.w3schools.com/cssref/playit.asp?filename=playcss_background-size&preval=contain
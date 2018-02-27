General Plan:

-Need two grids; one for each player. Also need title, and number of ships destroyed on the side.

Using ejs loops, can fill up board with css grid elements that are all the same size, but each with a specific ID.
This ID will have an x and y coordinate.

Each ship will be associated with a particular series of IDs. It should be possible to split an image of a ship into multiple pieces, and combine them across grids.
Once one part is hit, the colour can change.

GENERAL LAYOUT OF PAGES:

Splash Page:
- New game button (links to placement board)
- Leaderboard button
- Login form, submit button
- STRETCH: Set number of ships, shots per turn, board size

Placement Board:
- Should show two boards: Player board, initially empty
			                    Opponent board, initially empty
- Show ships available for placement along bottom of screen
- Can drag and drop or define placement by clicking on grid
- Some mechanism to decide who goes first
- Start game button once ships placed (links to Main Board)
--> Will log to screen that one must place all ships before user can start
--> Can include back to main menu button

Main Board:
- Player board has ships, and shows shots from opponent
- Opponent board shows shots taken by player

- Can create a legend, indicating colour of hits and misses (red, white). Located on right end.
- Coordinates along boundary of each board (A-J, 1-10)
- Marker indicates who's turn it is. Located on left end
- List of ships for each player. Located along bottom, in separate grid.
- Log of shots taken, message when ship sunk. Located on the bottom left.

- Can include main menu button on left hand side.
- When player/opponent has won, player should be redirected to main menu.

Leaderboard:
- Lists number of wins and losses per player against computer
- Links back to main menu
=============================================

Qs:
Is it okay to use ejs to create our web page?
YES

Readme markdown; anything special required? (beyond embedded screenshots, bold titles, bullet points or numbered lists)
#Pound for headings, nothing special beyond that

Log of shots and messages: Ideally this would be shown on the webpage (not console log)?
Web page history of shots.

Use static images.
Spend up to an hour trying to figuring out hard problems.

Good to consider: What is the flow between pages for server side.

===============================================

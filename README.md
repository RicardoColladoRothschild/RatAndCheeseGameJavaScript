# Game Rat and Cheese game
A video game develop with JavaScript
For this simple video game i put in practice knowledge that i have using simple frontend.
I develop the game using a canvas un html, and modify it state throught javascript.

## Player Position
The player position is given by coordanates X and Y. 
I modified its value depending on:
* Key strokes
* Game win
* Game lose
* Reach enemy (there are no enemy in the game directly, but if the player crash against the poison it will be restart).

## How do i restart the player position:
There are several implementations that i do, but the main focus is, i take the position base on the "door" which is an emoji that literaly represent a door, 
wherever this door is located at (positon x and y too) its where i need to move the player back to when restart.

## Record
Record is given using the setTimeout and setInterval, to save player amount of time use to complete the game. 


### Prior record
I save the record the player for the first time, from there, every time the player end the game i save the information and compare to the current saved. 
It is saved using local storage. This way, when a player end i can comparare prior record, even if the browser was close at any point. 

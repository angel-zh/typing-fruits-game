# Typing Fruits Game

## OVERVIEW

This is an educational, kid-friendly game that aims to teach kids to identify and spell various fruits while honing their typing skills! There are two difficulty levels in the game - normal and hard. The latter difficulty is for those who are up for a challenge.
The idea was inspired by my background in education merged with my passion for drawing/digital illustration. 

### Technology
- HTML5
- CSS
- JavaScript


## USER STORIES

### Part I - Type type type!
```
As a user, I want the ability to...
- view the instructions/rules of the game
- select the level of difficulty
- start the game when I'm ready to play
- see the timer/countdown
- type the prompt shown on the screen with my keyboard
- advance to the next level after successful match
- see the "game over" screen
- see the fruit(image) that I've collected after each level
- advance to Part II (Bonus Level) of the game once I clear all levels in Part I
```

### Part II Bonus Level - Match match match!
```
As a user I want the ability to...
- start the Bonus Level of the game after beating Part I
- click on start when I am ready
- see the prompt and click the matching fruit image 
- advance to the next prompt after successful match
- reach the end of the game
- restart to play again
```

## Wireframes/Screenshots

![game1](https://share.balsamiq.com/c/5a5pXxqzkzkqitd3J6eTag.png)
![game2](https://share.balsamiq.com/c/erDWEdv5DckfHeAJjBCRTy.png)
![game3](https://share.balsamiq.com/c/5nUPW57UoTfPC1LdjtiuVm.png)
![game4](https://share.balsamiq.com/c/gzZesSHA1TAeKkRmckNwbG.png)
![game5](https://share.balsamiq.com/c/trqy7ALhj8axFHPT5AKFYv.png)
![game6](https://share.balsamiq.com/c/6oojEn9bHx3nctVyMXhGYM.png)
![game7](https://share.balsamiq.com/c/wiGAKKEZAv2DRTw9eDapj9.png)
![game8](https://share.balsamiq.com/c/r4uwdqGxjAKKHirRvj1hsw.png)
![game9](https://share.balsamiq.com/c/77UJUVyNzkhcfUhairARah.png)
![game10](https://share.balsamiq.com/c/afneW1LJ9zu9jQ4eWW74Xj.png)
![game11](https://share.balsamiq.com/c/p9Kn9ynqcdXduDqE5mUSBa.png)
  

## Entity Relationship

This game incorporates the use of text inputs (strings) and mouse click events to navigate through the levels. There are two pre-determined arrays of prompts, which also serve as a check for winning conditions, for two levels of difficulty respectively. An object will be used to store all word-image key-value pairs.

### Functions
```
- displayPrompts - displays prompts in randomized non-repeating order
- compareInput - checks user input against prompt
- countdown - sets the timer for each input
- handleClickedImg - handles mouse clicks to determine a match (word-image)
- resetGame - resets game to initial state
- initGame - holds logic of game and invokes functions to run game
```

### Schedule for Project Week
I will start off with a simple HTML boilerplate, making sure my css and JS files are linked. In addition, I will set a basic layout with element tags (i.e. headers, divs, footer, etc.) and assign some relevant Ids and classes. 

Then, I'll move onto my JS pseudocoding, create my prompts needed for the game, define my variables, get my HTML elements (DOM), and get onto writing my functions for my game logic. 

Lastly, I'll use CSS to style my game to make it visually appealing.

## Credits
Wireframes were created using [Balsamiq Cloud](https://balsamiq.com/wireframes/cloud/).
All other images in the game were digitally drawn by me.
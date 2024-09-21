# New Empire
New Empire is a strategy game where players and AI-controlled enemies build cities, manage resources, and grow their armies. The AI will dynamically adjust its resource allocation based on its needs, and both players and enemies compete for dominance by expanding their empires.

![image](https://github.com/user-attachments/assets/372c8a61-67c4-462e-8771-da62fad69d76)

## Files
- index.html
- main.js
- enemycontroller.js
- style.css
## Game Mechanics
### Installation
Clone or download the repository.
Open index.html in your browser to launch the game.
## How to Play
The objective of the game is to build your empire by managing resources such as wood, stone, metal, glass, gold, and population. You will compete against AI-controlled enemies that also manage their own cities and resources.

![image](https://github.com/user-attachments/assets/09c4864a-0f0e-44ce-8893-93b6dabe8d32)



You start by controlling cities, workers, and armies.
Resources are gathered and used to expand your empire by building more cities.
The enemy AI builds cities when it has sufficient resources, and manages both workers and armies dynamically.

## Key functions:

initializeGame(): Sets up the initial game state, including player resources and the game board.
buildCity(): Allows players to build cities if they have enough resources. Updates the board and resource counts accordingly.
gameLoop(): Continuously updates the game state and calls the enemyAction() function to manage the enemy's moves.

## Key features:

- enemyInit(): Initializes enemy resources.
- calculateWeights(): Adjusts the AI's priorities between military and worker allocation.
- enemyAction(): Makes decisions for the AI to increase resources or build cities based on weights.
- buildEnemyCity(): If the AI has enough resources, it attempts to build a city on an available tile.
  
## Game Mechanics
- Resource Management: Both players and AI collect resources such as wood, stone, and metal to build cities and grow armies. Each resource increases over time.
- newempire.netlify.app
- City Building: When enough resources are gathered, players and the AI can build new cities, expanding their empire.
- AI Dynamics: The AI opponent manages resources dynamically, adjusting priorities between military strength and worker management, ensuring a balanced and challenging gameplay experience.
- Game Grid: The game takes place on a 10x10 grid. Cities are represented visually on the grid, with colors indicating player or enemy control.
  
### The game is not finished but it is in development
- newempire.netlify.app

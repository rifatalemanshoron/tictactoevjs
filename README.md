This whole project was learned from "Techy Web Dev" youtube channel
Some fixed were made by me(Shoron)
Video link: https://www.youtube.com/watch?v=LpSvzaPsnVI

__________________________________________________________________________________________________________________________________________________
# Tic Tac Toe with WebSocket Connection 🎮🕹️

Welcome to the **Tic Tac Toe with WebSocket Connection** project! This repository is a refined implementation of a basic Tic Tac Toe game, 
featuring improved game logic and data communication through WebSockets. 
This project addresses several key issues found in the original youtube video and includes some cool additional features.

## Table of Contents
- [Features](#features-✨)
- [Bug Fixes](#bug-fixes-🔧🐞)
- [Installation](#installation-💻)
- [Usage](#usage-📖)
- [Contributing](#contributing-🤝)
- [License](#license-📜)

## Features ✨

- **Turn-Based Button Disable**: Players can only make a move when it is their turn.
- **Efficient Player Pairing**: Players are paired based on socket IDs rather than names, preventing name collision issues.
- **Opponent Disconnection Alert**: If an opponent gets disconnected, a message alerts the player and instructs them to refresh the page.
- **Memory Efficiency**: Disconnected player pairs are removed from the active player array to optimize memory usage.

## Bug Fixes 🔧🐞

### Turn Handling Issue
- **Issue**: When it's X's turn, the O player could also make a move, breaking the game.
- **Fix**: Added a button disable feature to ensure only the current player can make a move.

### Inefficient Data Emission
- **Issue**: Emitting the entire active players array on each move caused inefficiency and scaling issues.
- **Fix**: Store active players as playing pairs and emit only the relevant pair on each move.

### Name Collision Issue
- **Issue**: The game failed if players in different pairs or the same pair had the same name.
- **Fix**: Implemented a socket ID-based pairing system instead of name-based pairing.

### Disconnection Handling
- **Issue**: Disconnected players remained in the active player array, causing issues if they reconnected with the same name.
- **Fix**: Added socket disconnection and player cleanup functionality.
_____________________________________________________________________________________________________________________________________________

## Usage 📖
Open your browser and navigate to http://localhost:8000.
Enter your name and click the "Search for player" button.
Wait to be paired with another player.
Enjoy the game!
Contributing 🤝
We welcome contributions to enhance the game! If you have any suggestions, feel free to open an issue or create a pull request.

## License 📜
There is no Lisense of this project whole credit goes to "Techy Web Dev" youtube channel

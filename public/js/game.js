// Copyright (c) 2023 Algorealm, Inc.

window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(qsa('.game-tile'));
    const playerDisplay = qs('.game-player');
    const playerIndicator = qs('.player-indicator');
    const announcer = qs('.game-verdict');
    const gameVerdict = qs(".game-verdict-text");
    const gameTrials = qs(".game-trials");

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes(''))
            announce(TIE);
    }

    const announce = (type) => {
        let status = "loss";
        switch (type) {
            case PLAYERO_WON:
                announcer.innerText = 'lost';
                break;
            case PLAYERX_WON:
                status = "win";
                announcer.innerText = 'won';
                break;
            case TIE:
                status = "draw";
                announcer.innerText = 'drew';
        }

        removeClasses(gameVerdict, ["hidden"]);
        gameVerdict.scrollIntoView();

        // save to database
        fetch("/save-statistics", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "did": localStorage["player_did"],
                status
            })
        })
            .then(async res => {
                await res.json().then(res => {
                    console.log(res.data.msg);
                })
            });
            
        // reset
        setTimeout(resetBoard, 2000);
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }

        return true;
    };

    const updateBoard = (tile, index) => {
        // set color
        if (currentPlayer == 'X') {
            addClasses(tile, ["text-green-400"]);
            removeClasses(tile, ["text-red-400"]);
        } else {
            addClasses(tile, ["text-red-400"]);
            removeClasses(tile, ["text-green-400"]);
        }

        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        if (currentPlayer == 'X') {
            playerDisplay.innerText = "the computer's";
            removeClasses(playerIndicator, ["bg-green-100", "border-green-800"]);
            addClasses(playerIndicator, ["bg-red-100", "border-red-800"]);
        } else {
            playerDisplay.innerText = "your";
            removeClasses(playerIndicator, ["bg-red-100", "border-red-800"]);
            addClasses(playerIndicator, ["bg-green-100", "border-green-800"]);
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        // call computer to play as player O
        if (currentPlayer == 'O')
            setTimeout(computerPlayO, 1000);
    }

    const computerPlayO = () => {
        let played = false;

        // Priority 1: Check for a win
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] === 'O' && board[b] === 'O' && board[c] === '') {
                tiles[c].click();
                return;
            }
        }

        // Priority 2: Block the user from winning
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] === 'X' && board[b] === 'X' && board[c] === '') {
                tiles[c].click();
                return;
            }
        }

        // Priority 3: Try to create a winning opportunity
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] === 'O' && board[c] === 'O' && board[b] === '') {
                tiles[b].click();
                return;
            }
        }

        // Priority 4: Block the user from creating a winning opportunity
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] === 'X' && board[c] === 'X' && board[b] === '') {
                tiles[b].click();
                return;
            }
        }

        // Priority 5: Play in the center if available
        if (board[4] === '') {
            tiles[4].click();
            return;
        }

        // Priority 6: Play in a corner if available
        const corners = [0, 2, 6, 8];
        for (const corner of corners) {
            if (board[corner] === '') {
                tiles[corner].click();
                return;
            }
        }

        // Priority 7: Play in any remaining available cell
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                tiles[i].click();
                return;
            }
        }

        // If none of the above conditions are met, play randomly 
        if (!played) {
            clickTile(getRandomNumber());
        }
    };


    const clickTile = (index) => {
        let tile = tiles[index];
        // Check if the tile has not been played
        if (!tile.classList.contains("playerX") && !tile.classList.contains("playerO")) {
            tile.click();
        } else {
            // Find the next available tile
            let availableTileIndex = -1;
            for (let i = 0; i < tiles.length; i++) {
                if (!tiles[i].classList.contains("playerX") && !tiles[i].classList.contains("playerO")) {
                    availableTileIndex = i;
                    break;
                }
            }
            // If an available tile is found, click it
            if (availableTileIndex !== -1) {
                tiles[availableTileIndex].click();
            }
        }
    }


    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(tile, index);
            handleResultValidation();
            changePlayer();
        }
    }

    function getRandomNumber() {
        // Generate a random decimal number between 0 (inclusive) and 1 (exclusive)
        const randomDecimal = Math.random();

        // Scale the random decimal to the desired range [0, 7]
        const randomNumber = Math.floor(randomDecimal * 8);

        return randomNumber;
    }


    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        addClasses(gameVerdict, ["hidden"]);

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });

        let trials = parseInt(gameTrials.innerText) - 1;
        if (trials > 0) {
            gameTrials.innerText = trials;
        } else {
            // game over, move to next screen
            addClasses(qs(".main-game"), ["hidden"]);
            removeClasses(qs(".view-leaderboard"), ["hidden"]);
            addClasses(playerIndicator, ["hidden"]);
        }
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });
});
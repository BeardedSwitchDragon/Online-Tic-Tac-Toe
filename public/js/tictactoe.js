
//Fetch document elements


//Get all tictactoe squares

const ticTacToeSquares = Array.from(document.getElementsByClassName("tictactoe-button"));

//Game Logic

//Places an X or O when called. squareID is the element ID of the button, and player is either "X" or "O"
const playSquare = (squareID, player) => {
    if (ticTacToeSquares[squareID].textContent !== "X" && ticTacToeSquares[squareID].textContent !== "O") {
        document.getElementById(squareID).textContent = player;
        
        return true;
    } else {
        return false;
    }
   
};
//Check win
const checkWin = (player) => {
    
    for (let columnRow = 1; columnRow <= 3; columnRow++) {
        
        //squaresInColumn is used to determine a horizontal victory
        //squaresInRow is used to determine a vertical victory
        const squaresInColumn = document.getElementsByClassName(`col-${columnRow}`);
        const squaresInRow = document.getElementsByClassName(`row-${columnRow}`);

        /*
        - convert document.getElementsByClassName into an Array by using Array.from
        - determine if all values in an array satisfy a codition using .every()
        - using the || operator, the variable will always be which one is true.

        */
        const winTest = Array.from(squaresInColumn).every((square) => {
            return square.textContent === player;
        }) || Array.from(squaresInRow).every((square) => {
            return square.textContent === player;
        });

        if (winTest) {
            return console.log(`${player} wins!`);
        };
        //check if diagonal win (left to right)
        if (ticTacToeSquares[0].textContent === player && ticTacToeSquares[4].textContent === player && ticTacToeSquares[8].textContent === player) {
            return console.log(`${player} wins!`);

        //Check if diagonal win (right to left)
        } else if ( ticTacToeSquares[2].textContent === player && ticTacToeSquares[4].textContent === player && ticTacToeSquares[6].textContent === player) {
            return console.log(`${player} wins!`);
        }

        console.log("nobody won yet");
        
        


    };

    // for (let row = 1; row <= 3; row++) {
    //     const squaresInRow = document.getElementsByClassName(`row-${row}`);
    //     const winTest = Array.from(squares)
        
    // }


};
const fabricatePlayerTwoInput = () => {
    let randomSquare = Math.floor(Math.random() * 9);

    while (ticTacToeSquares[randomSquare].textContent === "X" && ticTacToeSquares[randomSquare].textContent === "O") {
        randomSquare = Math.floor(Math.random() * 9);
    }
    receivePlayerTwoInput(randomSquare);
};
const receivePlayerTwoInput = (squareID) => {
    playSquare(squareID, "O");
};
const updateGrid = () => {

};

//Iterates through the all the tictactoe grids (more specfically buttons). It then listens for clicks, and replaces the button text with X (placeholder).
ticTacToeSquares.forEach((square) => {
    square.addEventListener("click", () => {
        if (playSquare(square.id, "X")) {
            checkWin("X");
            fabricatePlayerTwoInput();
            checkWin("O");
        };
    });
});


// Client-side socket stuff



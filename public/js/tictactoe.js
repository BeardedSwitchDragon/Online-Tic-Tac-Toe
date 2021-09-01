
//Fetch document elements


//Get all tictactoe squares

const ticTacToeSquares = document.getElementsByClassName("tictactoe-button");

//Game Logic

//Places an X or O when called. squareID is the element ID of the button, and player is either "X" or "O"
const playSquare = (squareID, player) => {
    document.getElementById(squareID).textContent = player;
};
const checkWin = (player) => {
    
    for (let columnRow = 1; columnRow <= 3; columnRow++) {
        //Check horizontal win
        const squaresInColumn = document.getElementsByClassName(`col-${columnRow}`);
        const squaresInRow = document.getElementsByClassName(`row-${columnRow}`);

        const winTest = Array.from(squaresInColumn).every((square) => {
            return square.textContent === player;
        }) || Array.from(squaresInRow).every((square) => {
            return square.textContent === player;
        });

        if (winTest) {
            console.log(`${player} wins!`);
        } else {
            console.log("nobody won yet");
        };
        //Check vertical win
        


    };

    // for (let row = 1; row <= 3; row++) {
    //     const squaresInRow = document.getElementsByClassName(`row-${row}`);
    //     const winTest = Array.from(squares)
        
    // }


};
const updateGrid = () => {

};

//Iterates through the all the tictactoe grids (more specfically buttons). It then listens for clicks, and replaces the button text with X (placeholder).
Array.from(ticTacToeSquares).forEach((square) => {
    square.addEventListener("click", () => {
        playSquare(square.id, "X");
        checkWin("X");
    });
});


// Client-side socket stuff



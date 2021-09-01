
//Fetch document elements

//Get all tictactoe squares

const ticTacToeSquares = document.getElementsByClassName("tictactoe-button");

//Game Logic

//Places an X or O when called. squareID is the element ID of the button, and player is either "X" or "O"
const playSquare = (squareID, player) => {
    document.getElementById(squareID).textContent = player;
};
const checkWin = () => {

};
const updateGrid = () => {

};

//Iterates through the all the tictactoe grids (more specfically buttons). It then listens for clicks, and replaces the button text with X (placeholder).
Array.from(ticTacToeSquares).forEach((square) => {
    square.addEventListener("click", () => {
        playSquare(square.id, "X");
    });
});


// Client-side socket stuff



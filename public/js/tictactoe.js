
//Fetch document elements


//Get all tictactoe squares
var socket = io();

const ticTacToeSquares = Array.from(document.getElementsByClassName("tictactoe-button"));
const opponentHeader = document.querySelector("#opponentHeader");
var playerCanMove = true;
var gameOver = false;

//Get username and room value
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

//Game Logic

//Places an X or O when called. squareID is the element ID of the button, and player is either "X" or "O"
const playSquare = (squareID, player) => {
    if (gameOver) {
        playerCanMove = false;
    }
    console.log("i am called");
    if ((ticTacToeSquares[squareID].textContent !== "X" && ticTacToeSquares[squareID].textContent !== "O" && playerCanMove === true) ||
     (ticTacToeSquares[squareID].textContent !== "X" && ticTacToeSquares[squareID].textContent !== "O" && player === "O")) {
        document.getElementById(squareID).textContent = player;
    } else {
        alert("Invalid move! It's either not your turn or somebody has already moved there!");
        return false;
    }
    playerCanMove = false;
    return true;
   
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
            console.log(square.textContent);
            return square.textContent === player;
        }) || Array.from(squaresInRow).every((square) => {
            console.log(square.textContent);
            return square.textContent === player;
        });
        console.log(winTest);

        if (winTest) {
            console.log(`${player} wins!`);
            return true;
        };
        
        


    };
    //check if diagonal win (left to right)
    if (ticTacToeSquares[0].textContent === player && ticTacToeSquares[4].textContent === player && ticTacToeSquares[8].textContent === player) {
        console.log(`${player} wins!`);
        return true;

    //Check if diagonal win (right to left)
    } else if ( ticTacToeSquares[2].textContent === player && ticTacToeSquares[4].textContent === player && ticTacToeSquares[6].textContent === player) {
        console.log(`${player} wins!`);
        return true;
    }

    console.log("nobody won yet");
    return false;
    

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
    console.log("IAAM CALLED TOO!!!")
    playSquare(squareID, "O");
    //playerCanMove = true;
    

    
};
const updateGrid = () => {

};

//Iterates through the all the tictactoe grids (more specfically buttons). It then listens for clicks, and replaces the button text with X (placeholder).
ticTacToeSquares.forEach((square) => {
    square.addEventListener("click", () => {
        if (playSquare(square.id, "X")) {
            //playerCanMove = false;
            console.log("placing square logic");
            socket.emit("playerMove", {squareID: square.id, room});
            playerCanMove = false;
            const win = checkWin("X");
            
            if (win) {
                console.log("called");
                alert("You win!");
                socket.emit("win", {username, room});
            };
        };
    });
});


// Client-side socket stuff
socket.emit("join", {username, reqRoom: room}, (error) => {
    if (error) {
        alert(error);
        location.href = "/";
    } else {
        
       
    }
});
socket.on("playerMove", (squareID) => {
    console.log("helllo");
    receivePlayerTwoInput(squareID);
    checkWin("O");
    playerCanMove = true;
    
    
});
socket.on("win", (username) => {
    playerCanMove = false;
    alert(`${username} Wins!!!`);
});


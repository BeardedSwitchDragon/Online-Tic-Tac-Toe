
//Fetch document elements


//Get all tictactoe squares
var socket = io();

const ticTacToeSquares = Array.from(document.getElementsByClassName("tictactoe-button"));
const opponentHeader = document.querySelector("#opponent-header");
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
const checkWin = () => {
    
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
        const winTestX = Array.from(squaresInColumn).every((square) => {
            console.log(square.textContent);
            return square.textContent === "X";
        }) || Array.from(squaresInRow).every((square) => {
            console.log(square.textContent);
            return square.textContent === "X";
        });
        const winTestO = Array.from(squaresInColumn).every((square) => {
            console.log(square.textContent);
            return square.textContent === "O";
        }) || Array.from(squaresInRow).every((square) => {
            console.log(square.textContent);
            return square.textContent === "O";
        });

        if (winTestX) {
            gameOver = true;
            alert("You win! redirecting to home page in 5 seconds.");
            setTimeout(() => {
                location.href = "/";
            }, 5000);
            return true;
            
        } else if (winTestO) {
            gameOver = true;
            alert("You lose! redirecting to home page in 5 seconds.");
            setTimeout(() => {
                location.href = "/";
            }, 5000);
            return true;

        }
        
        


    };
    //check if diagonal win (left to right)
    if (ticTacToeSquares[0].textContent === "X" && ticTacToeSquares[4].textContent === "X" && ticTacToeSquares[8].textContent === "X") {
        gameOver = true; 
        alert("You win! redirecting to home page in 5 seconds.");
        setTimeout(() => {
            location.href = "/";
        }, 5000);
        return true;

    //Check if diagonal win (right to left)
    } else if ( ticTacToeSquares[2].textContent === "X" && ticTacToeSquares[4].textContent === "X" && ticTacToeSquares[6].textContent === "X") {
        gameOver = true;
        alert("You win! redirecting to home page in 5 seconds.");
        setTimeout(() => {
            location.href = "/";
        }, 5000);
        return true;
    } else if (ticTacToeSquares[2].textContent === "O" && ticTacToeSquares[4].textContent === "O" && ticTacToeSquares[6].textContent === "O") {
        gameOver = true;
        alert("You lose! redirecting to home page in 5 seconds.");
        setTimeout(() => {
            location.href = "/";
        }, 5000);
        return true;
    } else if (ticTacToeSquares[0].textContent === "O" && ticTacToeSquares[4].textContent === "O" && ticTacToeSquares[8].textContent === "O") {
        gameOver = true;
        alert("You lose! redirecting to home page in 5 seconds.");
        setTimeout(() => {
            location.href = "/";
        }, 5000);
        return true;
    };

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
const checkDraw = () => {
    const isDraw = ticTacToeSquares.every((square) => square.textContent !== "-");
    if (isDraw) {
        gameOver = true;
        alert("It's a draw :P returning to home screen.");
        location.href = "/";
    }
    
};

//Iterates through the all the tictactoe grids (more specfically buttons). It then listens for clicks, and replaces the button text with X (placeholder).
ticTacToeSquares.forEach((square) => {
    square.addEventListener("click", () => {
        const succesfulMove = playSquare(square.id, "X");
        if (succesfulMove) {
            //playerCanMove = false;
            console.log("placing square logic");
            socket.emit("playerMove", {squareID: square.id, room});
            if (!checkWin()) {
                checkDraw();
            }
            playerCanMove = false;
            
            
            // if (win) {
            //     console.log("called");
            //     alert("You win! returning to home screen.");
            //     socket.emit("win", {username, room});
            //     location.href = "/";
            // };

        };
    });
});


// Client-side socket stuff

socket.emit("join", {username, reqRoom: room}, (error) => {
    if (error) {
        alert(error);
        location.href = "/";
    }
});
//Receive opponent username
socket.on("opponentUsername", (opponentUsername) => {
    console.log("hi again1!!!!!!1!!!!");
    opponentHeader.innerHTML = `Versing: ${opponentUsername}`;
    socket.emit("opponentUsername2", {username, room});
});
console.log("HELLO!!!!@!!#@!#$#!@");



socket.on("opponentUsername2", (opponentUsername) => {
    console.log("opposne hi p2 (cleitn)");
    opponentHeader.innerHTML = `Versing: ${opponentUsername}`;
});
socket.on("error", (err) => {
    console.log(err);
});
socket.on("userDisconnect", () => {
    alert(`opponent disconnected. Returning to homepage`);
    location.href = "/";
})

//Receive opponent move
socket.on("playerMove", (squareID) => {
    console.log("helllo");
    receivePlayerTwoInput(squareID);
    if (!checkWin()) {
        checkDraw();
    }
    playerCanMove = true;
    
    
});
// socket.on("win", () => {
//     playerCanMove = false;
//     alert("You lose!!!!");
//     location.href = "/";
// });


const statusDisplay = document.querySelector(".game--status");
let gameActive = true;

let currentPlayer = "X";

let gameState = ["","","","","","","","",""];


// explain why function and not simple variable
const winningMessage = ()=> `Congratulations! Player${currentPlayer=== "X"?1 :2} wins`;

const drawMessage = ()=> `Draw!`;

let currentPlayerTurn = ()=> `It's  ${currentPlayer}'s turn `;
const updateStatus = () => statusDisplay.innerHTML = currentPlayerTurn();
updateStatus();

const winningConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
function handleCellPlayed(clickedCell,clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange(){
  currentPlayer = (currentPlayer === "X") ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}
function handleResultValidation(){
    let roundWon = false;
    for(let i =0;i<winningConditions.length;i++)
    {
        let a = gameState[winningConditions[i][0]];
        let b = gameState[winningConditions[i][1]];
        let c = gameState[winningConditions[i][2]];
        
        if (a === "" || b === "" || c === "")
            continue;
        
        if (a === b && b === c){
            roundWon = true;
            break;
        }
    }

    if (roundWon){
        alert(winningMessage());
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    // Handle Draw condition
    let roundDraw = !gameState.includes("");
    if (roundDraw){
        alert(drawMessage());
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}
function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = Number(clickedCell.getAttribute("data-cell-index"));
    if (gameState[clickedCellIndex] !== "" || !gameActive)
        return;
    
    handleCellPlayed(clickedCell,clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame(){
    for(var i=0;i<gameState.length;i++)
    {
        gameState[i] = "";
    }
    currentPlayer = "X";
    gameActive = true;
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach((cell) =>( cell.innerHTML = ""));
}

document
    .querySelectorAll(".cell")
    .forEach((cell) => cell.addEventListener("click",handleCellClick));

document
    .querySelector(".game--restart")
    .addEventListener("click",handleRestartGame);
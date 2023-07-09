const cells=document.querySelectorAll(".cell");
const statusText=document.querySelector("#statusText");
const restartBtn=document.querySelector("#restartBtn");
const winCombinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let options=["","","","","","","","",""];
let currentPlayer="X";
let running=false;

initializeGame();

function initializeGame(){
    cells.forEach(cell=>cell.addEventListener("click",cellClicked));
    restartBtn.addEventListener("click",restartGame);
    statusText.textContent=`${currentPlayer}'s turn`;
    running=true;
}
function cellClicked(){
    const cellIndex=this.getAttribute("cellIndex");
    if(options[cellIndex]!="" || !running){
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();
}

function updateCell(cell,index){
  options[index]=currentPlayer;
  cell.textContent=currentPlayer;//it makes u to set x in any of the cells
}
function changePlayer(){
    currentPlayer=(currentPlayer == "X") ? "O":"X";
    statusText.textContent=`${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon=false;//initially roundwon
    for(let i=0;i<winCombinations.length;i++){//we iterate over the winCombinations
     const condition=winCombinations[i];//store all winCombitions in condition variable,/each row has 3 indices like cellA,cellB,cellC
     //iterate over the wincombitions array ,and check the options =>the first wincombition array 3 rows and options are not empty spaces and wincombitions first and option are same then someone has won the game.
     //if there is no winner we'll check the next set of wincombinations 3,4,5 indices and options 3,4,5=>options are not empty spaces, if they are same(indices 3,4,5 and options(3,4,5) ) then somebody won.
     //we'll repeate this process for each set of winCombinations 
     const cellA=options[condition[0]]
     const cellB=options[condition[1]];
     const cellC=options[condition[2]];

     if(cellA == "" || cellB == "" || cellC == ""){
        continue;
     }
     if(cellA == cellB && cellB ==cellC){//if 3 rows are same then somebody has won the game
        roundWon=true;
        break;
     }
    }
    if(roundWon){//if roundwon==true (i.e any wincombination is true)then somebody has won the game 
        statusText.textContent=`${currentPlayer} has won`;
        running=false;//the game over
    }
    else if(!options.includes("")){//if all the cells are filled with X or O  but we didn't found any winner then its a Draw
       statusText.textContent=`Draw!`;
       running=false;//game over 
    }
    else{
        changePlayer();//else change the player i.e, we doesnot found the roundwinner and still some cells are not filled then we need call the changePlayer function to continue the game  
    }
}
function restartGame(){
currentPlayer="X";
options=["","","","","","","","",""];
statusText.textContent=`${currentPlayer}'s turn`;
cells.forEach(cell=>cell.textContent = "");//we need to clear all the cells values to restart
running=true;
}
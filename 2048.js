//===================================================== javaScript =================================================================

// Getting all the required Selectors ============================================================================================== 

let MainGRid = document.querySelector(".mainGrid");
let board = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
];
let currentScore = 0;
let restart = document.querySelector(".restart");
let grid=document.querySelector(".grid")
let resVis=false;

//===================================================================================================================================
//===================================================== AddEventListners ============================================================
//===================================================================================================================================

createCell();
//Restart-Button
restart.addEventListener("click", function () {
    if(resVis==true){
        let doc=document.querySelectorAll(".gameover");
        for(let i=0;i<doc.length;i++){
            doc[i].remove();
        }
        
    }
    board = [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ];
    currentScore = 0;
    updateGrid();
})
// For Movement-Keys 
window.addEventListener("keydown", function (e) {
    for (let i = 0; i < 16; i++) {
        let address = document.querySelector(`[data-address="${i}"]`);
        board[i] = parseInt(address.innerHTML);
    }

    if (e.key == "ArrowDown") {
        keyDown();
    }
    if (e.key == "ArrowRight") {
        keyRight()
    }
    if (e.key == "ArrowLeft") {
        keyLeft();
    }
    if (e.key == "ArrowUp") {
        keyUp();
    }
    updateGrid();
    randomGenerator();
});

//===================================================================================================================================
//===================================================== Required Functions ==========================================================
//===================================================================================================================================

//To create Cell on UI
function createCell() {
    for (let i = 0; i < 16; i++) {
        let Box = document.createElement("div");
        Box.classList.add("cell");
        Box.setAttribute("data-address", i);
        Box.innerHTML = 0;

        MainGRid.append(Box);
    }
}
//After movements of cell we need new cells.
function randomGenerator() {
    let idx1 = Math.floor(Math.random() * 16);
    let idx2 = Math.floor(Math.random() * 16);
    let cell1 = document.querySelector(`[data-address="${idx1}"]`);
    let cell2 = document.querySelector(`[data-address="${idx2}"]`);
    if (cell1.innerHTML != 0 && cell2.innerHTML != 0) {
        for (let i = 0; i < 16; i++) {
            if (board[i] == 0) {
                let cell3 = document.querySelector(`[data-address="${i}"]`);
                cell3.innerHTML = 2;
                cell3.style.backgroundColor = "#eee4da";
                break;

            }
        }
    }
    else {
        if (cell1.innerHTML == 0) {
            cell1.innerHTML = 2;
            cell1.style.backgroundColor = "#eee4da";
        }
        if (cell2.innerHTML == 0) {
            cell2.innerHTML = 2;
            cell2.style.backgroundColor = "#eee4da";
        }
    }
}
//Function to update the grid after every keyDown
function updateGrid() {
    for (let i = 0; i < 16; i++) {
        let address = document.querySelector(`[data-address="${i}"]`);
        address.innerHTML = board[i];
    }
    let score = document.querySelector(".ScoreCounter");
    score.innerHTML = currentScore;

    let cell = document.querySelectorAll(".cell");
    for (let i = 0; i < cell.length; i++) {
        if (cell[i].innerHTML == 2) {
            cell[i].style.backgroundColor = "#eee4da";
        }
        if (cell[i].innerHTML == 0) {
            cell[i].style.backgroundColor = "rgba(238,228,218,.35)";
        }
        if (cell[i].innerHTML == 4) {
            cell[i].style.backgroundColor = "#fff";
        }
        if (cell[i].innerHTML == 8) {
            cell[i].style.backgroundColor = "#f2b179";
        }
        if (cell[i].innerHTML == 16) {
            cell[i].style.backgroundColor = "#f59563";
        }
        if (cell[i].innerHTML == 32) {
            cell[i].style.backgroundColor = "#f67c5f";
        }
        if (cell[i].innerHTML == 64) {
            cell[i].style.backgroundColor = "#f65e3b";
        }
        if (cell[i].innerHTML == 128) {
            cell[i].style.backgroundColor = "#edcf72";
        }
        if (cell[i].innerHTML == 256) {
            cell[i].style.backgroundColor = "#edcc61";
        }
        if (cell[i].innerHTML == 512) {
            cell[i].style.backgroundColor = "#edc850";
        }
        if (cell[i].innerHTML == 1024) {
            cell[i].style.backgroundColor = "#7f8c8d";
        }
        if (cell[i].innerHTML == 2048) {
            cell[i].style.backgroundColor = "#e55039";
        }
        if (cell[i].innerHTML == 4096) {
            cell[i].style.backgroundColor = "#78e08f";
        }
    }

    gameOVER();

}
//Function to show if Game is Over 
function gameOVER() {
    let zeroContain = false;;
    for (let i = 0; i < 16; i++) {
        if (board[i] == 0) {
            zeroContain = true;
            break;
        }
    }
    if (!zeroContain) {
        let tempboard = [];
        while (board.length) tempboard.push(board.splice(0, 4));
        if (!chkGameOver(tempboard)) {
            let gameOver = document.createElement("div");
            gameOver.classList.add("gameover");
            gameOver.innerHTML = `<div class="GAMEOVER">
            <div class="g">G</div>
            <div class="a">A</div>
            <div class="g">M</div>
            <div class="a">E</div>
            <div class="g">-</div>
            <div class="a">O</div>
            <div class="g">V</div>
            <div class="a">E</div>
            <div class="g">R</div>
        </div>
        <div class="sCORE">
            <div class="yOURSCORE">YOUR SCORE</div>
            <div class="ScOrE">${currentScore}</div>
        </div>`

        resVis=true;
            MainGRid.append(gameOver);

        }
    }
}
//Helping function for gameOver
function chkGameOver(board) {
    let change = false;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if ((i + 1) < board.length) {
                if (board[i][j] == board[i + 1][j]) {
                    change = true;
                    break;
                }
            }
            if ((i - 1) >= 0) {
                if (board[i][j] == board[i - 1][j]) {
                    change = true;
                    break;
                }
            }
            if ((j + 1) < board[0].length) {
                if (board[i][j] == board[i][j + 1]) {
                    change = true;
                    break;
                }
            }
            if ((j - 1) >= 0) {
                if (board[i][j] == board[i][j - 1]) {
                    change = true;
                    break;
                }
            }
        }
    }
    return change;
}
//Helping function for updateGrid If you press Down Key
function keyDown() {
    for (let i = 0; i < 4; i++) {
        //Merging all like
        if (board[12 + i] == board[8 + i] && board[12 + i] != 0) {
            currentScore += board[12 + i]
            board[12 + i] += board[8 + i]
            if (board[4 + i] == board[0 + i]) {
                currentScore += board[8 + i]
                board[8 + i] = board[4 + i] + board[0 + i]
                board[4 + i] = 0
                board[0 + i] = 0
            }
            else {
                board[8 + i] = board[4 + i]
                board[4 + i] = board[0 + i]
                board[0 + i] = 0
            }
        }
        else if (board[12 + i] == board[4 + i] && board[12 + i] != 0 && board[8 + i] == 0) {
            currentScore += board[12 + i]
            board[12 + i] += board[4 + i]
            board[8 + i] = board[0 + i]
            board[4 + i] = 0
            board[0 + i] = 0
        }
        else if (board[12 + i] == board[0 + i] && board[12 + i] != 0 && board[8 + i] == 0 && board[4 + i] == 0) {
            currentScore += board[12 + i]
            board[12 + i] += board[0 + i]
            board[4 + i] = 0
            board[8 + i] = 0
            board[0 + i] = 0
        }
        else if (board[8 + i] == board[4 + i] && board[8 + i] != 0) {
            currentScore += board[8 + i]
            board[8 + i] += board[4 + i]
            board[4 + i] = board[0 + i]
            board[0 + i] = 0
        }
        else if (board[8 + i] == board[0 + i] && board[8 + i] != 0 && board[4 + i] == 0) {
            currentScore += board[8 + i]
            board[8 + i] += board[0 + i]
            board[4 + i] = 0
            board[0 + i] = 0
        }
        else if (board[4 + i] == board[0 + i] && board[4 + i] != 0) {
            currentScore += board[4 + i]
            board[4 + i] += board[0 + i]
            board[0 + i] = 0
        }
        //Removing Zero and shifting
        for (let j = 0; j < 3; j++) {
            if (board[i + 12] == 0) {
                board[i + 12] = board[i + 8]
                board[i + 8] = board[i + 4]
                board[i + 4] = board[i + 0]
                board[i + 0] = 0
            }
            if (board[i + 8] == 0) {
                board[i + 8] = board[i + 4]
                board[i + 4] = board[i + 0]
                board[i + 0] = 0
            }
            if (board[i + 4] == 0) {
                board[i + 4] = board[i + 0]
                board[i + 0] = 0
            }
        }
    }
}
//Helping function for updateGrid If you press Right Key
function keyRight() {
    for (let i = 0; i < 4; i++) {
        //Merging all like
        if (board[3 + i * 4] == board[2 + i * 4] && board[3 + i * 4] != 0) {
            currentScore += board[3 + i * 4]
            board[3 + i * 4] += board[2 + i * 4]
            if (board[1 + i * 4] == board[0 + i * 4]) {
                currentScore += board[2 + i * 4]
                board[2 + i * 4] = board[1 + i * 4] + board[0 + i * 4]
                board[1 + i * 4] = 0
                board[0 + i * 4] = 0
            }
            else {
                board[2 + i * 4] = board[1 + i * 4]
                board[1 + i * 4] = board[0 + i * 4]
                board[0 + i * 4] = 0
            }
        }
        else if (board[3 + i * 4] == board[1 + i * 4] && board[3 + i * 4] != 0 && board[2 + i * 4] == 0) {
            currentScore += board[3 + i * 4]
            board[3 + i * 4] += board[1 + i * 4]
            board[2 + i * 4] = board[0 + i * 4]
            board[1 + i * 4] = 0
            board[0 + i * 4] = 0
        }
        else if (board[3 + i * 4] == board[0 + i * 4] && board[3 + i * 4] != 0 && board[2 + i * 4] == 0 && board[1 + i * 4] == 0) {
            currentScore += board[3 + i * 4]
            board[3 + i * 4] += board[0 + i * 4]
            board[1 + i * 4] = 0
            board[2 + i * 4] = 0
            board[0 + i * 4] = 0
        }
        else if (board[2 + i * 4] == board[1 + i * 4] && board[1 + i * 4] != 0) {
            currentScore += board[2 + i * 4]
            board[2 + i * 4] += board[1 + i * 4]
            board[1 + i * 4] = board[0 + i * 4]
            board[0 + i * 4] = 0
        }
        else if (board[2 + i * 4] == board[0 + i * 4] && board[2 + i * 4] != 0 && board[1 + i * 4] == 0) {
            currentScore += board[2 + i * 4]
            board[2 + i * 4] += board[0 + i * 4]
            board[1 + i * 4] = 0
            board[0 + i * 4] = 0
        }
        else if (board[1 + i * 4] == board[0 + i * 4] && board[1 + i * 4] != 0) {
            currentScore += board[1 + i * 4]
            board[1 + i * 4] += board[0 + i * 4]
            board[0 + i * 4] = 0
        }
        //Removing Zero and shifting
        for (let j = 0; j < 3; j++) {
            if (board[i * 4 + 3] == 0) {
                board[i * 4 + 3] = board[i * 4 + 2]
                board[i * 4 + 2] = board[i * 4 + 1]
                board[i * 4 + 1] = board[i * 4 + 0]
                board[i * 4 + 0] = 0
            }
            if (board[i * 4 + 2] == 0) {
                board[i * 4 + 2] = board[i * 4 + 1]
                board[i * 4 + 1] = board[i * 4 + 0]
                board[i * 4 + 0] = 0
            }
            if (board[i * 4 + 1] == 0) {
                board[i * 4 + 1] = board[i * 4 + 0]
                board[i * 4 + 0] = 0
            }
        }
    }
}
//Helping function for updateGrid If you press Left Key
function keyLeft() {
    for (let i = 0; i < 4; i++) {
        //Merging all like
        if (board[0 + i * 4] == board[1 + i * 4] && board[0 + i * 4] != 0) {
            currentScore += board[0 + i * 4]
            board[0 + i * 4] += board[1 + i * 4]
            if (board[2 + i * 4] == board[3 + i * 4]) {
                currentScore += board[1 + i * 4]
                board[1 + i * 4] = board[2 + i * 4] + board[3 + i * 4]
                board[2 + i * 4] = 0
                board[3 + i * 4] = 0
            }
            else {
                board[1 + i * 4] = board[2 + i * 4]
                board[2 + i * 4] = board[3 + i * 4]
                board[3 + i * 4] = 0
            }
        }
        else if (board[0 + i * 4] == board[2 + i * 4] && board[0 + i * 4] != 0 && board[1 + i * 4] == 0) {
            currentScore += board[0 + i * 4]
            board[0 + i * 4] += board[2 + i * 4]
            board[1 + i * 4] = board[3 + i * 4]
            board[2 + i * 4] = 0
            board[3 + i * 4] = 0
        }
        else if (board[0 + i * 4] == board[3 + i * 4] && board[0 + i * 4] != 0 && board[1 + i * 4] == 0 && board[2 + i * 4] == 0) {
            currentScore += board[0 + i * 4]
            board[0 + i * 4] += board[3 + i * 4]
            board[1 + i * 4] = 0
            board[2 + i * 4] = 0
            board[3 + i * 4] = 0
        }
        else if (board[1 + i * 4] == board[2 + i * 4] && board[1 + i * 4] != 0) {
            currentScore += board[1 + i * 4]
            board[1 + i * 4] += board[2 + i * 4]
            board[2 + i * 4] = board[3 + i * 4]
            board[3 + i * 4] = 0
        }
        else if (board[1 + i * 4] == board[3 + i * 4] && board[1 + i * 4] != 0 && board[2 + i * 4] == 0) {
            currentScore += board[1 + i * 4]
            board[1 + i * 4] += board[3 + i * 4]
            board[2 + i * 4] = 0
            board[3 + i * 4] = 0
        }
        else if (board[2 + i * 4] == board[3 + i * 4] && board[2 + i * 4] != 0) {
            currentScore += board[2 + i * 4]
            board[2 + i * 4] += board[3 + i * 4]
            board[3 + i * 4] = 0
        }
        //Removing Zero and shifting
        for (let j = 0; j < 3; j++) {
            if (board[i * 4 + 0] == 0) {
                board[i * 4 + 0] = board[i * 4 + 1]
                board[i * 4 + 1] = board[i * 4 + 2]
                board[i * 4 + 2] = board[i * 4 + 3]
                board[i * 4 + 3] = 0
            }
            if (board[i * 4 + 1] == 0) {
                board[i * 4 + 1] = board[i * 4 + 2]
                board[i * 4 + 2] = board[i * 4 + 3]
                board[i * 4 + 3] = 0
            }
            if (board[i * 4 + 2] == 0) {
                board[i * 4 + 2] = board[i * 4 + 3]
                board[i * 4 + 3] = 0
            }
        }
    }
}
//Helping function for updateGrid If you press Up Key
function keyUp() {
    for (let i = 0; i < 4; i++) {
        //Merging all like
        if (board[0 + i] == board[4 + i] && board[0 + i] != 0) {
            currentScore += board[0 + i]
            board[0 + i] += board[4 + i]
            if (board[8 + i] == board[12 + i]) {
                currentScore += board[4 + i]
                board[4 + i] = board[8 + i] + board[12 + i]
                board[8 + i] = 0
                board[12 + i] = 0
            }
            else {
                board[4 + i] = board[8 + i]
                board[8 + i] = board[12 + i]
                board[12 + i] = 0
            }
        }
        else if (board[0 + i] == board[8 + i] && board[0 + i] != 0 && board[4 + i] == 0) {
            currentScore += board[0 + i]
            board[0 + i] += board[8 + i]
            board[4 + i] = board[12 + i]
            board[8 + i] = 0
            board[12 + i] = 0
        }
        else if (board[0 + i] == board[12 + i] && board[0 + i] != 0 && board[4 + i] == 0 && board[8 + i] == 0) {
            currentScore += board[0 + i]
            board[0 + i] += board[12 + i]
            board[4 + i] = 0
            board[8 + i] = 0
            board[12 + i] = 0
        }
        else if (board[4 + i] == board[8 + i] && board[4 + i] != 0) {
            currentScore += board[4 + i]
            board[4 + i] += board[8 + i]
            board[8 + i] = board[12 + i]
            board[12 + i] = 0
        }
        else if (board[4 + i] == board[12 + i] && board[4 + i] != 0 && board[8 + i] == 0) {
            currentScore += board[4 + i]
            board[4 + i] += board[12 + i]
            board[8 + i] = 0
            board[12 + i] = 0
        }
        else if (board[8 + i] == board[12 + i] && board[8 + i] != 0) {
            currentScore += board[8 + i]
            board[8 + i] += board[12 + i]
            board[12 + i] = 0
        }
        //Removing Zero and shifting
        for (let j = 0; j < 3; j++) {
            if (board[i + 0] == 0) {
                board[i + 0] = board[i + 4]
                board[i + 4] = board[i + 8]
                board[i + 8] = board[i + 12]
                board[i + 12] = 0
            }
            if (board[i + 4] == 0) {
                board[i + 4] = board[i + 8]
                board[i + 8] = board[i + 12]
                board[i + 12] = 0
            }
            if (board[i + 8] == 0) {
                board[i + 8] = board[i + 12]
                board[i + 12] = 0
            }
        }
    }
}

//===================================================== Thank You ==========================================================

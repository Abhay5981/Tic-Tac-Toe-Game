let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");

let newGameBtn = document.querySelector("#new-btn");
let msgCnotainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// let create a turn of player who is going to be play
let turnO = true; // playerX PlayerY
let count = 0;


// winning pattern with 2D array

const winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5], 
        [6, 7, 8], 

];

const resetGame = () => {
        turnO = true;
        count = 0;
        enableBoxes();
        msgCnotainer.classList.add("hide");
};



// add event listener for each boxs

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        
    if(turnO) { //playerO
        box.innerText = "O";
        turnO = false;
    } else {  //playerX
        box.innerText = "X";
        turnO = true;
    }
    box.disabled = true;
    count++;
        

    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
        gameDraw();
    }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgCnotainer.classList.remove("hide");
    disabledBoxes();

};
    const disabledBoxes = () => {
        for (let box of boxes) {
            box.disabled = true;
           
        }
    };

    const enableBoxes = () => {
        for (let box of boxes) {
            box.disabled = false;
            box.innerText = "";
        }
    };



    const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgCnotainer.classList.remove("hide");
        disabledBoxes();
    };


 const checkWinner = () => {
    for (let pattern of winPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }
    }
 };

 
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

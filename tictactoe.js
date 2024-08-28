let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX or playerO

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
const resetGame = () =>{
    turnO = true;
    boxes.forEach((box)=>{
        box.disabled = false;
        box.innerText = '';
        });
    msgContainer.classList.add("hide");
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        //console.log('box was clicked');
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});
const showWinner = (winner) =>{
    msg.innerText = `Congrats ${winner} won`;
        boxes.forEach((box)=>{
        box.disabled = true;
        });
    msgContainer.classList.remove("hide");
}

const checkWinner = () =>{
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText; 
        let pos2 = boxes[pattern[1]].innerText; 
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != '' && pos2 != '' && pos3 != ''){
            if(pos1 === pos2 && pos2 === pos3){
                console.log('You won', pos1);
                showWinner(pos1);
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

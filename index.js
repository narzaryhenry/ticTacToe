let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let currentPlayer = "X"; // Current player (X or O)

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
  currentPlayer = "X";
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
  msgContainer.classList.add("hide");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        return pos1; // Return the winning player
      }
    }
  }
  return null; // No winner found
};

const isGameOver = () => {
  let winner = checkWinner();
  if (winner) {
    return winner;
  }

  // Check for a tie (all boxes filled and no winner)
  for (let box of boxes) {
    if (box.innerText === "") {
      return false; // Game is not over yet
    }
  }
  return "Tie"; // Game is over due to a tie
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      // Prevent clicking on filled boxes
      box.innerText = currentPlayer;
      box.disabled = true;

      let result = isGameOver();
      if (result) {
        showWinner(result);
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        msgContainer.classList.add("hide"); // Hide message container during gameplay
      }
    }
  });
});

const showWinner = (winner) => {
  msg.innerText = `Congrats ${winner} won`;
  boxes.forEach((box) => {
    box.disabled = true;
  });
  msgContainer.classList.remove("hide"); // Show message container only when the game is over
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

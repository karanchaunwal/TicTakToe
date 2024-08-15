const boxes=document.querySelectorAll(".box");
let resetbutton=document.querySelector(".resetbtn");
let turn="X";
let stepsCount=0;
const winningPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

function checkWinner(){
    for(let pattern of winningPatterns){
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);
        if(boxes[pattern[0]].innerText!="")
        if((boxes[pattern[0]].innerText==boxes[pattern[1]].innerText && boxes[pattern[1]].innerText==boxes[pattern[2]].innerText)){

            disableGame();
            startConfetti();
            printWinner();
            return;
        }
    }
    checkDraw();
}

function disableGame(){
    for (let box of boxes){ //so that game gets disabled after getting a winner
        box.disabled=true;
        document.querySelector(".resetbtn").innerText="New Game";
    }
}

function printWinner(){
    let winner =turn==="X"?"O":"X";
    let heading=document.querySelector("h1");

    heading.innerText=`Congratulations ' ${winner} ' won`;
    //or for console
    console.log(turn==="X"?"O":"X","is Winner");
}

function checkDraw(){
    if(stepsCount==9){
        document.querySelector("h1").innerText="Match Draw";
        document.querySelector(".resetbtn").innerText="New Game";
    }
}






//Program starts

for (let box of boxes){
    //   box.onclick=()=>{
    //         box.innerText="X";
    //      console.log(box);
    //     } 

        // if(turn==="X"){
        //     box.addEventListener("click", ()=>{
        //         box.innerText="X";
        //         console.log(box,"was clicked");
        //     });
        //     turn="O";
        // }else if(turn==="O"){
        //     box.addEventListener("click", ()=>{
        //         box.innerText="O";
        //         console.log(box,"was clicked");
        //     });
        //     turn="X";
        // }
        box.addEventListener("click", ()=>{  //*We need to disable button after click
            // box.innerText="X";
            // console.log(box,"was clicked");
            console.log("box was clicked");//for console
            stepsCount++;

            if(turn==="X"){
                box.style.color="#937C78";
                box.innerText="X";
                turn="O";

                // updated colcor
                box.style.color="rgb(34, 76, 123)";
                
            }else if(turn==="O"){
                box.innerText="O";
                turn="X";
                
            }

            box.disabled=true;
            
            checkWinner();
            

            
        }); 
        
        
    
}








// Function to show winner message

// function showWinnerMessage() {
//     const winnerMessage = document.getElementById("winner-message");
//     winnerMessage.style.display = "block";
  

//     // Trigger confetti effect
//     startConfetti();
//   }




// Function to start confetti effect

function startConfetti() {
    const confettiCanvas = document.getElementById("confetti");
    const ctx = confettiCanvas.getContext("2d");
  
    // Set up confetti
    const pieces = [];
    const numberOfPieces = 200;
    for (let i = 0; i < numberOfPieces; i++) {
      pieces.push(new Piece(confettiCanvas.width, confettiCanvas.height));
    }
  
    // Animation loop
    function update() {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  
      pieces.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
  
      requestAnimationFrame(update);
    }
  
    update();
  }
  
  // Piece class for confetti pieces
  class Piece {
    constructor(canvasWidth, canvasHeight) {
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
      this.radius = (Math.random() * 2 + 1) | 0;
      this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      this.velocity = {
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 6,
      };
    }
  
    update() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

var c;
var ctx;
var yr;
var yl = 300;
var bx = 400; //balls starting X
var by = 300; //balls starting Y
var speedX = 1, speedY = -1;
var xl = 10;
var xr = 770;
var paddleLength = 70, paddleWidth = 20;
var leftScore = 0, rightScore = 0;
var paddleSound = new Audio("paddleSound.mp3");
var wallSound = new Audio("wallSound.mp3");
var rand = ((Math.random() * 2) -1);
var thread;

window.onload = function startAnimation() {
    timerId = setInterval(draw, 5);
             
    // onmousemove event for right paddle player
    document.onmousemove = moveRightPaddle;
    
    // onkeydown event for left paddle player
    document.onkeydown = moveLeftPaddle;
    
    resetBall();
};

function draw(){
    // Initializing global variables
    c=document.getElementById("pongCanvas");
    ctx=c.getContext("2d");
    
    // Clearing canvas
    ctx.clearRect(0, 0, c.width, c.height);
      
    // Paddle left
    ctx.fillStyle="white";
    ctx.fillRect(xl,yl,paddleWidth,paddleLength);  
 
    //paddle right
    ctx.fillStyle="white";
    ctx.fillRect(xr,yr,paddleWidth,paddleLength);
    
    // Pong ball
    ctx.fillStyle="white";
    ctx.beginPath();
    ctx.arc(bx,by,10,0,Math.PI*2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    
    // Game title
    ctx.fillStyle="#FFFFFF";
    ctx.font="30px monospace";
    ctx.fillText("olehPong",330,25);
     
    // Net
    ctx.fillStyle="white";
    ctx.fillRect(390,40,10,540);
    
    // Left Player Score
    ctx.fillStyle="#FFFFFF";
    ctx.font="25px monospace";
    ctx.fillText("Left Player: " + leftScore, 30,40);
    
    // Right Player Score
    ctx.fillSTyle="#FFFFFF";
    ctx.font="25px monospace";
    ctx.fillText("Right Player: " + rightScore, 560, 40);
      
    ballMove();
}

function moveRightPaddle() {
    if(window.event.clientY > 15 && 
        window.event.clientY < c.height - 35) {
        yr = (window.event.clientY -25); 
        }  
    };  

function moveLeftPaddle(event){
    if (event.keyCode === 40 && yl <= 500){
        yl = yl + 20;
    }else if (event.keyCode === 38 && yl > 25){
        yl = yl - 20;
    }     
 };
 
 
 function ballMove(){
    c=document.getElementById("pongCanvas");
    // Initiate balls randome first movement
    by += speedX;
    bx += speedY;
     
    // Bouncing off top and bottom walls
    if (by >= c.height-5 || by <= 25){
        speedX *= -1;
        wallSound.load();
        wallSound.play();
    }
     
    // Bouncing off left and right walls & scoring w/ball reset
    if (bx === xl+paddleWidth+7 && by>=yl && by<=yl + paddleLength ||
        bx === xr+paddleWidth-30 && by>=yr && by<=yr + paddleLength){
        speedY *= -1;
        paddleSound.load();
        paddleSound.play();
    }else if (bx === 0 && (by >= yl + paddleLength || by <= yl)){
        console.log("point right");
        rightScore++;
        resetBall();
    }else if (bx === c.width-10 && (by >= yr + paddleLength || by <= yr)){
        console.log("point left");
        leftScore++;
        resetBall();
    }
 };
 
 function resetBall(){
    // Reset ball to original position
    bx = 400;
    by = 300;
     
    // Sets random direction of ball to go x-axis 
    rand = ((Math.random() * 2) -1);
    if (rand >= 0){
        speedX = 1;
    }else{
        speedX = -1;
    }
    
    // Sets random direction of ball to go y-axis 
    rand = ((Math.random() * 2) -1);
    if (rand >= 0){
        speedY = 1;
    }else{
        speedY = -1;
    }
 }

 
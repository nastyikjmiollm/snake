let gameState = 'game';
let headX = 0;
let headY = 0;
let moveX = 0;
let moveY = 0;
let tail = [];
let foodX = Math.floor(Math.random() * 20) * 20;
let foodY = Math.floor(Math.random() * 20) * 20;
let score = 0;

function setup() {
  createCanvas(400, 400);
  text('score', 50, 50);
  
  reloadButton = createButton('Reload game');
  reloadButton.size (100, 50);
  reloadButton.position(150, 220);
  reloadButton.hide()
  reloadButton.addClass('reload-bytton');
  
  reloadButton.mousePressed(reload);
}

function addTail(){
  tail.push({
    x: headX,
    y: headY
  })
}
function updateTail(targetX, targetY){
  if (tail.length > 0){
    for (let i = tail.length - 1; i > 0; i--){
      tail[i].x = tail[i - 1].x;
      tail[i].y = tail[i - 1].y;
  }
  tail[0].x = targetX;
  tail[0].y = targetY
}
}
function drawTail(){
  fill(157, 157, 255);
  for (let i = 0; i < tail.length; i++){
    rect(tail[i].x, tail[i].y, 20, 20);
  }
}
function draw() {
  if(gameState === 'game'){
     background(238, 253, 180);
     drawScore();
    fill(157,157,255);
    stroke(0);
    rect(headX, headY, 20, 20);
    fill(254, 57, 78)
    rect(foodX, foodY, 20, 20 )
    
    if (headX === foodX && headY === foodY){
 foodX = Math.floor(Math.random() * 20) * 20;
 foodY = Math.floor(Math.random() * 20) * 20; 
      addTail();
      score += 1;
    }
   
    if (frameCount % 10 == 0){
      updateTail(headX, headY);
      headX += moveX;
      headY += moveY;
      checkCollision();
      
      if (headX >= 400) {
        headX = 0;
      } else if (headX < 0) {
        headX = 380;
      }
      
      if (headY >= 400) {
        headY = 0;
      } else if (headY < 0) {
        headY = 380;
      }
      
    }
    drawTail();
    drawScore();
  }else if(gameState === 'game over'){
    background('red');
    
    textSize(40)
    fill(0, 0, 0);
    text("Game Over", 150, 150);
    textSize(32);
    text("Your result:" + score, 150, 200);
    
    reloadButton.show();
  }
}
function keyPressed() {
  if (keyCode === UP_ARROW && moveY !== 20) {
    moveX = 0;
    moveY = -20;
    
  } else if (keyCode === DOWN_ARROW && moveY !== -20) {
    moveX = 0;
    moveY= 20;
    
  } else if (keyCode === LEFT_ARROW && moveX !== 20) {
    moveX = -20;
    moveY = 0;
    
  } else if (keyCode === RIGHT_ARROW && moveX !== -20) {
    moveX = 20;
    moveY = 0;
  }
}
function checkCollision(){
  for (let i = 2; i < tail.length; i++){
    if (headX === tail[i].x && headY === tail[i].y){
    gameState = 'game over';
  }
}
}
function drawScore(){
  textSize(22);
  fill(0, 0, 0);
  text("Score: " + score, 50, 30);
}

function reload(){
  headX = 0;
  headY = 0;
  moveX = 20;
  moveY = 0;
  
  foodX = Math.floor(Math.random() * 20) * 20;
  foodY = Math.floor(Math.random() * 20) * 20;
  
  tail = [];
  
  score = 0;
  
  reloadButton.hide()
  
  gameState = 'game';
}
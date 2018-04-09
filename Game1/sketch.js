

function setup() {
  createCanvas(480,520);
  noStroke();
  board = new Board();
  textSize(15);
  frameRate(2);
  message = "Game 1 Recorded";
}


function draw() {
  background(255);
  noStroke();
  fill("#000000");
  text(message,0,500);
  board.draw();
  if(games.length > 0) board.makeMove();
}

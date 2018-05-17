//Followed https://www.youtube.com/watch?v=_p5IH0L63wo somewhate loosely


function setup() {
  createCanvas(480,520);
  noStroke();
  board = new Board();
  message = "Computer is thinking...";
  textSize(15);
  frameRate(.5);
}


function draw() {
  background(255);
  noStroke();
  fill("#000000");
  text(message,0,500);
  board.draw();
  message = "Computer thinks the score is: " + board.score();
}

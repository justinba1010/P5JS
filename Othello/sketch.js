//Followed https://www.youtube.com/watch?v=_p5IH0L63wo somewhate loosely


function setup() {
  createCanvas(480,480);
  noStroke();
  board = new Board();
}


function draw() {
  board.draw();
}

var ship;
var bullets;
var enemies;

function setup() {
  createCanvas(argWidth,argHeight);
  ship = new Ship();
  bullets = [];
  enemies = [];
  frameRate(50);


}



function draw() {
  background(0);
  ship.draw();
  ship.update();

}

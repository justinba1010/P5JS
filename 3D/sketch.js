function setup() {
	createCanvas(window.innerWidth,window.innerHeight, WEBGL);
}

function draw() {
	background(100);

	noStroke();
	fill(50);
	push();
	translate(0, 0);
	rotateY(1);
	rotateX(-0);

	noFill();
	stroke(255);
	push();
	translate(500, height*0.2, -400);
  fill(255,255,0);
	sphere(300);
	pop();
}

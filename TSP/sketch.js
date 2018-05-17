var cities = [];
var totalCities = 25;
var recordDistance = Infinity;
var bestPath = [];
var end = false;

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  for(var i = 0; i < totalCities; i++) {
    var v = createVector(random(width),random(height));
    cities[i] = v;
  }

}

function draw() {
  fill(255);
  background(0);  for(var i = 0; i < cities.length; i++) {
      ellipse(cities[i].x,cities[i].y,10,10);
    }
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for(var i = 0; i < cities.length; i++) {
    vertex(cities[i].x,cities[i].y);
  }
  endShape();


  if(recordDistance > calcDistance(cities)) {
    recordDistance = calcDistance(cities);
    bestPath = cities.slice();
  }

  for(var i = 0; i < cities.length; i++) {
      ellipse(bestPath[i].x,bestPath[i].y,10,10);
    }
  stroke(255,0,255);
  strokeWeight(3);
  noFill();
  beginShape();
  for(var i = 0; i < cities.length; i++) {
    vertex(bestPath[i].x,bestPath[i].y);
  }
  endShape();


  var i = floor(random(totalCities));
  var j = floor(random(totalCities));
  swap(cities, i, j);
}

function swap(array, i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function calcDistance(array) {
  var sum = 0;
  for(var i = 0; i < array.length-1; i++) {
    var d = dist(array[i].x,array[i].y,array[i+1].x,array[i+1].y);
    sum+=d;
  }
  return sum;
}

function mousePressed() {
  end = true;
}

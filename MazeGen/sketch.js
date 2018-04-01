//Followed https://www.youtube.com/watch?v=_p5IH0L63wo somewhate loosely


var cols, rows;
var w = 25;
var grid = [];
var stack = [];
var c = 5
var current;

function setup() {
  createCanvas(600,600);
  cols = floor(height/w);
  rows = floor(width/w);

  //Draw entry and exit around
  strokeWeight(2);
  stroke("#FFF");

  line(c,1,width-1,1);
  line(1,w,1,height-1);
  line(width-1, 1, width-1, height-1);
  line(width-1, height-1, width-w, height-c);
  noStroke();
  //Create Cells
  for(var i = 0; i < rows; i++) {
    for(var j = 0; j < cols; j++) {
      var cell = new Cell(i,j);
      grid.push(cell);
    }//for j
  }//for i

  //frameRate(100);

  current = grid[0];
}


function removeWalls(a,b) {
  var x = a.x - b.x;
  var y = a.y - b.y;

  if(y == -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  } else if (y == 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if(x == -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  } else if(x == 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  }//switch
}//removeWalls


function draw() {
  background(51);
  for(var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  current.visited = true;
  //STEP 1
  var next = current.checkNeighbors();
  current.highlight();

  if(next) {
    next.visited = true;

    stack.push(current);
    //STEP 3
    removeWalls(current, next);
    //STEP 4
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}


function index(x,y) {
  if(x < 0 || y < 0 || x > rows-1 || y > cols-1) return -1;
  return x * cols + y;
}

function Cell(x,y) {
  this.x = x;
  this.y = y;
  this.walls = [true,true,true,true];
  this.visited = false;

  this.show = function() {
    var width = this.x*w;
    var height = this.y*w;
    stroke(255);
    if(this.walls[0]) {
      line(width, height, width + w, height);//top
    }
    if(this.walls[1]) {
      line(width + w, height, width + w, height + w);//left
    }
    if(this.walls[2]) {
      line(width, height + w, width + w, height + w);//bottom

    }
    if(this.walls[3]) {
      line(width, height, width, height + w);//left
    }

    if(this.visited) {
      noStroke();
      fill(255,0,255,100);
      rect(width,height,w,w);
    }//if
  }//show

  this.highlight = function() {
    var x = this.x*w;
    var y = this.y*w;
    noStroke();
    fill(0,0,255,100);
    rect(x,y,w,w);

  }


  this.checkNeighbors = function() {
    var neighbors = [];
    var top = grid[index(this.x-1,this.y)];
    var right = grid[index(this.x,this.y+1)];
    var left = grid[index(this.x,this.y-1)];
    var bottom = grid[index(this.x+1,this.y)];

    if(top && !top.visited) {
      neighbors.push(top);
    }
    if(right && !right.visited) {
      neighbors.push(right);
    }
    if(left && !left.visited) {
      neighbors.push(left);
    }
    if(bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (neighbors.length > 0) {
      var r = floor(random(0,neighbors.length));
      return neighbors[r];
    }
    return undefined;
  }
}

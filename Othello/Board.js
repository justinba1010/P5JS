var cellwidth = 60;
var cellheight = 60;
var vectors = [[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[0,1],[-1,0],[0,-1]];


function Board() {
  this.gameboard = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,-1,0,0,0],[0,0,0,-1,1,0,0,0]
  ,[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],];
  this.move = 1;

  this.draw = function() {
    for(var i = 0; i < this.gameboard.length; i++) {
      for(var j = 0; j < this.gameboard[i].length; j++) {
        fill("#005522");
        stroke(0);
        rect(j*cellwidth, i*cellwidth,cellwidth,cellheight);
        if(this.gameboard[i][j] != 0) {
          color = (this.gameboard[i][j] == 1) ? "#FFFFFF" : "#000000";
          fill(color);
          ellipse(j*cellwidth+cellwidth/2,i*cellheight+cellheight/2,cellwidth,cellheight);
        }
      }//j
    }//i
  }//draw

 this.generateLegalMoves = function(turn) {
    legalMoves = [];
    for(var x = 0; x < this.gameboard.length; x++) {
      for(var y = 0; y < this.gameboard[x].length; y++) {
        move = [x,y,turn];
        if(this.isLegalMove(move)) {
          legalMoves.push(move);
        }// add move
      }// for y
    }// for x
    return legalMoves;
  }//generateLegalMoves

  this.isLegalMove = function(move) {
    x = move[0];
    y = move[1];
    if(this.whoIs(x,y) != 0) return false;
    return this.takeBlocks(move).length > 0;
  }//isLegalMove

  this.whoIs = function(xy) {
    if(xy.length != 2) return 0;
    if(!this.onBoard(xy)) return 0;
    return this.gameboard[xy[0]][xy[1]];
  }//whoIs

  this.onBoard = function(xy) {
    return(xy[0] >= 0 && xy[1] >= 0 && xy[0] < this.gameboard.length && xy[1] < this.gameboard[0].length);
  }//onboard

  this.takeBlocks = function(move) {
    //So we need at least one vector to have the other player indefinitely until we hit the player who made the move.
    startx = move[0];
    starty = move[1];
    takeBlocks = [];
    for(var i in vectors) {
      vector = vectors[i];
      console.log(vector);
      blocks = [];
      sandwich = false; //Check to make sure the pieces we are takg are sandwiched
      for(var j in this.vectorBlocks(startx, starty, vector)) {
        block = this.vectorBlocks(startx, starty, vector)[j];
        //Check if block is enemy, else we just break
        if(this.whoIs(block) == move[2]) {//If it is the same player as the move maker, we just break.
          break;
        }
        if(this.whoIs(block) == -1*move[2]) {//If it is the opposite player we want to add this block.
          sandwich = true;
        } else if(this.whoIs(block) == 0) {//If it is not a taken spot, then we can cut our search because we never got a sandwich.
          sandwich = false;
          break;
        }// else if
        blocks.push(block);//Add block because we did not hit our conditions
      }//for block
      if(sandwich) {
        for(var k in blocks) {
          block = blocks[k];
          takeBlocks.push(block);
        }//for block
      }//if sandwich
    }//for vector
    return takeBlocks;
  }//takeBlocks

  this.vectorBlocks = function(move) {
    blocks = [];
    x1 = move[0];
    y1 = move[1];
    vector = move[2];
    while(this.onBoard([x1,y1])) {
      newspaces = this.addVector(x1, y1, vector);
      x1 = newspaces[0];
      y1 = newspaces[1];
      if(this.onBoard([x1,y1])) {
        block = [x1,y1];
        blocks.push(block);
      }//if
    }//while
    return blocks;
  }//vectorBlocks

  this.addVector = function(x1,y1,vector) {
    newblock = [x1+vector[0],y1+vector[1]];
    return newblock;
  }//addVector

  this.score = function() {
    score = 0;
    for(var i = 0; i < this.gameboard.length; i++) {
      for(var j = 0; j < this.gameboard[i].length; j++) {
        score += board[i][j];
      }//for j
    }//for i
    return score;
  }//score
}//board

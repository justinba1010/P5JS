var cellwidth = 60;
var cellheight = 60;
var padding = 3;
var vectors = [[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[0,1],[-1,0],[0,-1]];


function Board() {
  this.gameboard = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,-1,0,0,0],[0,0,0,-1,1,0,0,0]
  ,[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],];

  this.draw = function() {
    for(var i = 0; i < this.gameboard.length; i++) {
      for(var j = 0; j < this.gameboard[i].length; j++) {
        fill("#005522");
        stroke(0);
        rect(j*cellwidth, i*cellwidth,cellwidth,cellheight);
        if(this.gameboard[i][j] != 0) {
          kolor = (this.gameboard[i][j] == 1) ? "#FFFFFF" : "#000000";
          fill(kolor);//color gives a warning
          ellipse(j*cellwidth+cellwidth/2,i*cellheight+cellheight/2,cellwidth-padding,cellheight-padding);
        }
      }//j
    }//i
  }//draw

  this.score = function() {
    score = 0;
    for(var i = 0; i < this.gameboard.length; i++) {
      for(var j = 0; j < this.gameboard.length; j++) {
        score += this.gameboard[i][j];
      }//for j
    }//for i
    return score;
  }//score

  this.makeMove = function(move) {
    if(this.isLegalMove(move)) {
      takeBlocks = this.takeBlocks(move);
      for(var i = 0; i < takeBlocks.length; i++) {
        this.gameboard[takeBlocks[i][0]][takeBlocks[i][1]] = move[2];
      }
    }
  }

  this.isLegalMove = function(move) {
    x = move[0];
    y = move[1];
    player = move[2];
    if(this.whoIs(x,y) != 0) return false;
    if(!this.onBoard(x,y)) return false;
    return this.takeBlocks(move).length > 0;
  }//isLegalMove

  this.whoIs = function(x,y) {
    if(this.onBoard(x,y)) return this.gameboard[x][y];
    return 0;
  }//whoIs

  this.onBoard = function(x,y) {
    return (x >= 0 && y >= 0 && x < this.gameboard.length && y < this.gameboard[x].length);
  }

  this.takeBlocks = function(move) {
    x = move[0];
    y = move[1];
    player = move[2];
    takeBlocks = [];
    for(i = 0; i < vectors.length; i++) {
      blocks = [];
      vector = vectors[i];
      sandwich = false;
      vectorblocks = this.vectorblocks(x,y,vector);
      for(j = 0; j < vectorblocks.length; j++) {
        vectorblock = vectorblocks[j];
        who = this.whoIs(vectorblock[0],vectorblock[1]);
        if(who == player) {
          //sandwich = false;
          break;
        }//if player is same break cause thats the end of takeblocks
        if(who*-1 == player) {
          sandwich = true;
        }//if player is different sandwich
        else if(who == 0) {
          sandwich = false;
          break;
        }//else
        blocks.push([vectorblock[0],vectorblock[1]]);
      }//var j
      if(sandwich) {
        for(var k = 0; k < blocks.length; k++){
          console.log(blocks[k]);
          takeBlocks.push([blocks[k][0],blocks[k][1]]);
        }//
      }//if sandwich
    }//var i
    return takeBlocks;
  }//takeBlocks

  this.vectorblocks = function(x,y,vector) {
    blocks = [];
    while(this.onBoard(x,y)) {
      x += vector[0];
      y += vector[1];
      if(this.onBoard(x,y)) {
        block = [x,y];
        blocks.push(block);
      }//if onBoard
    }//while onBoard
    return blocks;
  }//vectorblocks
}//board

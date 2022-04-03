class Cell {
  constructor(_x, _y, _size) {
    this.size = _size;
    this.x = _x;
    this.y = _y;
    this.isBomb = false;
    this.shown = false;
    this.numberOfNearBombs = 0;
    this.isFlagged = false;
  }

  uncover() {
    this.shown = true;
  }

  show() {
    //strokeWeight(1);
    //stroke(0);
    noStroke();

    if ((floor(this.x / this.size) + floor(this.y / this.size)) % 2 == 0) {
      fill(108, 174, 117);
    } else {
      fill(139, 189, 139);
    }

    if (this.shown) {
      if (this.isBomb) {
        fill(249, 65, 68);
        square(this.x, this.y, size);
      } else {
        if ((floor(this.x / this.size) + floor(this.y / this.size)) % 2 == 0) {
          fill(194, 141, 91);
          
        } else {
          fill(205, 162, 121);
          
        }
        square(this.x, this.y, size);

        if (this.numberOfNearBombs != 0) {
          push();
          fill(255);
          textSize(20);
          textAlign(CENTER);
          text(
            this.numberOfNearBombs,
            this.x + this.size / 2,
            this.y + this.size / 2 + 7
          );
          pop();
        }
      }
    } else {
      square(this.x, this.y, size);
    }
    
     if (this.isFlagged) {
      push();
      textSize(20);
      textAlign(CENTER);
      text("🚩", this.x + this.size / 2, this.y + this.size / 2 + 7);
      pop();
    }
  }
}

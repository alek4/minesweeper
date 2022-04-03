var millisecs = 0;
var seconds = 0;
var minutes = 0;
var start = true;

var msg = "You Lost!";

var bntAlreadyCreated = false;

const cells = [];
const size = 40;
const numOfSquaresPerSide = 10;
const screenSize = size * numOfSquaresPerSide;
const bombs = screenSize / size;
function setup() {
  createCanvas(screenSize, screenSize + 50);

  for (let i = 0; i < screenSize / size; i++) {
    const row = [];
    for (let j = 0; j < screenSize / size; j++) {
      cell = new Cell(size * j, size * i, size);
      row.push(cell);
    }
    cells.push(row);
  }

  for (let i = 0; i < bombs; i++) {
    var x, y;
    do {
      x = floor(random(floor(screenSize / size)));
      y = floor(random(floor(screenSize / size)));
    } while (cells[y][x].isBomb);

    cells[y][x].isBomb = true;
    //cells[y][x].shown = true;
    //console.log(cells[y][x]);
  }

  for (let i = 0; i < screenSize / size; i++) {
    for (let j = 0; j < screenSize / size; j++) {
      if (!cells[i][j].isBomb) {
        for (let x = j - 1; x <= j + 1; x++) {
          for (let y = i - 1; y <= i + 1; y++) {
            if (
              x >= 0 &&
              x < screenSize / size &&
              y >= 0 &&
              y < screenSize / size
            ) {
              if (cells[y][x].isBomb) {
                cells[i][j].numberOfNearBombs++;
              }
            }
          }
        }
      }
    }
  }
}

function uncoverCells(x, y) {
  if (x < 0 || x >= screenSize / size || y < 0 || y >= screenSize / size) {
    return;
  }

  if (cells[x][y].shown) {
    return;
  }

  if (cells[x][y].isBomb) {
    start = false;
    cells[x][y].uncover();
    return;
  }

  cells[x][y].uncover();

  if (cells[x][y].numberOfNearBombs == 0) {
    uncoverCells(x - 1, y);
    uncoverCells(x - 1, y - 1);
    uncoverCells(x, y - 1);
    uncoverCells(x + 1, y - 1);
    uncoverCells(x + 1, y);
    uncoverCells(x + 1, y + 1);
    uncoverCells(x, y + 1);
    uncoverCells(x - 1, y + 1);
  }
}

function mousePressed(e) {
  const j = floor(e.x / size);
  const i = floor(e.y / size);

  if (mouseButton == CENTER) {
    if (cells[i][j].isFlagged) {
      cells[i][j].isFlagged = false;
    } else if (!cells[i][j].shown) {
      cells[i][j].isFlagged = true;
    }
  }

  if (mouseButton == LEFT && start) {
    uncoverCells(i, j);
  }

  if (checkWin()) {
    msg = "You won!";
    start = false;
  }

  return false;
}

function checkWin() {
  let count = 0;
  for (let i = 0; i < screenSize / size; i++) {
    for (let j = 0; j < screenSize / size; j++) {
      if (cells[j][i].shown) {
        count++;
      }
    }
  }

  if (count === pow(numOfSquaresPerSide, 2) - bombs) {
    return true;
  }

  return false;
}

function draw() {
  background(19, 21, 21);

  for (let i = 0; i < screenSize / size; i++) {
    for (let j = 0; j < screenSize / size; j++) {
      cells[j][i].show();
    }
  }

  if (start) {
    if (int(millis() / 100) % 10 != millisecs) {
      millisecs++;
    }
    if (millisecs >= 10) {
      millisecs -= 10;
      seconds++;
    }
    if (seconds >= 60) {
      seconds -= 60;
      minutes++;
    }
  } else {
    fill(0, 0, 0, 100);
    square(0, 0, screenSize);
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text(msg, screenSize / 2, screenSize / 2);
  }

  push();
  fill(255);
  textSize(25);
  textAlign(LEFT, CENTER);
  text(
    nf(minutes, 2) + ":" + nf(seconds, 2) + "." + nf(millisecs, 1),
    20,
    height - 23
  );

  if (!start && !bntAlreadyCreated) {
    const btn = createButton("reset");
    btn.elt.classList.add("btn")
    console.log(btn);
    btn.position(screenSize / 2 - btn.width / 2, height - 39);
    btn.mousePressed(() => location.reload());
    noLoop();
    bntAlreadyCreated = true;
  }

  text(bombs, width - 85, height - 23);
  text("🚩", width - 50, height - 23);
  pop();
}

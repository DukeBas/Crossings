const maxTries = 30; // maximum amount of times a line can be regenerated per loop
const linesPerIteration = 20; // amount of lines per drawn frame

type Line = {
  start: p5.Vector,
  end: p5.Vector,
}

// Array holding all the previously placed lines
const lines: Line[] = [];

// run before first drawn frame
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);  // make canvas start in top-left corner
  canvas.style('z-index', '-1');  // set canvas as background
  frameRate(60);  // target framerate

  stroke(255);  // set drawing color to white
  strokeWeight(0.5);

  background(0);  // background color
}

// automatically called function to make canvas resize with window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// single drawing iteration
function draw() {
  for (let i = 0; i < linesPerIteration; i++) {
    // get a new line that doesn't intersect
    let newLine: Line;
    let attemptNumber = 0;
    do {
      attemptNumber++;
      newLine = {
        start: getPoint(),
        end: getPoint(),
      }
    } while (testLineAgainstSet(newLine, lines, IntersectionTest) && attemptNumber < maxTries);

    // only do things if we found a new valid line
    if (attemptNumber < maxTries) {
      // add the line to the known lines
      lines.push(newLine);

      // draw the line
      line(newLine.start.x, newLine.start.y, newLine.end.x, newLine.end.y);
    }
  }
}

// generates a random point on the canvas, returned as vector
function getPoint(): p5.Vector {
  return createVector(random(0, width), random(0, height));
}

// tests whether two linesegments intersect using determinant and testing if intersection is in the segments
// returns true if lines intersect, else false
// based on https://stackoverflow.com/a/24392281
function IntersectionTest(A: Line, B: Line): boolean {
  const det = (A.end.x - A.start.x) * (B.end.y - B.start.y) - (B.end.x - B.start.x) * (A.end.y - A.start.y);
  if (det === 0) {
    // parallel lines
    return false;
  } else {
    // check if the intersection is in the segments
    const lambda = ((B.end.y - B.start.y) * (B.end.x - A.start.x) + (B.start.x - B.end.x) * (B.end.y - A.start.y)) / det;
    const gamma = ((A.start.y - A.end.y) * (B.end.x - A.start.x) + (A.end.x - A.start.x) * (B.end.y - A.start.y)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
}

// tests a line against a set of lines using some set of lines using a given function
function testLineAgainstSet(A: Line, Set: Line[], func: Function): boolean {
  return Set.some((line) => {
    return func(A, line);
  });
}

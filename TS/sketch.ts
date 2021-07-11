const maxTries = 30; // maximum amount of times a line can be regenerated per loop
const linesPerIteration = 250; // amount of lines per drawn frame

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

  const l: Line = {
    start: createVector(1,1),
    end: createVector(2,2),
  };
  const k: Line = {
    start: createVector(0,0),
    end: createVector(1,0),
  };
}

// automatically called function to make canvas resize with window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  lines.length = 0; // clear lines array
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
    // } while (testLineAgainstSet(newLine, lines, IntersectionTest) && attemptNumber < maxTries);
    } while (testLineAgainstSet(newLine, lines, angleIntersectTest) && attemptNumber < maxTries);

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
function IntersectionTest(l: Line, m: Line): boolean {
  const det = (l.end.x - l.start.x) * (m.end.y - m.start.y) - (m.end.x - m.start.x) * (l.end.y - l.start.y);
  if (det === 0) {
    // parallel lines
    return false;
  } else {
    // check if the intersection is in the segments
    const lambda = ((m.end.y - m.start.y) * (m.end.x - l.start.x) + (m.start.x - m.end.x) * (m.end.y - l.start.y)) / det;
    const gamma = ((l.start.y - l.end.y) * (m.end.x - l.start.x) + (l.end.x - l.start.x) * (m.end.y - l.start.y)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
}

// tests whether two linesegments with the angle being in some range in [0, PI/2]
// assumes linesegments intersect
function angleTest(l: Line, m: Line, dStart: number, dEnd: number): boolean {
  let angle = angleBetweenLines(l, m);
  if (angle > Math.PI/2) {
    angle -= Math.PI/2;
  }
  return (angle >= dStart && angle <= dEnd);
}

// tests whether two linesegments intersect, and if they do if they are in a given domain
function angleIntersectTest(l: Line, m: Line, dStart: number, dEnd: number): boolean {
  return IntersectionTest(l, m) ? angleTest(l, m, 0, 22) : false;
}

// tests a line against a set of lines using some set of lines using a given function
function testLineAgainstSet(A: Line, Set: Line[], func: Function): boolean {
  return Set.some((line) => {
    return func(A, line);
  });
}

// returns the angle (between 0 to PI rads)
function angleBetweenLines(l: Line, k: Line): number {
  const dir_l = l.end.copy().sub(l.start);
  const dir_k = k.end.copy().sub(k.start);
  return Math.acos((dir_l.x*dir_k.x+dir_l.y*dir_k.y)/
  (Math.sqrt(Math.pow(dir_l.x, 2) + Math.pow(dir_l.y, 2))*Math.sqrt(Math.pow(dir_k.x, 2) + Math.pow(dir_k.y, 2))));
}

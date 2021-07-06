// Global variables and types
//...

// run before first drawn frame
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);  // make canvas start in top-left corner
  canvas.style('z-index', '-1');  // set canvas as background
  frameRate(60);  // target framerate
}

// automatically called function to make canvas resize with window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// single drawing iteration
function draw() {

}
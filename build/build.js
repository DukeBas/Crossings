function openSidebar() {
    document.getElementById("sidebar").style.width = "250px";
}
function closeSidebar() {
    document.getElementById("sidebar").style.width = "0";
}
var maxTries = 30;
var lines = [];
function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    frameRate(60);
    stroke(255);
    strokeWeight(0.5);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    var newLine;
    var attemptNumber = 0;
    do {
        attemptNumber++;
        newLine = {
            start: getPoint(),
            end: getPoint(),
        };
    } while (testLineAgainstSet(newLine, lines, IntersectionTest) && attemptNumber < maxTries);
    if (attemptNumber < maxTries) {
        lines.push(newLine);
        line(newLine.start.x, newLine.start.y, newLine.end.x, newLine.end.y);
    }
}
function getPoint() {
    return createVector(random(0, width), random(0, height));
}
function IntersectionTest(A, B) {
    var det = (A.end.x - A.start.x) * (B.end.y - B.start.y) - (B.end.x - B.start.x) * (A.end.y - A.start.y);
    if (det === 0) {
        return false;
    }
    else {
        var lambda = ((B.end.y - B.start.y) * (B.end.x - A.start.x) + (B.start.x - B.end.x) * (B.end.y - A.start.y)) / det;
        var gamma = ((A.start.y - A.end.y) * (B.end.x - A.start.x) + (A.end.x - A.start.x) * (B.end.y - A.start.y)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
}
function testLineAgainstSet(A, Set, func) {
    return Set.some(function (line) {
        return func(A, line);
    });
}
//# sourceMappingURL=../TS/TS/build.js.map
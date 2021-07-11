function openSidebar() {
    document.getElementById("sidebar").style.width = "250px";
}
function closeSidebar() {
    document.getElementById("sidebar").style.width = "0";
}
var maxTries = 30;
var linesPerIteration = 250;
var lines = [];
function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    frameRate(60);
    stroke(255);
    strokeWeight(0.5);
    background(0);
    var l = {
        start: createVector(1, 1),
        end: createVector(2, 2),
    };
    var k = {
        start: createVector(0, 0),
        end: createVector(1, 0),
    };
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    lines.length = 0;
}
function draw() {
    for (var i = 0; i < linesPerIteration; i++) {
        var newLine = void 0;
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
}
function getPoint() {
    return createVector(random(0, width), random(0, height));
}
function IntersectionTest(l, m) {
    var det = (l.end.x - l.start.x) * (m.end.y - m.start.y) - (m.end.x - m.start.x) * (l.end.y - l.start.y);
    if (det === 0) {
        return false;
    }
    else {
        var lambda = ((m.end.y - m.start.y) * (m.end.x - l.start.x) + (m.start.x - m.end.x) * (m.end.y - l.start.y)) / det;
        var gamma = ((l.start.y - l.end.y) * (m.end.x - l.start.x) + (l.end.x - l.start.x) * (m.end.y - l.start.y)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
}
function testLineAgainstSet(A, Set, func) {
    return Set.some(function (line) {
        return func(A, line);
    });
}
function angleBetweenLines(l, k) {
    var dir_l = l.end.sub(l.start);
    var dir_k = k.end.sub(k.start);
    return Math.acos((dir_l.x * dir_k.x + dir_l.y * dir_k.y) /
        (Math.sqrt(Math.pow(dir_l.x, 2) + Math.pow(dir_l.y, 2)) * Math.sqrt(Math.pow(dir_k.x, 2) + Math.pow(dir_k.y, 2))));
}
//# sourceMappingURL=../TS/TS/build.js.map
function openSidebar() {
    document.getElementById("sidebar").style.width = "250px";
}
function closeSidebar() {
    document.getElementById("sidebar").style.width = "0";
}
function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    frameRate(60);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
}
//# sourceMappingURL=../TS/TS/build.js.map
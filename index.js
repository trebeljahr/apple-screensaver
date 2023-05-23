function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

let timeOffsetX = 0;
let timeOffsetY = 0;
function draw() {
  background(color(16, 2, 26));
  const divisions = 20;
  timeOffsetX += 0.1;
  timeOffsetY += 0.1;
  for (let i = 0; i <= divisions; i++) {
    for (let j = 0; j <= divisions; j++) {
      const offsetX = i * Math.floor(width / divisions);
      const offsetY = j * Math.floor(height / divisions);

      drawLine(
        { x: offsetX, y: offsetY },
        {
          x: divisions / 2 + offsetX + timeOffsetX,
          y: divisions / 2 + offsetY + timeOffsetY,
        },
        color(180, 142, 166)
      );
    }
  }
}

function drawLine(point1, point2, color) {
  stroke(color);
  strokeWeight(4);
  line(point1.x, point1.y, point2.x, point2.y);
}

console.log("Hello World");

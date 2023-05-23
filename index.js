const lineObjects = [
  // {
  //   point1: { x: 0, y: 0 },
  //   point2: { x: 0, y: 0 },
  //   color: color(180, 142, 166),
  //   velocity: { x: 0, y: 0 },
  // },
];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  const divisions = 20;

  for (let i = 0; i < divisions + 2; i++) {
    for (let j = 0; j < divisions + 2; j++) {
      const offsetX = i * Math.floor(width / divisions);
      const offsetY = j * Math.floor(height / divisions);

      const newLineObject = {
        point1: { x: offsetX, y: offsetY },
        point2: {
          x: divisions / 2 + offsetX,
          y: divisions / 2 + offsetY,
        },
        color: color(
          180 + random(-30, 30),
          40 + random(0, 50),
          166 + random(-30, 30)
        ),
        velocity: { x: 0, y: 0 },
      };

      lineObjects.push(newLineObject);
    }
  }

  console.log(lineObjects.length);
  console.log(lineObjects);
}

function draw() {
  background(color(16, 2, 26));
  lineObjects.forEach((lineObject) => {
    drawLine(lineObject.point1, lineObject.point2, lineObject.color);
    lineObject.point2.x += lineObject.velocity.x;
    lineObject.point2.y += lineObject.velocity.y;

    lineObject.velocity.x += random(-0.1, 0.1);
    lineObject.velocity.y += random(-0.1, 0.1);
    // lineObject.point2.x = constrain(lineObject.point2.x, -10, 10);
    // lineObject.point2.y = constrain(lineObject.point2.y, -10, 10);

    lineObject.point2 = { x: mouseX, y: mouseY };
  });
}

function drawLine(point1, point2, color) {
  stroke(color);
  strokeWeight(4);
  line(point1.x, point1.y, point2.x, point2.y);
}

console.log("Hello World");

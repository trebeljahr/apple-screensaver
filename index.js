const pointObjects = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  const divisions = 40;

  for (let i = 0; i < divisions + 2; i++) {
    for (let j = 0; j < divisions + 2; j++) {
      const offsetX = i * Math.floor(width / divisions);
      const offsetY = j * Math.floor(height / divisions);

      const pointObject = {
        point: { x: offsetX, y: offsetY },
        color: color(
          180 + random(-30, 30),
          40 + random(0, 50),
          166 + random(-30, 30)
        ),
      };

      pointObjects.push(pointObject);
    }
  }

  console.log(pointObjects.length);
  console.log(pointObjects);
}

const maxLength = 30;
const noiseScale = 500;
const noiseStrength = 1;

function draw() {
  noStroke();
  // fill(0, 10);
  // rect(0, 0, width, height);
  background(0);

  pointObjects.forEach((lineObject) => {
    drawRectangle(lineObject.point, lineObject.color);
  });
}

function drawRectangle(point, lineColor) {
  push();

  const noiseFactor = noise(
    point.x / noiseScale,
    point.y / noiseScale,
    frameCount / noiseScale
  );

  let angle = noiseFactor * TWO_PI * noiseStrength;

  translate(point.x, point.y);
  rotate(angle);

  const lengthOfRect = 60;
  const widthOfRect = 5;

  fillGradient("linear", {
    from: [0, 0],
    to: [widthOfRect, lengthOfRect],
    steps: [color(0, 0, 0, 0), lineColor],
  });
  rect(0, 0, widthOfRect, lengthOfRect);

  pop();
}

console.log("Hello World");

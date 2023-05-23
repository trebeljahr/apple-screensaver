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
        color: {
          r: 180 + random(-30, 30),
          g: 40 + random(0, 50),
          b: 166 + random(-30, 30),
        },
      };

      pointObjects.push(pointObject);
    }
  }

  console.log(pointObjects.length);
  console.log(pointObjects);
}

const noiseScale = 500;
const noiseStrength = 2;

function draw() {
  noStroke();
  background(0);

  pointObjects.forEach((lineObject) => {
    drawRectangle(lineObject.point, lineObject.color);
  });
}

function drawRectangle(point, lineColor) {
  const colorNoiseFactor = noise(
    point.x / noiseScale,
    point.y / noiseScale,
    frameCount / noiseScale
  );

  const transparency = map(colorNoiseFactor, 0, 1, 0, 255);

  const noiseFactor =
    1 -
    noise(
      point.x / noiseScale,
      point.y / noiseScale,
      frameCount / 2 / noiseScale
    );

  let angle = noiseFactor * TWO_PI * noiseStrength;

  push();
  translate(point.x, point.y);
  rotate(angle);

  const lengthOfRect = 60 + noiseFactor * 100;
  const widthOfRect = 5;

  fillGradient("linear", {
    from: [0, 0],
    to: [widthOfRect, lengthOfRect],
    steps: [
      color(20, 20, 20, 0),
      color(lineColor.r, lineColor.g, lineColor.b, transparency),
    ],
  });
  rect(0, 0, widthOfRect, lengthOfRect);

  pop();
}

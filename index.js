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
  background(0);
  // rectMode(CORNERS);
  const divisions = 40;

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
        dir: { x: 0, y: 0 },
        speed: random(0.5, 2),
      };

      lineObjects.push(newLineObject);
    }
  }

  console.log(lineObjects.length);
  console.log(lineObjects);
}

const maxLength = 30;
const noiseScale = 500;
const noiseStrength = 1;

function flowFieldLines(lineObject, dir, speed) {
  const point = lineObject.point2;
  const noiseFactor = noise(
    point.x / noiseScale,
    point.y / noiseScale,
    frameCount / noiseScale
  );
  let angle = noiseFactor * TWO_PI * noiseStrength;
  dir.x = cos(angle);
  dir.y = sin(angle);
  const vel = { x: dir.x, y: dir.y };
  const d = 20;
  vel.x = vel.x * speed * d;
  vel.y = vel.y * speed * d;

  drawLine(
    lineObject.point1,
    {
      x: lineObject.point2.x + vel.x,
      y: lineObject.point2.y + vel.y,
    },
    lineObject.color
  );
}

function draw() {
  noStroke();
  // fill(0, 10);
  // rect(0, 0, width, height);
  background(0);

  lineObjects.forEach((lineObject) => {
    flowFieldLines(lineObject, lineObject.dir, lineObject.speed);
  });
}

function drawLine(point1, point2, lineColor) {
  push();

  const angle = atan2(point2.y - point1.y, point2.x - point1.x);
  translate(point1.x, point1.y);
  rotate(angle);
  const lengthOfRect = 60;
  const widthOfRect = 5;

  fillGradient("linear", {
    from: [0, 0],
    to: [widthOfRect, lengthOfRect],
    steps: [color(0), lineColor],
  });
  rect(0, 0, widthOfRect, lengthOfRect);

  pop();
  // line(point1.x, point1.y, point2.x, point2.y);
}

console.log("Hello World");

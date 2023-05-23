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

function movePoint(point, dir, speed) {
  const noiseFactor = noise(
    point.x / noiseScale,
    point.y / noiseScale,
    frameCount / noiseScale
  );
  let angle = noiseFactor * TWO_PI * noiseStrength;
  dir.x = cos(angle);
  dir.y = sin(angle);
  const vel = { x: dir.x, y: dir.y };
  const d = 1;
  vel.x = vel.x * speed * d;
  vel.y = vel.y * speed * d;

  point.x += vel.x;
  point.y += vel.y;

  if (point.x < 0 || point.x > width || point.y < 0 || point.y > height) {
    point.x = random(width * 1.2);
    point.y = random(height);
  }
}

function draw() {
  noStroke();
  fill(0, 10);
  rect(0, 0, width, height);

  lineObjects.forEach((lineObject) => {
    movePoint(lineObject.point2, lineObject.dir, lineObject.speed);
    fill(lineObject.color);
    circle(lineObject.point2.x, lineObject.point2.y, 10);
  });
}

function drawLine(point1, point2, color) {
  stroke(color);
  strokeWeight(2);
  line(point1.x, point1.y, point2.x, point2.y);
}

console.log("Hello World");

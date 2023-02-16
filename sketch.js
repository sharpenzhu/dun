let str = "HAPPY-BIRTHDAY-TO-DONG";
let xspacing = 10;
let w, h;
let theta = 0.0;
let amplitude = 100.0;
let period = 80.0;
let dx;
let yvalues;
let colors = [
  "#ff5555", // 红色
  "#ffaa00", // 橙色
  "#ffff00", // 黄色
  "#55ff55", // 绿色
  "#5555ff" // 蓝色
];
let colorIndex = 0;
let colorChangeInterval = 60;
let colorChangeCounter = 0;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = width / 2;
  h = height / 2;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
    noStroke();
}

function draw() {
  // 动态调整画布大小
  if (w != width / 2 || h != height / 2) {
    w = width / 2;
    h = height / 2;
    yvalues = new Array(floor(w / xspacing));
    dx = (TWO_PI / period) * xspacing;
  }

  // 将画布背景设置为黑色
  background(0);

  // 更新波浪的速度
  theta += map(mouseX, 0, width, 0.01, 0.05);

  // 计算波浪的高度
  calcWave();

  // 在画布中央渲染字符波浪
  push();
  translate(w, h);
  textSize(50);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < str.length; i++) {
    let charX = i * 40 - (str.length * 20) + 20;
    let charY = yvalues[i];
    // 根据计数器和间隔时间来控制是否更改字符颜色
    if (colorChangeCounter >= colorChangeInterval) {
      colorIndex = (colorIndex + 1) % colors.length;
      colorChangeCounter = 0;
    }
    let c = color(colors[colorIndex]);
    fill(c);
    noStroke();
    text(str.charAt(i), charX, charY);
  }
  pop();
  
  colorChangeCounter++;
}

function calcWave() {
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
 fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Click anywhere to DunDunDun（＾∀＾）", width / 2, height / 2);

  for (let i = 0; i < particles.length; i++) {
    particles[i].display();
    particles[i].move();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

function mouseClicked() {
  for (let i = 0; i < 20; i++) {
    let p = new Particle(mouseX, mouseY);
    particles.push(p);
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(3, 5));
    this.acc = createVector(0, 0.1);
    this.size = random(5, 20);
    this.shape = int(random(3));
    this.color = color(random(255), random(255), random(255), 200);
    this.life = int(random(50, 150));
  }

  move() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.life--;
  }

  isDead() {
    return this.life <= 0;
  }

  display() {
    fill(this.color);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    switch (this.shape) {
      case 0:
        triangle(-this.size / 2, -this.size / 2, this.size / 2, -this.size / 2, 0, this.size / 2);
        break;
      case 1:
        rect(-this.size / 2, -this.size / 2, this.size, this.size);
        break;
      case 2:
        ellipse(0, 0, this.size, this.size);
        break;
    }
    pop();
  }
}

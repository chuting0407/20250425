let bubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background(255); // 背景白色

  // 產生 40 個隨機泡泡
  for (let i = 0; i < 40; i++) {
    let bubble = new Bubble(
      random(width), // 隨機 x 座標
      random(height), // 隨機 y 座標
      random(10, 50) // 隨機大小
    );
    bubbles.push(bubble);
  }
}

function draw() {
  background(255); // 每次重繪背景白色

  // 更新並顯示所有泡泡
  for (let bubble of bubbles) {
    bubble.update();
    bubble.display();
  }
}

// 泡泡類別
class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.baseColor = color(random(255), random(255), random(255)); // 隨機基礎顏色
    this.alpha = random(50, 200); // 初始透明度
    this.xSpeed = random(-2, 2); // 隨機水平速度
    this.ySpeed = random(-2, 2); // 隨機垂直速度
  }

  update() {
    // 泡泡隨機飄動
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // 碰到邊界反彈
    if (this.x - this.r < 0 || this.x + this.r > width) {
      this.xSpeed *= -1;
    }
    if (this.y - this.r < 0 || this.y + this.r > height) {
      this.ySpeed *= -1;
    }

    // 根據滑鼠位置改變大小
    let distanceToMouse = dist(mouseX, mouseY, this.x, this.y);
    this.r = map(distanceToMouse, 0, width, 50, 10); // 距離越近泡泡越大，越遠越小
  }

  display() {
    fill(red(this.baseColor), green(this.baseColor), blue(this.baseColor), this.alpha);
    noStroke();

    // 計算三角形的三個頂點
    let x1 = this.x;
    let y1 = this.y - this.r;
    let x2 = this.x - this.r * cos(PI / 6);
    let y2 = this.y + this.r * sin(PI / 6);
    let x3 = this.x + this.r * cos(PI / 6);
    let y3 = this.y + this.r * sin(PI / 6);

    // 繪製三角形
    triangle(x1, y1, x2, y2, x3, y3);
  }
}

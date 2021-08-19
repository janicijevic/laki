// Original code by Daniel Shiffman (Coding Train)

class Particle {
    constructor(x, y, hu, firework) {
      this.pos = createVector(x, y);
      this.firework = firework;
      this.lifespan = 255;
      this.hu = hu;
      this.acc = createVector(0, 0);
      if (this.firework) {
        this.vel = createVector(random(-8, 8), random(-17, -15));
      } else {
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(2, 20));
      }
    }
  
    applyForce(force) {
      this.acc.add(force);
    }
  
    update() {
      if (!this.firework) {
        this.vel.mult(0.9);
        this.lifespan -= 2;
      }
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  
    done() {
      if (this.lifespan < 0) {
        return true;
      } else {
        return false;
      }
    }
  
    show() {
      colorMode(HSB);
  
      if (!this.firework) {
        strokeWeight(2);
        stroke(this.hu, 255, 255, this.lifespan/255);
      } else {
        strokeWeight(4);
        stroke(this.hu, 255, 255, this.lifespan);
      }
  
      point(this.pos.x, this.pos.y);
    }
  }
// Original code by Daniel Shiffman (Coding Train)

class Firework {
    constructor(vx = 0, vy = 0, letter = "") {
      this.hu = random(255);
      this.firework = new Particle(width/2+random(20), height, this.hu, true);
      this.exploded = false;
      this.particles = [];
      this.letter = letter;
        if(letter != "")
          this.firework.vel = createVector(vx, vy);
    }
  
    done() {
      if (this.exploded && this.particles.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  
    update() {
      if (!this.exploded) {
        this.firework.applyForce(gravity);
        this.firework.update();
  
        if (this.firework.vel.y >= 0) {
          if(this.letter != "")
            this.explodeToLetter(this.letter);
          else 
            this.explode();
          this.exploded = true;
        }
      }
  
      for (let i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].applyForce(gravity);
        this.particles[i].update();
  
        if (this.particles[i].done()) {
          this.particles.splice(i, 1);
        }
      }
    }
  
    explode() {
      for (let i = 0; i < 100; i++) {
        let p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false);
        this.particles.push(p);
      }
    }

    explodeToLetter(c){
        let pts = font.textToPoints(c, 0, 0, fSize, {sampleFactor: 0.1, simplifyThreshold: 0.0});
        let letterW = max(pts.map(i=>i.x));
        let letterH = -min(pts.map(i=>i.y));
        // console.log(letterH);
        // console.log(pts);

        for(let i = 0; i<pts.length; i++){
            let x = pts[i].x - letterW/2;
            let y = pts[i].y + letterH/2;
            let p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false);
            p.lifespan = 512;
            p.vel = createVector(x, y).mult(1/5);
            this.particles.push(p);
        }
    }
  
    show() {
      if (!this.exploded) {
        this.firework.show();
      }
  
      for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].show();
      }
    }
  }
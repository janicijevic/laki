// Original code by Daniel Shiffman (Coding Train)

const fireworks = [];
let gravity, font, pts;

function preload() {
    // preload OTF font file
    font = loadFont('./Roboto-Regular.ttf')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
  
  fSize = width/10;
  textFont(font);
  textSize(fSize);

  showMessage();


}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25);
  
  if (random(1) < 0.02) {
    fireworks.push(new Firework());
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }

}

function showMessage(){
    if(document.visibilityState == "hidden") {
        setTimeout(showMessage, 2000 + random(2000));
        return;
    }
    let msg, msgW, msgH;
    msg = "HAPPY";
    msgW = width/5;
    msgH = 18;
    for(let i = 0; i<msg.length; i++){
        let targetx = ((i+1/2)*msgW/msg.length - msgW/2)/20;
        fireworks.push(new Firework(targetx, -msgH, msg[i]));
    }
    msg = "BIRTHDAY!";
    msgW = width/3.5;
    msgH = 14;
    for(let i = 0; i<msg.length; i++){
        let targetx = ((i+1/2)*msgW/msg.length - msgW/2)/20;
        fireworks.push(new Firework(targetx, -msgH, msg[i]));
    }

    setTimeout(showMessage, 4000 + random(2000));
}


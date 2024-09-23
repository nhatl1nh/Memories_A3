let particles = [];
let texts = [];  // Array to store text for each particle
let conversation = [];  // Array to store conversation lines
let img1; // Declare image variable
let textSpawnCounter = 0; // Counter to control text spawning

function preload() {
  // Load images
  img1 = loadImage('./assets/100ppi/home.png'); // Path to your first image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  // Set the Google Font
  textFont('Handjet');  // Name of the font from Google Fonts

  // Populate conversation array with some example lines
  conversation = [
    "This was home... I grew up here, didn’t I? The big front door... so familiar...",
    "The bedroom... my room. It was small, with... with a window. I could see the tree from it. But... what kind of tree was it? Did I have... posters on the wall? Or... pictures?",
    "I remember... playing outside, with the neighbors... or maybe just my siblings. We used to laugh... didn’t we? Or was it quiet?",
    "Why can’t I see it anymore? It’s... right there, I know it... but it’s slipping away... Was this really home?"
  ];

  textAlign(CENTER);
  textSize(24);
  fill(0); // Set text color to black
}

function draw() {
  // Transparent background
  background(0, 0, 0, 0); // Set a transparent background

  // Display the instruction at the top center
  fill(0); // Set text color to black
  textSize(24);
  text("Each time I try to remember it, it became worse", width / 2, height / 8); // Upper center of the canvas

  // Display the first image (home)
  image(img1, windowWidth / 2, windowHeight / 2, windowWidth / 2, windowHeight / 2);

  // Spawn particles on mouse press
  if (mouseIsPressed) {
    particles.push(new Particle(mouseX, mouseY, 5, 75));
    textSpawnCounter++; // Increment the counter

    // Spawn text every 5 particles
    if (textSpawnCounter % 5 === 0) {
      let randomLine = random(conversation); // Get a random line from the conversation
      texts.push(randomLine); // Add the random conversation line as text for the particle
    }
  }

  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update(particles);
    particles[i].show();
    // Display text associated with each particle
    fill(255);
    textSize(16);
    text(texts[i], particles[i].location.x, particles[i].location.y - 20); // Display text above the particle

    if (particles[i].alpha <= 2) {
      particles.splice(i, 1); // Remove dead particles
      texts.splice(i, 1);     // Remove corresponding text
    }
  }
}

// Particle class
class Particle {
  constructor(x, y, r, a) {
    this.location = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector();
    this.alpha = this.palpha = a;
    this.amp = 3; // Size of the particle
    this.rate = r;
  }

  update(p) {
    this.acceleration.add(createVector(noise(this.location.x) * 2 - 1, noise(this.location.y) * 2 - 1));
    this.velocity.add(this.acceleration);
    this.acceleration.set(0, 0);
    this.location.add(this.velocity);
    this.alpha -= this.rate;

    // Recursion condition
    if (this.alpha <= this.palpha * 0.25 && this.palpha > 10) {
      p.push(new Particle(this.location.x, this.location.y, this.rate * 0.25, this.palpha * 0.5));
    }
  }

  show() {
    noStroke();
    fill(0, 35, 25, this.alpha);
    ellipse(this.location.x, this.location.y, this.amp);
  }
}

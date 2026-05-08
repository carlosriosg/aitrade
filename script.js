const canvas = document.getElementById('particle-canvas');
const context = canvas.getContext('2d');
const particles = [];
const particleCount = 120;

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 1 + Math.random() * 2.5;
    this.speed = 0.33 + Math.random() * 0.8;
    this.alpha = 0.2 + Math.random() * 0.3;
    this.angle = Math.random() * Math.PI * 2;
    this.length = 24 + Math.random() * 20;
    this.velocity = Math.random() * 0.6 - 0.3;
  }

  update() {
    this.angle += this.velocity * 0.005;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    if (this.x < -50 || this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) {
      this.reset();
      this.y = Math.random() * canvas.height;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.fillStyle = `rgba(75, 212, 255, ${this.alpha})`;
    context.fillRect(0, 0, this.length, this.size);
    context.restore();
  }
}

const initParticles = () => {
  particles.length = 0;
  for (let i = 0; i < particleCount; i += 1) {
    particles.push(new Particle());
  }
};

const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
};

const animate = () => {
  draw();
  requestAnimationFrame(animate);
};

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

resizeCanvas();
initParticles();
animate();

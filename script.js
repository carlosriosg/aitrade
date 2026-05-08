const canvas = document.getElementById('particle-canvas');
const context = canvas.getContext('2d');
const particles = [];
const particleCount = 600;
const mouse = { x: null, y: null, moved: false };

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.homeX = Math.random() * canvas.width;
    this.homeY = Math.random() * canvas.height;
    this.x = this.homeX;
    this.y = this.homeY;
    this.size = 1 + Math.random() * 2;
    this.vx = (Math.random() - 0.5) * 0.65;
    this.vy = (Math.random() - 0.5) * 0.65;
    this.alpha = 0.18 + Math.random() * 0.28;
  }

  update() {
    // Fuerza suave hacia home
    const dxHome = this.homeX - this.x;
    const dyHome = this.homeY - this.y;
    this.vx += dxHome * 0.00005; // Fuerza muy pequeña para movimiento orgánico
    this.vy += dyHome * 0.00005;

    if (mouse.moved) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 180;
      if (dist < maxDist && dist > 1) {
        const force = (maxDist - dist) / maxDist;
        this.vx += (dx / dist) * force * 0.14;
        this.vy += (dy / dist) * force * 0.14;
      }
    }

    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.96;
    this.vy *= 0.96;

    // Rebote en los bordes en lugar de resetear
    if (this.x < 0) {
      this.x = 0;
      this.vx = -this.vx * 0.8; // Amortiguar un poco
    } else if (this.x > canvas.width) {
      this.x = canvas.width;
      this.vx = -this.vx * 0.8;
    }
    if (this.y < 0) {
      this.y = 0;
      this.vy = -this.vy * 0.8;
    } else if (this.y > canvas.height) {
      this.y = canvas.height;
      this.vy = -this.vy * 0.8;
    }
  }

  draw() {
    context.fillStyle = `rgba(75, 212, 255, ${this.alpha})`;
    context.fillRect(this.x, this.y, this.size, this.size);
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

window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  mouse.moved = true;
});

window.addEventListener('mouseleave', () => {
  mouse.moved = false;
});

resizeCanvas();
initParticles();
animate();

// Logo hover effect
const logo = document.querySelector('.hero-logo');
logo.addEventListener('mouseover', () => {
  logo.style.filter = 'drop-shadow(0 0 20px rgba(75, 212, 255, 0.8)) brightness(1.2)';
  logo.style.transform = 'scale(1.05)';
  logo.style.transition = 'all 0.8s ease';
});

logo.addEventListener('mouseout', () => {
  logo.style.filter = '';
  logo.style.transform = '';
});

document.addEventListener('DOMContentLoaded', function() {
    // Variables para el carrusel
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    const totalItems = items.length;
    
    // Variables para la celebración
    const celebrateBtn = document.getElementById('celebrateBtn');
    const birthdayAudio = document.getElementById('birthdayAudio');
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let isCelebrating = false;
    
    // Configurar canvas
    function setupCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Configurar el carrusel
    function updateCarousel() {
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    // Event listeners para los botones del carrusel
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });
    
    // Auto-avance del carrusel cada 5 segundos
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 5000);
    
    // Clase para partículas de confeti
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * -canvas.height;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height - 20;
            this.size = Math.random() * 10 + 5;
            this.speed = Math.random() * 3 + 2;
            this.angle = Math.random() * Math.PI * 2;
            this.spin = Math.random() * 0.2 - 0.1;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.rotation = 0;
        }
        
        update() {
            this.y += this.speed;
            this.angle += 0.01;
            this.rotation += this.spin;
            
            if (this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
            ctx.restore();
        }
    }
    
    // Crear partículas de confeti
    function createParticles(count) {
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    
    // Animación del confeti
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        animationId = requestAnimationFrame(animateConfetti);
    }
    
    // Función para celebrar (30 segundos de confeti)
    function startCelebration() {
        if (isCelebrating) {
            stopCelebration();
            return;
        }
        
        isCelebrating = true;
        celebrateBtn.textContent = 'Detener';
        
        // Iniciar audio
        birthdayAudio.currentTime = 0;
        birthdayAudio.play().catch(e => {
            alert("Por favor, haz clic en la página primero para permitir el audio");
        });
        
        // Iniciar confeti
        particles = [];
        createParticles(100);
        animateConfetti();
        
        // Detener después de 30 segundos
        setTimeout(() => {
            if (isCelebrating) {
                stopCelebration();
            }
        }, 30000);
    }
    
    // Función para detener la celebración
    function stopCelebration() {
        cancelAnimationFrame(animationId);
        birthdayAudio.pause();
        celebrateBtn.textContent = '¡Celebrar!';
        isCelebrating = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    // Event listener para el botón de celebrar
    celebrateBtn.addEventListener('click', startCelebration);
    
    // Configurar canvas al cargar y redimensionar
    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    
    // Toque en cualquier parte de la página para permitir audio en móviles
    document.body.addEventListener('click', function() {
        birthdayAudio.volume = 0;
        birthdayAudio.play().then(() => {
            birthdayAudio.pause();
            birthdayAudio.currentTime = 0;
            birthdayAudio.volume = 1;
        });
    }, { once: true });
});
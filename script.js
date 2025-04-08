document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const celebrateBtn = document.getElementById('celebrateBtn');
    const birthdayAudio = document.getElementById('birthdayAudio');
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    // Variables
    let currentIndex = 0;
    const totalItems = items.length;
    let isCelebrating = false;
    let carouselInterval;
    let audioReady = false;
    
    // Inicializar indicadores
    function initIndicators() {
        for (let i = 0; i < totalItems; i++) {
            const indicator = document.createElement('div');
            indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
                resetCarouselInterval();
            });
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Actualizar carrusel
    function updateCarousel() {
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar indicadores
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Añadir animación al item activo
        items.forEach(item => item.classList.remove('active'));
        items[currentIndex].classList.add('active');
        items[currentIndex].querySelector('img').classList.add('animate__animated', 'animate__zoomIn');
    }
    
    // Auto-avance del carrusel
    function startCarouselInterval() {
        carouselInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 5000);
    }
    
    function resetCarouselInterval() {
        clearInterval(carouselInterval);
        startCarouselInterval();
    }
    
    // Navegación del carrusel
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
        resetCarouselInterval();
    });
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
        resetCarouselInterval();
    });
    
    // Función para reproducir audio directamente
    function playAudioDirectly() {
        birthdayAudio.currentTime = 0;
        birthdayAudio.play().catch(e => {
            console.log("Error al reproducir:", e);
            // Intento alternativo para algunos navegadores
            document.body.addEventListener('click', function tempEnable() {
                birthdayAudio.play();
                document.body.removeEventListener('click', tempEnable);
            }, { once: true });
        });
    }
    
    // Función para lanzar confeti
    function launchConfetti() {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
        });
        
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });
    }
    
    // Función para celebrar
    function startCelebration() {
        if (isCelebrating) return;
        
        isCelebrating = true;
        celebrateBtn.innerHTML = '¡Disfruta tu Día!';
        
        // Reproducir audio directamente
        playAudioDirectly();
        
        // Lanzar confeti inicial
        launchConfetti();
        
        // Lanzar confeti cada segundo durante 30 segundos
        const confettiInterval = setInterval(launchConfetti, 1000);
        
        // Restablecer después de 30 segundos
        setTimeout(() => {
            clearInterval(confettiInterval);
            isCelebrating = false;
            celebrateBtn.innerHTML = '🎉 ¡Celebrar! 🎊';
        }, 30000);
    }
    
    // Inicialización
    initIndicators();
    startCarouselInterval();
    
    // Event listener para el botón
    celebrateBtn.addEventListener('click', startCelebration);
    
    // Crear elementos flotantes
    function createFloatingElements() {
        const container = document.querySelector('.floating-elements');
        const types = ['balloon', 'heart', 'star'];
        
        for (let i = 0; i < 15; i++) {
            const element = document.createElement('div');
            const type = types[Math.floor(Math.random() * types.length)];
            element.className = type;
            element.innerHTML = type === 'balloon' ? '🎈' : 
                              type === 'heart' ? '❤️' : '⭐';
            
            element.style.left = `${Math.random() * 100}%`;
            element.style.fontSize = `${Math.random() * 30 + 20}px`;
            element.style.animationDuration = `${Math.random() * 15 + 10}s`;
            element.style.animationDelay = `${Math.random() * 5}s`;
            
            container.appendChild(element);
        }
    }
    
    createFloatingElements();S
}); 
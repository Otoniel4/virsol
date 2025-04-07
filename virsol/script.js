document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const celebrateBtn = document.getElementById('celebrateBtn');
    const birthdaySong = document.getElementById('birthday-song');
    let isPlaying = false;

    // Configurar el botón de celebrar
    celebrateBtn.addEventListener('click', function() {
        // Reproducir o pausar la música
        if (isPlaying) {
            birthdaySong.pause();
            celebrateBtn.textContent = '¡Celebrar!';
        } else {
            birthdaySong.play().catch(e => {
                console.log("Error al reproducir audio:", e);
                // Mostrar mensaje si hay error con el audio
                alert("Para la mejor experiencia, permite la reproducción de audio en esta página");
            });
            celebrateBtn.textContent = '🛑 Detener';
        }
        isPlaying = !isPlaying;

        // Lanzar confeti
        launchConfetti();
        
        // Animación del botón
        this.classList.add('animate__animated', 'animate__pulse');
        setTimeout(() => {
            this.classList.remove('animate__animated', 'animate__pulse');
        }, 1000);
    });

    // Función para lanzar confeti
    function launchConfetti() {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
        });
        
        // Lanzar confeti desde los lados después de un retraso
        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff6b6b', '#48dbfb', '#1dd1a1']
            });
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#feca57', '#5f27cd', '#ff9ff3']
            });
        }, 250);
    }

    // Crear globos
    const balloonsContainer = document.querySelector('.balloons');
    for (let i = 0; i < 5; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${10 + i * 20}%`;
        balloon.style.animationDelay = `${i * 0.5}s`;
        balloonsContainer.appendChild(balloon);
    }

    // Efecto de escritura para el mensaje
    const message = "Que este día esté lleno de alegría, amor y muchas bendiciones. ¡Que todos tus deseos se hagan realidad!";
    const messageElement = document.querySelector('.message');
    messageElement.textContent = '';
    
    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < message.length) {
            messageElement.textContent += message.charAt(i);
            i++;
        } else {
            clearInterval(typingEffect);
        }
    }, 50);
});
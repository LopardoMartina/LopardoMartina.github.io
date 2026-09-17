
// Efecto de los puntitos en el hero
function createPuntos() {
    const hero = document.querySelector('.hero');
    const puntosCount = 50;

    for (let i = 0; i < puntosCount; i++) {
        const punto = document.createElement('div');
        punto.className = 'particle';
        punto.style.left = Math.random() * 100 + '%';
        punto.style.top = Math.random() * 100 + '%';
        punto.style.animationDelay = Math.random() * 2 + 's';
        punto.style.animationDuration = (Math.random() * 3 + 2) + 's';

        hero.appendChild(punto);
    }
}

// Crear puntos al cargar la página
document.addEventListener('DOMContentLoaded', createPuntos);

// Theme Toggle Funcionalidad
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
    
    // Guardar preferencia en localStorage
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


// Carga tema guardado
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.remove('dark-theme', 'light-theme');
    body.classList.add(savedTheme + '-theme');

    // Animación de las barras de skills al hacer scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
            }
        });
    }, observerOptions);

    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection && window.innerWidth > 768) {
        observer.observe(skillsSection);
    }

    // Animaciones de la sección About
    const aboutObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.7 });

    document.querySelectorAll('[data-aos]').forEach(el => {
        aboutObserver.observe(el);
    });

    // Smooth scroll para navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Formulario de contacto
    document.querySelector('.form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        const mailtoLink = `mailto:martulopardo0@gmail.com?subject=Contacto desde CV - ${name}&body=Nombre: ${name}%0AEmail: ${email}%0A%0AMensaje:%0A${message}`;
        window.location.href = mailtoLink;
    });
});
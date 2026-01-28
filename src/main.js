document.addEventListener('DOMContentLoaded', () => {
    // --- THREE.JS BACKGROUND ---
    const container = document.getElementById('hero-canvas-container');
    if (container) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const particleCount = 2000;

        for (let i = 0; i < particleCount; i++) {
            vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
            vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
            vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const material = new THREE.PointsMaterial({ color: 0x6366f1, size: 2 });
        const points = new THREE.Points(geometry, material);
        scene.add(points);

        camera.position.z = 500;

        // Mouse Interaction
        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
        });

        function animate() {
            requestAnimationFrame(animate);
            points.rotation.x += 0.001;
            points.rotation.y += 0.001;
            
            // Плавное следование за мышью
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    // Внутри DOMContentLoaded
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Наблюдаем за контентом секции About
const aboutContent = document.querySelector('.about__content');
if (aboutContent) {
    observer.observe(aboutContent);
    }
    // Внутри DOMContentLoaded после кода Intersection Observer

const benefitCards = document.querySelectorAll('.benefit-card');
const cardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Устанавливаем небольшую задержку для каждой следующей карточки
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

benefitCards.forEach(card => {
    // Начальное состояние для анимации
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    cardsObserver.observe(card);
});
    // Внутри DOMContentLoaded

const tabsButtons = document.querySelectorAll('.tabs__btn');
const tabsPanes = document.querySelectorAll('.tabs__pane');

tabsButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');

        // Убираем активные классы
        tabsButtons.forEach(b => b.classList.remove('active'));
        tabsPanes.forEach(p => p.classList.remove('active'));

        // Добавляем активные классы
        btn.classList.add('active');
        document.getElementById(target).classList.add('active');
        
        // Переинициализация иконок для новых элементов
        lucide.createIcons();
    });
});
});
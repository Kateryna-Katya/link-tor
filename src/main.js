/**
 * link-tor.life - Core System v1.0 (2026)
 * Includes: Three.js, Mobile Nav, Scroll Animations, Tabs, and AJAX-form logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК (LUCIDE) ---
    const initIcons = () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };
    initIcons();

    // --- 2. МОБИЛЬНОЕ МЕНЮ (БЕЗ ОВЕРЛЕЯ) ---
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav__menu');
    
    if (burger && navMenu) {
        const toggleMenu = () => {
            burger.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Блокировка скролла при открытом меню
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        };

        burger.addEventListener('click', toggleMenu);

        // Закрытие при клике на ссылки
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) toggleMenu();
            });
        });
    }

    // --- 3. ЭФФЕКТЫ СКРОЛЛА ДЛЯ HEADER ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 0';
            header.style.background = 'rgba(15, 15, 18, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(15, 15, 18, 0.8)';
        }
    });

    // --- 4. HERO BACKGROUND (THREE.JS) ---
    const initHero = () => {
        const container = document.getElementById('hero-canvas-container');
        if (!container || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Параметры частиц
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const particleCount = 2000;

        for (let i = 0; i < particleCount; i++) {
            vertices.push(THREE.MathUtils.randFloatSpread(1500)); 
            vertices.push(THREE.MathUtils.randFloatSpread(1500)); 
            vertices.push(THREE.MathUtils.randFloatSpread(1500)); 
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const material = new THREE.PointsMaterial({ color: 0x6366f1, size: 2, transparent: true, opacity: 0.6 });
        const points = new THREE.Points(geometry, material);
        scene.add(points);

        camera.position.z = 500;

        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.04;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.04;
        });

        function animate() {
            requestAnimationFrame(animate);
            points.rotation.y += 0.001;
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
    };
    initHero();

    // --- 5. ТАБЫ (ИННОВАЦИИ) ---
    const tabsButtons = document.querySelectorAll('.tabs__btn');
    const tabsPanes = document.querySelectorAll('.tabs__pane');

    tabsButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            tabsButtons.forEach(b => b.classList.remove('active'));
            tabsPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
            initIcons(); // Обновляем иконки в новом табе
        });
    });

    // --- 6. ОБРАБОТКА ФОРМЫ (VALIDATION & AJAX IMITATION) ---
    const contactForm = document.getElementById('ajax-form');
    const successMsg = document.getElementById('form-success');
    const captchaText = document.getElementById('captcha-question');
    const phoneInput = document.getElementById('phone');

    // Генерация капчи
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 5) + 1;
    const captchaResult = n1 + n2;
    if (captchaText) captchaText.textContent = `${n1} + ${n2}`;

    // Только цифры в телефоне
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Проверка капчи
            const userVal = parseInt(document.getElementById('captcha-answer').value);
            if (userVal !== captchaResult) {
                alert('Ошибка: Решите пример правильно.');
                return;
            }

            const btn = contactForm.querySelector('button');
            btn.disabled = true;
            btn.textContent = 'Отправка...';

            // Имитация задержки сети
            setTimeout(() => {
                contactForm.style.display = 'none'; // Скрываем саму форму
                successMsg.style.display = 'flex';  // Показываем блок успеха
                initIcons(); // Прогружаем иконку в блоке успеха
            }, 1500);
        });
    }

    // --- 7. COOKIE POPUP ---
    const cookiePop = document.getElementById('cookie-popup');
    const cookieBtn = document.getElementById('accept-cookies');

    if (cookiePop && !localStorage.getItem('cookieConsent')) {
        setTimeout(() => cookiePop.classList.add('active'), 2500);
    }

    if (cookieBtn) {
        cookieBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            cookiePop.classList.remove('active');
        });
    }

    // --- 8. АНИМАЦИЯ ПОЯВЛЕНИЯ (SCROLL REVEAL) ---
    const revealItems = document.querySelectorAll('.about__content, .benefit-card, .edu-card');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Если это преимущество, запускаем CSS-анимацию
                if (entry.target.classList.contains('benefit-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, { threshold: 0.1 });

    revealItems.forEach(item => obs.observe(item));
});
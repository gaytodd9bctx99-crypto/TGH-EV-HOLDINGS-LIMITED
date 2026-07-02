/* =========================================
   TGH EV Holdings Limited - JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Current Year
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Navbar Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // Mobile Menu
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPos = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Simulation
    const contactForm = document.getElementById('ev-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const ogText = btn.textContent;
            
            btn.innerHTML = '<span class="pulse-dot" style="display:inline-block; margin-right:8px;"></span> PROCESSING...';
            btn.disabled = true;
            btn.style.opacity = '0.8';

            setTimeout(() => {
                btn.innerHTML = 'CONNECTION ESTABLISHED';
                btn.style.background = '#00FF87'; 
                btn.style.color = '#000';
                
                setTimeout(() => {
                    contactForm.reset();
                    btn.innerHTML = ogText;
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.background = '';
                    btn.style.color = '';
                }, 3000);
            }, 1800);
        });
    }

    // Grid Parallax Effect on Mouse Move
    const grid = document.getElementById('grid-container');
    if (grid) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20; // max 20px movement
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            grid.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
        });
    }
});

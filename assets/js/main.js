// ===================================
// GSAP & ScrollTrigger Setup
// ===================================
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ===================================
// NAVBAR ANIMATIONS
// ===================================
gsap.to('.navbar', {
    y: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.5
});

// Navbar hide/show on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        gsap.to('.navbar', { y: 0, duration: 0.3 });
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        gsap.to('.navbar', { y: -100, duration: 0.3 });
    } else {
        gsap.to('.navbar', { y: 0, duration: 0.3 });
    }
    
    lastScroll = currentScroll;
});



// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        gsap.to(spans[0], { rotation: 45, y: 8, duration: 0.3 });
        gsap.to(spans[1], { opacity: 0, duration: 0.3 });
        gsap.to(spans[2], { rotation: -45, y: -8, duration: 0.3 });
    } else {
        gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(spans[1], { opacity: 1, duration: 0.3 });
        gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
    }
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(spans[1], { opacity: 1, duration: 0.3 });
        gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
    });
});

// ===================================
// HERO SECTION ANIMATIONS
// ===================================
// Clouds parallax
gsap.utils.toArray('.cloud').forEach((cloud, i) => {
    const speed = 1 + (i * 0.3);
    gsap.to(cloud, {
        x: () => window.innerWidth * 0.3,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: speed
        }
    });
});

// Hero title reveal
const titleLines = document.querySelectorAll('.hero-title .line');
titleLines.forEach((line, i) => {
    const chars = line.textContent.split('');
    line.innerHTML = chars.map(char => 
        `<span style="display: inline-block; opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');
    
    gsap.to(line.querySelectorAll('span'), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        delay: 0.8 + (i * 0.3),
        ease: 'power3.out'
    });
});

// Hero subtitle and buttons fade in
gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 1.8,
    ease: 'power3.out'
});

gsap.from('.hero-buttons .btn', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    delay: 2.2,
    ease: 'power3.out'
});

// Hero plane takeoff animation
gsap.from('.hero-plane', {
    x: -200,
    y: 100,
    opacity: 0,
    rotation: -20,
    duration: 2,
    delay: 1,
    ease: 'power2.out'
});

// Plane parallax on scroll
gsap.to('.hero-plane', {
    y: -150,
    x: 200,
    rotation: 10,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    }
});

// Runway lights initial animation
gsap.from('.runway-lights .light', {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    delay: 2.5,
    ease: 'back.out(1.7)'
});

// Smooth scroll buttons
document.querySelectorAll('[data-scroll-to]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const target = button.getAttribute('data-scroll-to');
        const section = document.getElementById(target);
        
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: section,
                offsetY: 80
            },
            ease: 'power3.inOut'
        });
    });
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: 'power3.inOut'
            });
        }
    });
});

// ===================================
// ABOUT SECTION ANIMATIONS
// ===================================
// Section title reveal
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
        }
    });
});

// Feature items fly in
gsap.utils.toArray('.feature-item').forEach((item, i) => {
    gsap.from(item, {
        opacity: 0,
        x: -100,
        duration: 1,
        delay: i * 0.2,
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
});

// Control tower illustration
gsap.from('.control-tower', {
    opacity: 0,
    scale: 0.8,
    duration: 1.5,
    scrollTrigger: {
        trigger: '.control-tower',
        start: 'top 80%',
        toggleActions: 'play none none none'
    }
});

// Flying plane on path animation
const planePath = document.querySelector('.plane-path');
const flyingPlane = document.querySelector('.flying-plane');

if (planePath && flyingPlane) {
    gsap.to({}, {
        scrollTrigger: {
            trigger: '.about',
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const pathLength = planePath.getTotalLength();
                const point = planePath.getPointAtLength(pathLength * progress);
                
                gsap.set(flyingPlane, {
                    x: point.x - 10,
                    y: point.y - 2.5
                });
            }
        }
    });
    
    // Path drawing animation
    gsap.to('.plane-path', {
        strokeDashoffset: 0,
        duration: 2,
        scrollTrigger: {
            trigger: '.about',
            start: 'top center',
            end: 'bottom center',
            scrub: 1
        }
    });
}

// ===================================
// SERVICES SECTION ANIMATIONS
// ===================================
gsap.utils.toArray('.service-card').forEach((card, i) => {
    const delay = i === 5 ? 0.3 : 0; // CTA card appears slightly later
    
    gsap.from(card, {
        opacity: 0,
        y: 100,
        rotation: i % 2 === 0 ? -5 : 5,
        duration: 1,
        delay: delay,
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
    
    // Card icon bounce on hover
    const icon = card.querySelector('.card-icon');
    card.addEventListener('mouseenter', () => {
        gsap.to(icon, {
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(icon, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ===================================
// PORTFOLIO SECTION ANIMATIONS
// ===================================
gsap.utils.toArray('.portfolio-card').forEach((card, i) => {
    gsap.from(card, {
        opacity: 0,
        y: 80,
        rotationY: -15,
        duration: 1,
        delay: i * 0.15,
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
});

// Radar sweep animation
const radarSweep = document.querySelector('.radar-sweep');
if (radarSweep) {
    gsap.to(radarSweep, {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: 'none',
        transformOrigin: '100px 100px'
    });
}

// ===================================
// CONTACT SECTION ANIMATIONS
// ===================================
gsap.from('.contact-form', {
    opacity: 0,
    x: -100,
    duration: 1,
    scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 80%',
        toggleActions: 'play none none none'
    }
});

gsap.from('.contact-illustration', {
    opacity: 0,
    x: 100,
    duration: 1,
    scrollTrigger: {
        trigger: '.contact-illustration',
        start: 'top 80%',
        toggleActions: 'play none none none'
    }
});

// Form inputs animation on focus
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    input.addEventListener('blur', () => {
        gsap.to(input, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Taxiing plane animation
const planeTaxiing = document.querySelector('.plane-taxiing');
if (planeTaxiing) {
    gsap.to(planeTaxiing, {
        x: 150,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play pause resume pause'
        }
    });
}

// Runway lights blinking
const runwayLights = document.querySelectorAll('.runway-light');
runwayLights.forEach((light, i) => {
    gsap.to(light, {
        opacity: 1,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        delay: i * 0.2,
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play pause resume pause'
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const button = contactForm.querySelector('.btn-submit');
    const originalText = button.innerHTML;
    
    // Disable button and show loading state
    button.disabled = true;
    button.innerHTML = '<span>Taking Off...</span>';
    
    gsap.to(button, {
        scale: 0.95,
        duration: 0.2,
        yoyo: true,
        repeat: 3
    });
    
    // Simulate form submission
    setTimeout(() => {
        button.innerHTML = '<span>✓ Boarding Pass Received!</span>';
        button.style.background = 'linear-gradient(135deg, #4ECDC4, #45B7A0)';
        
        gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            button.innerHTML = originalText;
            button.style.background = '';
            button.disabled = false;
            gsap.to(button, {
                scale: 1,
                duration: 0.3
            });
        }, 3000);
    }, 2000);
});

// ===================================
// FOOTER ANIMATIONS
// ===================================
gsap.from('.footer-content > div', {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 85%',
        toggleActions: 'play none none none'
    }
});

gsap.from('.footer-bottom', {
    opacity: 0,
    duration: 1,
    delay: 0.6,
    scrollTrigger: {
        trigger: '.footer-bottom',
        start: 'top 90%',
        toggleActions: 'play none none none'
    }
});

// ===================================
// BUTTON INTERACTIONS
// ===================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mousedown', () => {
        gsap.to(button, {
            scale: 0.95,
            duration: 0.1
        });
    });
    
    button.addEventListener('mouseup', () => {
        gsap.to(button, {
            scale: 1.05,
            duration: 0.1
        });
    });
});

// ===================================
// LOGO ANIMATION
// ===================================
const logoIcon = document.querySelector('.logo-icon');
if (logoIcon) {
    logoIcon.addEventListener('mouseenter', () => {
        gsap.to(logoIcon, {
            rotation: 360,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
}

// ===================================
// PARALLAX SCROLL EFFECTS
// ===================================
// Service icons parallax
gsap.utils.toArray('.card-icon svg').forEach((icon) => {
    gsap.to(icon, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
            trigger: icon,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2
        }
    });
});

// ===================================
// CURSOR INTERACTIONS
// ===================================
document.querySelectorAll('.service-card, .portfolio-card, .feature-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// ===================================
// SMOOTH SCROLLING ENHANCEMENTS
// ===================================
// Add ScrollTrigger refresh on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// ===================================
// LOADING ANIMATION
// ===================================
window.addEventListener('load', () => {
    gsap.to('body', {
        opacity: 1,
        duration: 0.5
    });
    
    // Trigger any animations that should start on load
    ScrollTrigger.refresh();
});

// Initial body opacity
gsap.set('body', { opacity: 0 });

// ===================================
// MICRO-INTERACTIONS
// ===================================
// Nav links hover animation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, {
            y: -3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    link.addEventListener('mouseleave', () => {
        gsap.to(link, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Footer links animation
document.querySelectorAll('.footer-center a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, {
            x: 5,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    link.addEventListener('mouseleave', () => {
        gsap.to(link, {
            x: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

console.log('✈️ SkyCode Studios - Website Loaded & Ready for Takeoff!');


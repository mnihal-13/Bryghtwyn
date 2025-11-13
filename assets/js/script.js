// ===================================
// GSAP & ScrollTrigger Setup
// ===================================
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
    direction: 'vertical',
    gestureDirection: 'vertical',
    mouseMultiplier: 1,
    touchMultiplier: 2,
});

// Lenis scroll event handler
lenis.on('scroll', (e) => {
    ScrollTrigger.update();
});

// Integrate Lenis with GSAP ScrollTrigger
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Animation frame loop
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ===================================
    // HERO TEXT ANIMATIONS WITH GSAP
    // ===================================
    
    // Wait for DOM and GSAP to be ready
    document.addEventListener('DOMContentLoaded', () => {
      // Hero Heading Animation - Split by words and characters
      const heroHeading = document.querySelector('.hero-heading');
      if (heroHeading) {
        const text = heroHeading.innerHTML;
        const lines = text.split('<br>');
        
        heroHeading.innerHTML = lines.map(line => {
          const words = line.trim().split(' ');
          return words.map(word => {
            const chars = word.split('');
            return `<span class="word" style="display: inline-block; overflow: hidden;">${
              chars.map(char => `<span class="char" style="display: inline-block; opacity: 0; transform: translateY(100%)">${char}</span>`).join('')
            }</span>`;
          }).join(' ');
        }).join('<br>');

        // Animate each character
        gsap.to('.hero-heading .char', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: {
            amount: 0.8,
            from: 'start'
          },
          ease: 'power3.out',
          delay: 0.3
        });
      }

      // Subquote Animation - Fade and slide up
      gsap.from('.subquote', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.2,
        ease: 'power2.out'
      });

      // Subquote HR line animation
      gsap.from('.subquote hr', {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 0.8,
        delay: 1.5,
        ease: 'power2.inOut'
      });

      // Hero Description - Typing effect
      const heroDescription = document.querySelector('.hero-description');
      if (heroDescription) {
        const originalText = heroDescription.textContent;
        heroDescription.textContent = '';
        
        gsap.to(heroDescription, {
          text: {
            value: originalText,
            delimiter: ''
          },
          duration: 2,
          delay: 1.8,
          ease: 'none'
        });

        // Fade in the description container
        gsap.from('.hero-description', {
          opacity: 0,
          duration: 0.5,
          delay: 1.8
        });
      }

      // Icon round animation - Scale bounce
      gsap.from('.icon-round', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
        ease: 'back.out(1.7)'
      });

      // Button Animation - Slide up with bounce
      gsap.from('.see-more-btn', {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.8,
        delay: 3.8,
        ease: 'elastic.out(1, 0.75)'
      });

      // Button Arrow Pulse Animation (continuous)
      gsap.to('.see-more-btn .arrow-icon', {
        x: 5,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      // Button Hover Interaction
      const seeMoreBtn = document.querySelector('.see-more-btn');
      if (seeMoreBtn) {
        seeMoreBtn.addEventListener('mouseenter', () => {
          gsap.to('.see-more-btn', {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to('.see-more-btn .arrow-icon', {
            x: 8,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        seeMoreBtn.addEventListener('mouseleave', () => {
          gsap.to('.see-more-btn', {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }
    });

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


// ===================================
// FLIGHT CHAT SECTION ANIMATIONS
// ===================================

// Typewriter effect for chat bubbles
function typewriterEffect(element, text, speed = 50) {
  let index = 0;
  element.textContent = '';
  
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
      } else {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

// Animate Flight Chat section
const flightChatSection = document.querySelector('.flight-chat-section');
if (flightChatSection) {
  
  // ScrollTrigger for the entire section
  ScrollTrigger.create({
    trigger: '.flight-chat-section',
    start: 'top 80%',
    onEnter: () => {
      animateFlightChat();
    },
    once: true
  });
  
  function animateFlightChat() {
    const towerBg = document.querySelector('.tower-bg');
    const transmitIndicator = document.querySelector('.transmitting-indicator');
    const chatBubbles = document.querySelectorAll('.chat-bubble');
    
    const masterTimeline = gsap.timeline();
    
    // 1. Fade in tower illustration
    masterTimeline.to(towerBg, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    });
    
    // 2. Show transmitting indicator
    masterTimeline.to(transmitIndicator, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, '-=0.3');
    
    // 3. Animate each chat bubble with stagger and typing effect
    chatBubbles.forEach((bubble, index) => {
      const delay = parseFloat(bubble.getAttribute('data-delay')) || 0;
      const bubbleText = bubble.querySelector('.bubble-text');
      const originalText = bubbleText.textContent;
      const isTower = bubble.classList.contains('tower-bubble');
      
      // Bubble entrance animation
      masterTimeline.to(bubble, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        onStart: () => {
          // Sound wave effect on icon
          gsap.to(bubble.querySelector('.bubble-icon'), {
            scale: 1.15,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
          });
        }
      }, delay);
      
      // Typing effect for text
      masterTimeline.call(() => {
        typewriterEffect(bubbleText, originalText, 40);
      }, null, delay + 0.3);
      
      // Subtle glow pulse after typing
      masterTimeline.to(bubble.querySelector('.bubble-content'), {
        boxShadow: '0 12px 40px rgba(74, 144, 226, 0.4)',
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut'
      }, delay + 0.8);
    });
    
    // 4. Continuous subtle animations
    gsap.to('.signal-icon', {
      rotation: 360,
      duration: 3,
      repeat: -1,
      ease: 'none'
    });
  }
}
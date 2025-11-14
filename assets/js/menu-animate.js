// --- Cinematic Paper Plane Menu Burger Animation using GSAP

const menuBtn = document.getElementById('menuBtn');
const burgerSvg = document.getElementById('burgerSvg');
const hamburger = burgerSvg.querySelector('#hamburger');
const paperplane = burgerSvg.querySelector('#paperplane');
const airportMenu = document.getElementById('airportMenu');
const menuBg = document.getElementById('menuBg');
const menuItems = document.querySelectorAll('.menu-items li');
const menuCenter = document.querySelector('.menu-center');
const menuX = document.getElementById('menuX');

let menuOpen = false;
let openTimeline, closeTimeline;

// Menu plane coordinates helpers
function getCenterCoords() {
    const vw = window.innerWidth, vh = window.innerHeight;
    return { x: vw / 2 - 22, y: vh / 2 - 22 };
}
function getMenuBtnCoords() {
    const btnRect = menuBtn.getBoundingClientRect();
    return {
        x: btnRect.left + btnRect.width / 2 - 22,
        y: btnRect.top + btnRect.height / 2 - 22
    };
}

function openMenuAnim() {
    airportMenu.classList.add('active');
    gsap.set(menuBg, { opacity: 0 });
    gsap.set(menuCenter, { opacity: 1 });
    gsap.set('.menu-items', { opacity: 1 });
    gsap.set(menuItems, { opacity: 0, y: 24, scale: 0.96 });
    gsap.set(menuX, { opacity: 0 });

    // Animate plane, reveal background after plane pops
    openTimeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

    openTimeline
        .to(hamburger, { opacity: 0, duration: 0.33 }, 0)
        .to(paperplane, { opacity: 1, duration: 0.36 }, "-=0.29")
        .set(airportMenu, { pointerEvents: 'auto' }, "-=0.34")
        .fromTo(burgerSvg, { x: 0, y: 0 }, {
            x: getCenterCoords().x - getMenuBtnCoords().x,
            y: getCenterCoords().y - getMenuBtnCoords().y,
            scale: 1.18,
            duration: 0.85,
            ease: "power2.inOut"
        }, "-=0.13")
        // Pop plane, THEN show background
        .to(burgerSvg, { scale: 2.1, duration: 0.38, ease: "back.in(2)" }, "-=0.14")
        .to(menuBg, { opacity: 1, duration: 0.35, ease: "power1.inOut" }, "-=0.07")
        .to(burgerSvg, { opacity: 0, duration: 0.08 }, "-=0.06")
        .from(menuCenter, { scale: 0.7, opacity: 0, duration: 0.38, ease: "elastic.out(1,0.68)" }, "-=0.31")
        .to(menuItems, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.54,
            stagger: 0.13,
            ease: "power3.out"
        }, "-=0.29")
        .to(menuX, { opacity: 1, duration: 0.17, ease: "power2.out" }, "-=0.56");
}

function closeMenuAnim() {
    closeTimeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

    closeTimeline
        .to([menuX], { opacity: 0, duration: 0.13, ease: "power2.in" })
        .to(menuItems, {
            opacity: 0, y: 24, scale: 0.96,
            duration: 0.38, stagger: 0.09, ease: "power3.in"
        }, "-=0.09")
        .to(menuCenter, { scale: 0.77, opacity: 0, duration: 0.24 }, "-=0.09")
        .to(menuBg, { opacity: 0, duration: 0.27, ease: 'power2.in' }, "-=0.24")
        .set(burgerSvg, {
            opacity: 1,
            x: getCenterCoords().x - getMenuBtnCoords().x,
            y: getCenterCoords().y - getMenuBtnCoords().y,
            scale: 2.1,
        })
        .to(burgerSvg, {
            x: 0, y: 0, scale: 1,
            duration: 0.62, ease: "power2.inOut"
        })
        .to(paperplane, { opacity: 0, duration: 0.17 }, "-=0.34")
        .to(hamburger, { opacity: 1, duration: 0.22 }, "-=0.05")
        .to(burgerSvg, { opacity: 1 }, "-=0.09")
        .set(airportMenu, { pointerEvents: 'none' })
        .call(() => {
            airportMenu.classList.remove('active');
        });
}

// Open/close triggers
menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        openMenuAnim();
        menuOpen = true;
    }
});
menuX.addEventListener('click', () => {
    if (menuOpen) {
        closeMenuAnim();
        menuOpen = false;
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) {
        closeMenuAnim();
        menuOpen = false;
    }
});
window.addEventListener('resize', () => {
    if (menuOpen) {
        const from = getMenuBtnCoords();
        const to = getCenterCoords();
        gsap.set(burgerSvg, { x: to.x - from.x, y: to.y - from.y });
    }
});
import Lenis from 'lenis';

// Inicialização básica
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
});

function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Ajuste para âncoras
const anchors = document.querySelectorAll('a[href^="#"]') as NodeListOf<HTMLAnchorElement>;

anchors.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = anchor.getAttribute('href');

        if (targetId) {
            // CORREÇÃO AQUI: Mudamos de -170 para -90 (Altura exata da sua Navbar)
            // Se quiser uma folga mínima, use -100
            lenis.scrollTo(targetId, { offset: -70 });
        }
    });
});
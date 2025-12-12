import Lenis from 'lenis';

// Inicialização básica
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
});

// Correção 1: Adicionado o tipo ': number' para o parâmetro time
function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Ajuste para âncoras
// Correção 2: Dizemos ao TS que isso é uma lista de Links (HTMLAnchorElement)
const anchors = document.querySelectorAll('a[href^="#"]') as NodeListOf<HTMLAnchorElement>;

anchors.forEach((anchor) => {
    // Usamos Arrow Function '=>' para não ter problemas com o 'this'
    anchor.addEventListener('click', (e) => {
        e.preventDefault();

        // Correção 3: Usamos a própria variável 'anchor' em vez de 'this'
        const targetId = anchor.getAttribute('href');

        if (targetId) {
            lenis.scrollTo(targetId, { offset: -170 });
        }
    });
});
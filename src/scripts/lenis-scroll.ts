import Lenis from 'lenis';

// 1. Inicializa o Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});

// 2. Loop de animação
function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// 3. Captura de Cliques (Delegação de Eventos)
document.addEventListener('click', (e) => {
    // O 'as HTMLElement' agora funciona perfeitamente aqui
    const target = e.target as HTMLElement;
    const link = target.closest('a');

    if (link) {
        const href = link.getAttribute('href');

        // Verifica se é um link âncora (começa com #)
        if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            lenis.scrollTo(href);
        }
    }
});
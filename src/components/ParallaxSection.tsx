import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';

interface ParallaxSectionProps {
    children: ReactNode;
    className?: string;
    offset?: number;
    endColor?: string; // A cor da sombra (ex: #13151a)
}

const ParallaxSection = ({
    children,
    className = "",
    offset = 50,
    endColor = "#000000"
}: ParallaxSectionProps) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // 1. Movimento Parallax
    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${offset}%`]);

    // 2. Opacidade da Sombra
    // Vai de 0 (invisível) até 1 (sombra total) conforme rola
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                position: 'relative',
                overflow: 'hidden',
                zIndex: 0
            }}
        >
            <motion.div style={{ y }}>
                {children}
            </motion.div>

            {/* A PELÍCULA DE SOMBRA */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',

                    /* A MÁGICA DA SOMBRA INTERNA: */
                    /* inset: sombra para dentro */
                    /* 0 -300px: Empurra a sombra lá para baixo */
                    /* 300px: O tamanho do esfumaçado (blur) */
                    /* -50px: O quanto ela espalha (spread) */
                    boxShadow: `inset 0 -300px 300px -50px ${endColor}`,

                    opacity: overlayOpacity,
                    pointerEvents: 'none',
                    zIndex: 10
                }}
            />
        </div>
    );
};

export default ParallaxSection;
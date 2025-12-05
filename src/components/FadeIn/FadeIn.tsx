import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInProps {
    children: ReactNode;
    delay?: number;      // Atraso opcional (ex: 0.2s)
    className?: string;  // Classes extras se precisar
}

const FadeIn = ({ children, delay = 0, className = "" }: FadeInProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }} // Estado Inicial: Invisível e 50px para baixo
            whileInView={{ opacity: 1, y: 0 }} // Estado Final: Visível e na posição original
            viewport={{ once: true, margin: "-100px" }} // Dispara quando o elemento entra 100px na tela
            transition={{
                duration: 0.8, // Duração da subida (0.8s é bem suave)
                delay: delay,
                ease: [0.25, 0.46, 0.45, 0.94] // Curva de animação elegante
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
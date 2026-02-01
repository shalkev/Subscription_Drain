import { motion } from 'framer-motion';

export function FireIcon({ size = 24, className = "" }: { size?: number, className?: string }) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
                scale: [1, 1.1, 1],
                opacity: 1
            }}
            transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
            }}
        >
            {/* Outer Flame */}
            <motion.path
                d="M50 5C50 5 85 40 85 65C85 85 70 95 50 95C30 95 15 85 15 65C15 40 50 5 50 5Z"
                fill="#FF4D00"
                animate={{
                    d: [
                        "M50 5C50 5 85 40 85 65C85 85 70 95 50 95C30 95 15 85 15 65C15 40 50 5 50 5Z",
                        "M50 2C50 2 82 42 82 65C82 85 68 93 50 93C32 93 18 85 18 65C18 42 50 2 50 2Z",
                        "M50 5C50 5 85 40 85 65C85 85 70 95 50 95C30 95 15 85 15 65C15 40 50 5 50 5Z"
                    ]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
            />
            {/* Middle Flame */}
            <motion.path
                d="M50 25C50 25 75 50 75 70C75 85 65 90 50 90C35 90 25 85 25 70C25 50 50 25 50 25Z"
                fill="#FF9E00"
                animate={{
                    scale: [1, 1.05, 1],
                    y: [0, -2, 0]
                }}
                transition={{ duration: 0.4, repeat: Infinity }}
            />
            {/* Inner Flame */}
            <motion.path
                d="M50 45C50 45 65 60 65 75C65 85 58 88 50 88C42 88 35 85 35 75C35 60 50 45 50 45Z"
                fill="#FFEA00"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 0.3, repeat: Infinity }}
            />
        </motion.svg>
    );
}

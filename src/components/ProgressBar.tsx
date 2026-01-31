import { motion } from 'framer-motion';
import { useCalculator } from '../context/CalculatorContext';
import { Check } from 'lucide-react';

interface Props {
    totalSteps: number;
}

export function ProgressBar({ totalSteps }: Props) {
    const { currentStep } = useCalculator();

    if (currentStep === 0 || currentStep > totalSteps) return null;

    const progressPercentage = totalSteps > 1
        ? ((currentStep - 1) / (totalSteps - 1)) * 100
        : 0;

    return (
        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto 2.5rem', padding: '0 1rem' }}>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', zIndex: 0, transform: 'translateY(-50%)' }} />
                <motion.div initial={{ width: '0%' }} animate={{ width: `${progressPercentage}%` }} transition={{ duration: 0.5, ease: "easeInOut" }} style={{ position: 'absolute', top: '50%', left: 0, height: '4px', background: '#ef4444', borderRadius: '4px', zIndex: 0, transform: 'translateY(-50%)' }} />
                {Array.from({ length: totalSteps }, (_, i) => {
                    const stepNum = i + 1;
                    const isActive = currentStep === stepNum;
                    const isCompleted = currentStep > stepNum;
                    return (
                        <div key={i} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <motion.div animate={{ scale: isActive ? 1.2 : 1, backgroundColor: isActive || isCompleted ? '#ef4444' : '#1e293b', borderColor: isActive || isCompleted ? '#ef4444' : 'rgba(255,255,255,0.15)' }} transition={{ duration: 0.3 }} style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid', color: isActive || isCompleted ? 'white' : '#94a3b8', fontWeight: 'bold', fontSize: '1rem', background: '#1e293b', boxShadow: isActive ? '0 0 15px rgba(239, 68, 68, 0.4)' : 'none', cursor: 'default' }}>
                                {isCompleted ? <Check size={20} strokeWidth={3} /> : stepNum}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

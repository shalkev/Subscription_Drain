import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { UserSubscription, CalculationResult } from '../logic/calculator';
import { calculateDrain } from '../logic/calculator';

interface CalculatorState {
    currentStep: number;
    subscriptions: UserSubscription[];
    investmentRate: number;
    result: CalculationResult | null;
}

interface CalculatorContextType extends CalculatorState {
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    addSubscription: (sub: UserSubscription) => void;
    removeSubscription: (id: string) => void;
    updateSubscription: (id: string, updates: Partial<UserSubscription>) => void;
    setInvestmentRate: (rate: number) => void;
    calculate: () => void;
    reset: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | null>(null);

export function CalculatorProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<CalculatorState>({
        currentStep: 0,
        subscriptions: [],
        investmentRate: 0.07,
        result: null,
    });

    const setStep = (step: number) => {
        setState(prev => ({ ...prev, currentStep: step }));
    };

    const nextStep = () => {
        setState(prev => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, 4) }));
    };

    const prevStep = () => {
        setState(prev => ({ ...prev, currentStep: Math.max(prev.currentStep - 1, 0) }));
    };

    const addSubscription = (sub: UserSubscription) => {
        setState(prev => ({
            ...prev,
            subscriptions: [...prev.subscriptions, sub],
        }));
    };

    const removeSubscription = (id: string) => {
        setState(prev => ({
            ...prev,
            subscriptions: prev.subscriptions.filter(s => s.id !== id),
        }));
    };

    const updateSubscription = (id: string, updates: Partial<UserSubscription>) => {
        setState(prev => ({
            ...prev,
            subscriptions: prev.subscriptions.map(s =>
                s.id === id ? { ...s, ...updates } : s
            ),
        }));
    };

    const setInvestmentRate = (rate: number) => {
        setState(prev => ({ ...prev, investmentRate: rate }));
    };

    const calculate = () => {
        const result = calculateDrain(state.subscriptions, state.investmentRate);
        setState(prev => ({ ...prev, result }));
    };

    const reset = () => {
        setState({
            currentStep: 0,
            subscriptions: [],
            investmentRate: 0.07,
            result: null,
        });
    };

    return (
        <CalculatorContext.Provider
            value={{
                ...state,
                setStep,
                nextStep,
                prevStep,
                addSubscription,
                removeSubscription,
                updateSubscription,
                setInvestmentRate,
                calculate,
                reset,
            }}
        >
            {children}
        </CalculatorContext.Provider>
    );
}

export function useCalculator() {
    const context = useContext(CalculatorContext);
    if (!context) {
        throw new Error('useCalculator must be used within CalculatorProvider');
    }
    return context;
}

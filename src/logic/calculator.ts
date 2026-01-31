export interface UserSubscription {
    id: string;
    name: string;
    category: string;
    icon?: string;
    monthlyPrice: number;
    usageFrequency: number; // 0 = never, 100 = daily
}

export interface CalculationResult {
    totalMonthly: number;
    totalYearly: number;
    wastedMonthly: number;
    wastedYearly: number;
    categoryBreakdown: { category: string; amount: number; percentage: number }[];
    investmentProjections: { years: number; amount: number }[];
}

/**
 * Calculates the "drain" based on usage frequency
 * Low usage = high waste
 */
function calculateWasteRatio(usageFrequency: number): number {
    // 0% usage = 100% wasted, 100% usage = 0% wasted
    return 1 - (usageFrequency / 100);
}

/**
 * Projects investment growth using compound interest
 */
export function projectInvestment(
    monthlyContribution: number,
    years: number,
    annualRate: number = 0.07
): number {
    const monthlyRate = annualRate / 12;
    const months = years * 12;

    // Future Value of a Series formula
    if (monthlyRate === 0) {
        return monthlyContribution * months;
    }

    return monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
}

/**
 * Main calculation function
 */
export function calculateDrain(
    subscriptions: UserSubscription[],
    investmentRate: number = 0.07
): CalculationResult {
    // Calculate totals
    const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.monthlyPrice, 0);
    const totalYearly = totalMonthly * 12;

    // Calculate waste based on usage
    const wastedMonthly = subscriptions.reduce((sum, sub) => {
        const wasteRatio = calculateWasteRatio(sub.usageFrequency);
        return sum + (sub.monthlyPrice * wasteRatio);
    }, 0);
    const wastedYearly = wastedMonthly * 12;

    // Category breakdown
    const categoryMap = new Map<string, number>();
    subscriptions.forEach(sub => {
        const wasteRatio = calculateWasteRatio(sub.usageFrequency);
        const wasted = sub.monthlyPrice * wasteRatio * 12;
        categoryMap.set(sub.category, (categoryMap.get(sub.category) || 0) + wasted);
    });

    const categoryBreakdown = Array.from(categoryMap.entries())
        .map(([category, amount]) => ({
            category,
            amount,
            percentage: wastedYearly > 0 ? (amount / wastedYearly) * 100 : 0,
        }))
        .sort((a, b) => b.amount - a.amount);

    // Investment projections
    const investmentProjections = [5, 10, 20, 30].map(years => ({
        years,
        amount: projectInvestment(wastedMonthly, years, investmentRate),
    }));

    return {
        totalMonthly,
        totalYearly,
        wastedMonthly,
        wastedYearly,
        categoryBreakdown,
        investmentProjections,
    };
}

/**
 * Format currency in Euro
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
    }).format(amount);
}

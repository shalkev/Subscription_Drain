
import { formatCurrency } from './calculator';
import type { CalculationResult } from './calculator';

export interface ChatMessage {
    role: 'user' | 'bot';
    text: string;
}

const TEMPLATES = {
    waste: [
        (wasted: string, cat: string, amt: string) => `Deine Analyse zeigt einen monatlichen Verlust von ${wasted}. Besonders ${cat} schlägt mit ${amt} zu Buche. Welches deiner Abos ist deiner Meinung nach am überflüssigsten? 🛑`,
        (wasted: string, cat: string, amt: string) => `Oha! ${wasted} gehen jeden Monat verloren. Allein in der Kategorie "${cat}" versinkt gerade ${amt}. Welches dieser Abos nutzt du eigentlich am seltensten?`,
        (wasted: string, cat: string, amt: string) => `Stell dir vor, du hättest ${wasted} mehr jeden Monat auf dem Konto. Der größte Hebel ist gerade "${cat}" (${amt}). Welches Abo aus dieser Liste würdest du am ehesten kündigen?`
    ],
    investment: [
        (pot: string, wasted: string) => `Das ist der Kern des Ganzen: Deine ${wasted} Ersparnis könnten in 30 Jahren auf ${pot} anwachsen. Das ist die Magie des Zinseszins. Jeder Tag zählt! Möchtest du wissen, wie man einen ETF-Sparplan startet? 🚀`,
        (pot: string, wasted: string) => `Mathematisch gesehen sitzt du auf einer Goldmine von ${pot}. Alles was du tun musst, ist die ${wasted} monatlich umzuleiten. Ein simpler Welt-ETF reicht meistens aus. Soll ich dir die Details dazu erklären?`,
        (pot: string, wasted: string) => `Statt ${wasted} für ungenutzte Abos auszugeben, kannst du ${pot} Vermögen aufbauen. Das ist eine klare Entscheidung für deine Freiheit. Was hält dich aktuell noch vom Investieren ab?`
    ],
    depotExplanation: [
        () => `Ein Depot zu eröffnen ist heute so einfach wie ein Social-Media-Profil. Du brauchst einen Online-Broker (wie Trade Republic oder Scalable Capital), dein Handy für die Identifizierung und ein Verrechnungskonto. In 15 Minuten bist du startklar. Soll ich dir sagen, was ein Welt-ETF genau macht?`,
        () => `Stell es dir wie ein digitales Schließfach für deine Aktien vor. Du meldest dich online an, verifizierst dich kurz und kannst sofort einen Sparplan ab 1€ einrichten. Sollen wir mal über den 'MSCI World' sprechen?`
    ],
    etfExplanation: [
        () => `Ein Welt-ETF (wie der MSCI World) kauft automatisch Anteile von über 1.500 Unternehmen weltweit. Damit besitzt du einen Teil der gesamten Weltwirtschaft und minimierst dein Risiko. Klingt das nach einer Strategie, die du verfolgen würdest?`,
        () => `Das ist wie ein Korb mit 1.500 Eiern – wenn eins bricht, ist dein Frühstück gerettet. Der ETF streut dein Geld über den ganzen Globus. Möchtest du wissen, wie man so einen Sparplan konkret anlegt?`
    ],
    clarification: [
        "Das habe ich leider nicht ganz verstanden. Könntest du das bitte näher erläutern oder mir eine andere Frage zu deiner Analyse stellen? 🤔",
        "Entschuldige, das ist mir nicht ganz klar. Meinst du vielleicht deine Abos, das Investieren oder wie du dein Depot startest?",
        "Ich stehe gerade auf dem Schlauch. Kannst du deine Frage bitte umformulieren, damit ich dir präzise helfen kann?"
    ]
};

// Track recently used responses to avoid direct repeats in a session
// Since this is a simple simulation, we'll use a global variable to store used keys/indices
const usedResponses = new Set<string>();

const getRandomUnique = (category: keyof typeof TEMPLATES, ...args: any[]) => {
    const options = TEMPLATES[category];
    let attempts = 0;
    let index;

    do {
        index = Math.floor(Math.random() * options.length);
        attempts++;
    } while (usedResponses.has(`${category}_${index}`) && attempts < 10);

    usedResponses.add(`${category}_${index}`);
    // Keep set small
    if (usedResponses.size > 20) usedResponses.clear();

    const selected = options[index];
    return typeof selected === 'function' ? (selected as any)(...args) : selected;
};

export const getSimulationResponse = async (userMsg: string, result: CalculationResult): Promise<string> => {
    const lowerMsg = userMsg.toLowerCase().trim();

    const wasted = formatCurrency(result.wastedMonthly);
    const potential = result.investmentProjections[result.investmentProjections.length - 1].amount;
    const formattedPotential = formatCurrency(potential);
    const biggest = result.categoryBreakdown[0] || { category: 'Sonstiges', amount: 0 };
    const biggestAmt = formatCurrency(biggest.amount);

    const delay = 800 + Math.random() * 1000;
    await new Promise(resolve => setTimeout(resolve, delay));

    // 1. Specific keywords for investment/savings
    if (lowerMsg.includes('kündigen') || lowerMsg.includes('abo') || lowerMsg.includes('sparen') || lowerMsg.includes('fresser')) {
        return getRandomUnique('waste', wasted, biggest.category, biggestAmt);
    }

    if (lowerMsg.includes('invest') || lowerMsg.includes('reich') || lowerMsg.includes('zins') || lowerMsg.includes('geld')) {
        return getRandomUnique('investment', formattedPotential, wasted);
    }

    // 2. Specific depth keywords
    if (lowerMsg.includes('etf') || lowerMsg.includes('msci') || lowerMsg.includes('welt')) {
        return getRandomUnique('etfExplanation');
    }

    if (lowerMsg.includes('depot') || lowerMsg.includes('broker') || lowerMsg.includes('konto')) {
        return getRandomUnique('depotExplanation');
    }

    // 3. Positive feedback for context
    if (lowerMsg === 'ja' || lowerMsg.includes('bitte') || lowerMsg.includes('erklär')) {
        return getRandomUnique('depotExplanation');
    }

    // 4. Handle specific subscription mentions
    const commonSubs = ['netflix', 'spotify', 'disney', 'dazn', 'amazon', 'sky', 'gym'];
    if (commonSubs.some(s => lowerMsg.includes(s))) {
        return `Gute Entscheidung! Die monatlichen Kosten für solche Dienste unterschätzt man leicht. Wenn du das konsequent in dein Potenzial investierst, kommst du den ${formattedPotential} ein großes Stück näher. Was ist der nächste Schritt für dich?`;
    }

    // 5. Clarification if message is too short or doesn't match anything
    if (lowerMsg.length < 2 || (!lowerMsg.includes('hi') && !lowerMsg.includes('hallo') && !lowerMsg.includes('test'))) {
        return getRandomUnique('clarification');
    }

    // Default Greeting or generic push
    return `Hallo! Ich habe mir deine Zahlen angesehen. Mit ${wasted} monatlichem Sparpotenzial könntest du ein Vermögen von ${formattedPotential} aufbauen. Möchtest du wissen, wie wir das heute noch starten können?`;
};

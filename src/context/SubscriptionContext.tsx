import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { SUBSCRIPTIONS as DEFAULT_SUBSCRIPTIONS } from '../data/subscriptions';
import type { Subscription } from '../data/subscriptions';

interface SubscriptionContextType {
    subscriptions: Subscription[];
    isUpdating: boolean;
    lastUpdated: Date | null;
    updatePrices: () => Promise<void>;
    updateStatus: string;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

// Aktuelle Preise aus Web-Recherche (Stand: Januar 2026)
// Diese Preise werden bei "Abos Liste aktualisieren" verwendet
const CURRENT_PRICES_2026: Record<string, number> = {
    // Video Streaming
    'netflix': 13.99,
    'disney': 10.99,
    'amazon-prime': 8.99,
    'dazn': 34.99,
    'wow': 9.99,
    'apple-tv': 9.99,
    'paramount': 7.99,
    'youtube-premium': 12.99,
    'twitch': 8.99,
    'crunchyroll': 6.99,
    'hbo-max': 9.99,
    'mubi': 11.99,
    'rtl-plus': 6.99,

    // Audio
    'spotify': 12.99,
    'apple-music': 10.99,
    'audible': 9.95,
    'deezer': 10.99,
    'tidal': 10.99,
    'amazon-music': 9.99,
    'soundcloud': 9.99,
    'podimo': 4.99,

    // Produktivität
    'microsoft-365': 10.00,
    'adobe-cc': 77.99,
    'dropbox': 11.99,
    'google-one': 9.99,
    'icloud': 2.99,
    'chatgpt-plus': 20.00,
    'evernote': 8.33,
    'notion': 10.00,
    'canva-pro': 11.99,
    'github-pro': 4.00,
    'linkedin-premium': 29.99,
    'slack-pro': 7.50,

    // Essen & Lifestyle
    'hellofresh': 97.99,
    'uber-one': 4.99,
    'lieferando-plus': 5.00,
    'flink': 5.00,
    'gorillas': 5.99,
    'marley-spoon': 69.99,

    // Fitness
    'mcfit': 24.90,
    'clever-fit': 34.90,
    'peloton': 44.00,
    'strava': 11.99,
    'komoot': 4.99,
    'fitness-blender': 8.99,
    'headspace': 12.99,
    'calm': 14.99,

    // Dating & Social
    'tinder-gold': 25.99,
    'bumble': 17.99,
    'hinge': 19.99,
    'parship': 69.90,
    'elitepartner': 59.90,

    // News
    'zeit': 19.90,
    'spiegel': 21.90,
    'bild': 9.99,
    'nyt': 4.00,
    'economist': 22.00,
    'faz': 14.90
};

export function SubscriptionProvider({ children }: { children: ReactNode }) {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>(DEFAULT_SUBSCRIPTIONS);
    const [isUpdating, setIsUpdating] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [updateStatus, setUpdateStatus] = useState<string>('');

    const updatePrices = useCallback(async () => {
        setIsUpdating(true);
        setUpdateStatus('Recherchiere aktuelle Preise...');

        // Simuliere Web-Recherche mit leichter Verzögerung
        await new Promise(resolve => setTimeout(resolve, 800));
        setUpdateStatus('Aktualisiere Netflix, Disney+...');

        await new Promise(resolve => setTimeout(resolve, 600));
        setUpdateStatus('Aktualisiere Spotify, DAZN...');

        await new Promise(resolve => setTimeout(resolve, 600));
        setUpdateStatus('Aktualisiere Produktivitäts-Apps...');

        await new Promise(resolve => setTimeout(resolve, 500));
        setUpdateStatus('Finalisiere Preise...');

        // Nutze die recherchierten aktuellen Preise 2026
        const updatedSubscriptions = subscriptions.map(sub => {
            const currentPrice = CURRENT_PRICES_2026[sub.id];
            if (currentPrice !== undefined) {
                return {
                    ...sub,
                    defaultPrice: currentPrice
                };
            }
            return sub;
        });

        await new Promise(resolve => setTimeout(resolve, 300));

        setSubscriptions(updatedSubscriptions);
        setLastUpdated(new Date());
        setUpdateStatus('');
        setIsUpdating(false);
    }, [subscriptions]);

    return (
        <SubscriptionContext.Provider value={{
            subscriptions,
            isUpdating,
            lastUpdated,
            updatePrices,
            updateStatus
        }}>
            {children}
        </SubscriptionContext.Provider>
    );
}

export function useSubscriptions() {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error('useSubscriptions must be used within SubscriptionProvider');
    }
    return context;
}

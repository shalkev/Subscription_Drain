export interface Subscription {
  id: string;
  name: string;
  category: 'video' | 'audio' | 'productivity' | 'food' | 'fitness' | 'social' | 'news' | 'other';
  icon: string;
  defaultPrice: number;
  url?: string;
  logoColor?: string;
}

export const CATEGORIES = {
  video: { label: 'Video Streaming', color: '#ef4444' },
  audio: { label: 'Musik & Audio', color: '#10b981' },
  productivity: { label: 'Produktivität', color: '#3b82f6' },
  food: { label: 'Essen & Lifestyle', color: '#f59e0b' },
  fitness: { label: 'Fitness & Gesundheit', color: '#8b5cf6' },
  social: { label: 'Dating & Social', color: '#ec4899' },
  news: { label: 'Nachrichten', color: '#64748b' },
  other: { label: 'Sonstiges', color: '#6366f1' },
};

export const SUBSCRIPTIONS: Subscription[] = [
  // Video Streaming (13 items)
  { id: 'netflix', name: 'Netflix', category: 'video', icon: '🎬', defaultPrice: 13.99, url: 'https://www.netflix.com', logoColor: '#E50914' },
  { id: 'disney', name: 'Disney+', category: 'video', icon: '🏰', defaultPrice: 9.99, url: 'https://www.disneyplus.com', logoColor: '#113CCF' },
  { id: 'prime', name: 'Amazon Prime', category: 'video', icon: '📦', defaultPrice: 8.99, url: 'https://www.amazon.de/prime', logoColor: '#00A8E1' },
  { id: 'dazn', name: 'DAZN', category: 'video', icon: '⚽', defaultPrice: 29.99, url: 'https://www.dazn.com', logoColor: '#F5F5F5' },
  { id: 'wow', name: 'WOW (Sky)', category: 'video', icon: '🌟', defaultPrice: 14.99, url: 'https://www.wowtv.de', logoColor: '#6B00B3' },
  { id: 'appletv', name: 'Apple TV+', category: 'video', icon: '🍎', defaultPrice: 9.99, url: 'https://tv.apple.com', logoColor: '#000000' },
  { id: 'paramount', name: 'Paramount+', category: 'video', icon: '🏔️', defaultPrice: 7.99, url: 'https://www.paramountplus.com', logoColor: '#0064FF' },
  { id: 'youtube', name: 'YouTube Premium', category: 'video', icon: '▶️', defaultPrice: 12.99, url: 'https://www.youtube.com/premium', logoColor: '#FF0000' },
  { id: 'twitch', name: 'Twitch Turbo', category: 'video', icon: '👾', defaultPrice: 8.99, url: 'https://www.twitch.tv/turbo', logoColor: '#9146FF' },
  { id: 'crunchyroll', name: 'Crunchyroll', category: 'video', icon: '🍥', defaultPrice: 6.99, url: 'https://www.crunchyroll.com', logoColor: '#F47521' },
  { id: 'hbo', name: 'HBO Max', category: 'video', icon: '📺', defaultPrice: 9.99, url: 'https://www.max.com', logoColor: '#5822B4' },
  { id: 'mubi', name: 'MUBI', category: 'video', icon: '🎞️', defaultPrice: 11.99, url: 'https://mubi.com', logoColor: '#00DC78' },
  { id: 'rtlplus', name: 'RTL+', category: 'video', icon: '📡', defaultPrice: 6.99, url: 'https://plus.rtl.de', logoColor: '#FF0000' },

  // Audio (8 items)
  { id: 'spotify', name: 'Spotify', category: 'audio', icon: '🎧', defaultPrice: 10.99, url: 'https://www.spotify.com', logoColor: '#1DB954' },
  { id: 'applemusic', name: 'Apple Music', category: 'audio', icon: '🎵', defaultPrice: 10.99, url: 'https://music.apple.com', logoColor: '#FA243C' },
  { id: 'audible', name: 'Audible', category: 'audio', icon: '📚', defaultPrice: 9.95, url: 'https://www.audible.de', logoColor: '#F8991D' },
  { id: 'deezer', name: 'Deezer', category: 'audio', icon: '🎼', defaultPrice: 11.99, url: 'https://www.deezer.com', logoColor: '#00C7F2' },
  { id: 'tidal', name: 'Tidal', category: 'audio', icon: '🌊', defaultPrice: 10.99, url: 'https://tidal.com', logoColor: '#000000' },
  { id: 'amazonmusic', name: 'Amazon Music', category: 'audio', icon: '🎶', defaultPrice: 9.99, url: 'https://music.amazon.de', logoColor: '#25D1DA' },
  { id: 'soundcloud', name: 'SoundCloud Go+', category: 'audio', icon: '☁️', defaultPrice: 9.99, url: 'https://soundcloud.com/go', logoColor: '#FF5500' },
  { id: 'podimo', name: 'Podimo', category: 'audio', icon: '🎙️', defaultPrice: 4.99, url: 'https://podimo.com', logoColor: '#6366F1' },

  // Productivity (12 items)
  { id: 'm365', name: 'Microsoft 365', category: 'productivity', icon: '📎', defaultPrice: 7.00, url: 'https://www.microsoft.com/microsoft-365', logoColor: '#D83B01' },
  { id: 'adobe', name: 'Adobe CC', category: 'productivity', icon: '🎨', defaultPrice: 64.99, url: 'https://www.adobe.com/creativecloud', logoColor: '#FF0000' },
  { id: 'dropbox', name: 'Dropbox', category: 'productivity', icon: '💧', defaultPrice: 11.99, url: 'https://www.dropbox.com', logoColor: '#0061FF' },
  { id: 'googleone', name: 'Google One', category: 'productivity', icon: '🔵', defaultPrice: 1.99, url: 'https://one.google.com', logoColor: '#4285F4' },
  { id: 'icloud', name: 'iCloud+', category: 'productivity', icon: '☁️', defaultPrice: 2.99, url: 'https://www.icloud.com', logoColor: '#3693F3' },
  { id: 'chatgpt', name: 'ChatGPT Plus', category: 'productivity', icon: '🤖', defaultPrice: 22.99, url: 'https://chat.openai.com', logoColor: '#10A37F' },
  { id: 'evernote', name: 'Evernote', category: 'productivity', icon: '🐘', defaultPrice: 8.99, url: 'https://evernote.com', logoColor: '#00A82D' },
  { id: 'notion', name: 'Notion', category: 'productivity', icon: '📝', defaultPrice: 10.00, url: 'https://www.notion.so', logoColor: '#000000' },
  { id: 'canva', name: 'Canva Pro', category: 'productivity', icon: '🖼️', defaultPrice: 11.99, url: 'https://www.canva.com', logoColor: '#00C4CC' },
  { id: 'github', name: 'GitHub Pro', category: 'productivity', icon: '🐙', defaultPrice: 4.00, url: 'https://github.com', logoColor: '#171515' },
  { id: 'linkedin', name: 'LinkedIn Premium', category: 'productivity', icon: '💼', defaultPrice: 39.99, url: 'https://www.linkedin.com/premium', logoColor: '#0A66C2' },
  { id: 'slack', name: 'Slack Pro', category: 'productivity', icon: '💬', defaultPrice: 7.25, url: 'https://slack.com', logoColor: '#4A154B' },

  // Food & Lifestyle (6 items)
  { id: 'hellofresh', name: 'HelloFresh', category: 'food', icon: '🥕', defaultPrice: 55.00, url: 'https://www.hellofresh.de', logoColor: '#91C11E' },
  { id: 'uberone', name: 'Uber One', category: 'food', icon: '🍔', defaultPrice: 4.99, url: 'https://www.uber.com/one', logoColor: '#000000' },
  { id: 'lieferando', name: 'Lieferando+', category: 'food', icon: '🛵', defaultPrice: 4.99, url: 'https://www.lieferando.de', logoColor: '#FF8000' },
  { id: 'flink', name: 'Flink Express', category: 'food', icon: '⚡', defaultPrice: 5.99, url: 'https://www.goflink.com', logoColor: '#E31C79' },
  { id: 'gorillas', name: 'Gorillas', category: 'food', icon: '🦍', defaultPrice: 5.99, url: 'https://gorillas.io', logoColor: '#000000' },
  { id: 'marleyspoon', name: 'Marley Spoon', category: 'food', icon: '🥗', defaultPrice: 49.99, url: 'https://marleyspoon.de', logoColor: '#00B5AD' },

  // Fitness (8 items)
  { id: 'mcfit', name: 'McFit', category: 'fitness', icon: '💪', defaultPrice: 24.90, url: 'https://www.mcfit.com', logoColor: '#FFCC00' },
  { id: 'cleverfit', name: 'Clever Fit', category: 'fitness', icon: '🏋️', defaultPrice: 29.90, url: 'https://www.clever-fit.com', logoColor: '#00A0E3' },
  { id: 'peloton', name: 'Peloton', category: 'fitness', icon: '🚴', defaultPrice: 12.99, url: 'https://www.onepeloton.de', logoColor: '#EC1B24' },
  { id: 'strava', name: 'Strava', category: 'fitness', icon: '🏃', defaultPrice: 10.99, url: 'https://www.strava.com', logoColor: '#FC4C02' },
  { id: 'komoot', name: 'Komoot Premium', category: 'fitness', icon: '🌲', defaultPrice: 4.99, url: 'https://www.komoot.com', logoColor: '#6AA127' },
  { id: 'fitnessblender', name: 'Fitness Blender', category: 'fitness', icon: '🎯', defaultPrice: 6.99, url: 'https://www.fitnessblender.com', logoColor: '#00B4D8' },
  { id: 'headspace', name: 'Headspace', category: 'fitness', icon: '🧘', defaultPrice: 12.99, url: 'https://www.headspace.com', logoColor: '#F47D31' },
  { id: 'calm', name: 'Calm', category: 'fitness', icon: '🌙', defaultPrice: 14.99, url: 'https://www.calm.com', logoColor: '#5BCEFA' },

  // Dating & Social (5 items)
  { id: 'tinder', name: 'Tinder Gold', category: 'social', icon: '🔥', defaultPrice: 24.99, url: 'https://tinder.com', logoColor: '#FF6B6B' },
  { id: 'bumble', name: 'Bumble Boost', category: 'social', icon: '🐝', defaultPrice: 19.99, url: 'https://bumble.com', logoColor: '#FFC629' },
  { id: 'hinge', name: 'Hinge+', category: 'social', icon: '🖤', defaultPrice: 29.99, url: 'https://hinge.co', logoColor: '#000000' },
  { id: 'parship', name: 'Parship', category: 'social', icon: '💕', defaultPrice: 39.90, url: 'https://www.parship.de', logoColor: '#E4002B' },
  { id: 'elitepartner', name: 'ElitePartner', category: 'social', icon: '💎', defaultPrice: 34.90, url: 'https://www.elitepartner.de', logoColor: '#C7B299' },

  // News (6 items)
  { id: 'zeit', name: 'DIE ZEIT', category: 'news', icon: '📰', defaultPrice: 5.40, url: 'https://www.zeit.de/abo', logoColor: '#000000' },
  { id: 'spiegel', name: 'SPIEGEL+', category: 'news', icon: '🧐', defaultPrice: 19.99, url: 'https://www.spiegel.de/plus', logoColor: '#E64415' },
  { id: 'bild', name: 'BILDplus', category: 'news', icon: '📑', defaultPrice: 7.99, url: 'https://www.bild.de/bild-plus', logoColor: '#D00000' },
  { id: 'nytimes', name: 'NY Times', category: 'news', icon: '🗽', defaultPrice: 4.00, url: 'https://www.nytimes.com', logoColor: '#000000' },
  { id: 'economist', name: 'The Economist', category: 'news', icon: '📊', defaultPrice: 14.90, url: 'https://www.economist.com', logoColor: '#E3120B' },
  { id: 'faz', name: 'FAZ+', category: 'news', icon: '📜', defaultPrice: 14.90, url: 'https://www.faz.net/plus', logoColor: '#003B7A' },
];

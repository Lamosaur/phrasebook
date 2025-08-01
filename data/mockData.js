// src/data/mockData.js

export const PHRASES = [
  { id: 1, category: 'Greetings', polish_phrase: 'Cześć', vietnamese_phrase: 'Chào bạn', phonetic_guide: '[Chao ban]', audio_filename: 'greet_01.mp3' },
  { id: 2, category: 'Greetings', polish_phrase: 'Dzień dobry', vietnamese_phrase: 'Chào buổi sáng', phonetic_guide: '[Chao buoy sa-ang]', audio_filename: 'greet_02.mp3' },
  { id: 3, category: 'Directions', polish_phrase: 'Gdzie jest toaleta?', vietnamese_phrase: 'Nhà vệ sinh ở đâu?', phonetic_guide: '[Nya ve sin uh dou]', audio_filename: 'dir_01.mp3' },
  { id: 4, category: 'Directions', polish_phrase: 'Proszę', vietnamese_phrase: 'Làm ơn', phonetic_guide: '[Lam uhn]', audio_filename: 'dir_02.mp3' },
  { id: 5, category: 'Food', polish_phrase: 'Smacznego', vietnamese_phrase: 'Chúc ngon miệng', phonetic_guide: '[Chook ngon mi-eng]', audio_filename: 'food_01.mp3' },
];

// We can derive the categories from the phrases to avoid duplication
export const CATEGORIES = [...new Set(PHRASES.map(p => p.category))];

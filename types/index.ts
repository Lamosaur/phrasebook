export type Phrase = {
  id: number;
  subcategory_id: number;
  polish_phrase: string;
  vietnamese_phrase: string;
  phonetic_guide: string;
  audio_filename: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Subcategory = {
  id: number;
  name: string;
  category_id: number;
};
import { jest, describe, beforeEach, it, expect } from '@jest/globals';
import * as SQLite from 'expo-sqlite';
import {
  getCategories,
  getSubcategoriesForCategory,
  getPhrasesForSubcategory,
  getPhrasesByIds,
  searchPhrases,
  searchSubcategories,
  getPhraseById,
} from '../database'; // Adjust the import path as needed
import { Category, Phrase, Subcategory } from '../../types';

// Mock the expo-sqlite module
jest.mock('expo-sqlite', () => ({
  openDatabaseSync: jest.fn(),
}));

// Mock the database connection and its methods
const mockDb = {
  getAllAsync: jest.fn<(...args: any[]) => Promise<any[]>>(),
  getFirstAsync: jest.fn<(...args: any[]) => Promise<any | null>>(),
};

// Before each test, reset the mocks and setup the mock DB connection
beforeEach(() => {
  jest.clearAllMocks();
  (SQLite.openDatabaseSync as jest.Mock).mockReturnValue(mockDb);
});

describe('Database Service', () => {
  describe('getCategories', () => {
    it('should fetch all categories', async () => {
      const mockCategories: Category[] = [
        { id: 1, name: 'Greetings' },
        { id: 2, name: 'Food' },
      ];
      mockDb.getAllAsync.mockResolvedValue(mockCategories);

      const categories = await getCategories();

      expect(mockDb.getAllAsync).toHaveBeenCalledWith('SELECT * FROM categories;');
      expect(categories).toEqual(mockCategories);
    });
  });

  describe('getSubcategoriesForCategory', () => {
    it('should fetch subcategories for a given category ID', async () => {
      const mockSubcategories: Subcategory[] = [
        { id: 1, name: 'Formal Greetings', category_id: 1 },
      ];
      mockDb.getAllAsync.mockResolvedValue(mockSubcategories);

      const categoryId = 1;
      const subcategories = await getSubcategoriesForCategory(categoryId);

      expect(mockDb.getAllAsync).toHaveBeenCalledWith(
        'SELECT * FROM subcategories WHERE category_id = ?;',
        [categoryId]
      );
      expect(subcategories).toEqual(mockSubcategories);
    });
  });

  describe('getPhrasesForSubcategory', () => {
    it('should fetch phrases for a given subcategory ID', async () => {
      const mockPhrases: Phrase[] = [
        { id: 1, polish_phrase: 'Dzień dobry', subcategory_id: 1, vietnamese_phrase: 'Chào buổi sáng', phonetic_guide: '', audio_filename: '' },
      ];
      mockDb.getAllAsync.mockResolvedValue(mockPhrases);

      const subcategoryId = 1;
      const phrases = await getPhrasesForSubcategory(subcategoryId);

      expect(mockDb.getAllAsync).toHaveBeenCalledWith(
        'SELECT * FROM phrases WHERE subcategory_id = ?;',
        [subcategoryId]
      );
      expect(phrases).toEqual(mockPhrases);
    });
  });

  describe('getPhrasesByIds', () => {
    it('should return an empty array if no IDs are provided', async () => {
      const phrases = await getPhrasesByIds([]);
      expect(mockDb.getAllAsync).not.toHaveBeenCalled();
      expect(phrases).toEqual([]);
    });

    it('should fetch phrases for a list of IDs', async () => {
      const mockPhrases: Phrase[] = [
        { id: 1, polish_phrase: 'Tak', subcategory_id: 1, vietnamese_phrase: 'Vâng', phonetic_guide: '', audio_filename: '' },
        { id: 3, polish_phrase: 'Nie', subcategory_id: 1, vietnamese_phrase: 'Không', phonetic_guide: '', audio_filename: '' },
      ];
      mockDb.getAllAsync.mockResolvedValue(mockPhrases);

      const ids = [1, 3];
      const phrases = await getPhrasesByIds(ids);

      expect(mockDb.getAllAsync).toHaveBeenCalledWith(
        'SELECT * FROM phrases WHERE id IN (?,?);',
        ids
      );
      expect(phrases).toEqual(mockPhrases);
    });
  });

  describe('searchPhrases', () => {
    it('should return filtered phrases based on a query', async () => {
      const allPhrases: Phrase[] = [
        { id: 1, polish_phrase: 'Dzień dobry', vietnamese_phrase: 'Chào buổi sáng', subcategory_id: 1, phonetic_guide: '', audio_filename: '' },
        { id: 2, polish_phrase: 'Do widzenia', vietnamese_phrase: 'Tạm biệt', subcategory_id: 1, phonetic_guide: '', audio_filename: '' },
      ];
      mockDb.getAllAsync.mockResolvedValue(allPhrases);

      const results = await searchPhrases('dobry');
      expect(results).toHaveLength(1);
      expect(results[0].polish_phrase).toBe('Dzień dobry');
    });
  });

  describe('searchSubcategories', () => {
    it('should return filtered subcategories based on a query', async () => {
      const allSubcategories: Subcategory[] = [
        { id: 1, name: 'Common Phrases', category_id: 1 },
        { id: 2, name: 'At the Restaurant', category_id: 2 },
      ];
      mockDb.getAllAsync.mockResolvedValue(allSubcategories);

      const results = await searchSubcategories('rest');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('At the Restaurant');
    });

    it('should return an empty array if no subcategories match', async () => {
        mockDb.getAllAsync.mockResolvedValue([]);
        const results = await searchSubcategories('nonexistent');
        expect(results).toHaveLength(0);
    });
  });

  describe('getPhraseById', () => {
    it('should fetch a single phrase by its ID', async () => {
      const mockPhrase: Phrase = { id: 1, polish_phrase: 'Tak', subcategory_id: 1, vietnamese_phrase: 'Vâng', phonetic_guide: '', audio_filename: '' };
      mockDb.getFirstAsync.mockResolvedValue(mockPhrase);

      const phrase = await getPhraseById(1);

      expect(mockDb.getFirstAsync).toHaveBeenCalledWith(
        'SELECT * FROM phrases WHERE id = ?;',
        [1]
      );
      expect(phrase).toEqual(mockPhrase);
    });

    it('should return null if phrase is not found', async () => {
      mockDb.getFirstAsync.mockResolvedValue(null);
      const phrase = await getPhraseById(999);
      expect(phrase).toBeNull();
    });
    });
    });
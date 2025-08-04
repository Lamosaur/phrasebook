import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import { Category, Phrase, Subcategory } from '../types';

// --- DATABASE SETUP ---

// A function to get the database connection.
// It handles the one-time setup of copying the DB from assets.
const getConnection = (() => {
  let db: SQLite.SQLiteDatabase | null = null;

  return async (): Promise<SQLite.SQLiteDatabase> => {
    if (db) {
      return db;
    }

    const internalDbName = 'phrasebook.db';
    const dbPath = `${FileSystem.documentDirectory}SQLite/${internalDbName}`;

    const dbFile = await FileSystem.getInfoAsync(dbPath);
    if (!dbFile.exists) {
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });
      const asset = Asset.fromModule(require('../assets/db/phrasebook.db'));
      await FileSystem.downloadAsync(asset.uri, dbPath);
    }

    db = SQLite.openDatabaseSync(internalDbName);
    return db;
  };
})();

// --- DATABASE SERVICE FUNCTIONS ---

/**
 * Fetches all main categories from the database.
 * @returns A promise that resolves to an array of Category objects.
 */
export const getCategories = async (): Promise<Category[]> => {
  const db = await getConnection();
  const results = await db.getAllAsync<Category>('SELECT * FROM categories;');
  return results;
};

/**
 * Fetches all subcategories for a given main category ID.
 * @param categoryId The ID of the main category.
 * @returns A promise that resolves to an array of Subcategory objects.
 */
export const getSubcategoriesForCategory = async (categoryId: number): Promise<Subcategory[]> => {
  const db = await getConnection();
  const results = await db.getAllAsync<Subcategory>(
    'SELECT * FROM subcategories WHERE category_id = ?;',
    [categoryId]
  );
  return results;
};

/**
 * Fetches all phrases for a given subcategory ID.
 * @param subcategoryId The ID of the subcategory.
 * @returns A promise that resolves to an array of Phrase objects.
 */
export const getPhrasesForSubcategory = async (subcategoryId: number): Promise<Phrase[]> => {
  const db = await getConnection();
  const results = await db.getAllAsync<Phrase>(
    'SELECT * FROM phrases WHERE subcategory_id = ?;',
    [subcategoryId]
  );
  return results;
};

/**
 * Fetches all phrases belonging to a main category.
 * This requires a JOIN across the subcategories table.
 * @param categoryId The ID of the main category.
 * @returns A promise that resolves to an array of Phrase objects.
 */
export const getPhrasesForCategory = async (categoryId: number): Promise<Phrase[]> => {
  const db = await getConnection();
  const results = await db.getAllAsync<Phrase>(
    `SELECT p.* FROM phrases p
     JOIN subcategories s ON p.subcategory_id = s.id
     WHERE s.category_id = ?;`,
    [categoryId]
  );
  return results;
};

/**
 * Fetches multiple phrases by an array of IDs.
 * Useful for displaying the favorites list.
 * @param ids An array of phrase IDs.
 * @returns A promise that resolves to an array of Phrase objects.
 */
export const getPhrasesByIds = async (ids: number[]): Promise<Phrase[]> => {
  if (ids.length === 0) {
    return [];
  }
  const db = await getConnection();
  // Create a string of placeholders (?,?,?) for the SQL query
  const placeholders = ids.map(() => '?').join(',');
  const results = await db.getAllAsync<Phrase>(
    `SELECT * FROM phrases WHERE id IN (${placeholders});`,
    ids
  );
  return results;
};

/**
 * Searches for phrases across all categories and subcategories.
 * The search is case-insensitive.
 * @param query The search term.
 * @returns A promise that resolves to an array of Phrase objects.
 */
export const searchPhrases = async (query: string): Promise<Phrase[]> => {
  console.log(`[DB] searchPhrases called with query: "${query}"`);
  const db = await getConnection();
  // 1. Fetch all phrases from the database.
  const allPhrases = await db.getAllAsync<Phrase>('SELECT * FROM phrases;');

  // 2. Perform the case-insensitive search in JavaScript.
  const lowerCaseQuery = query.toLowerCase();
  const results = allPhrases.filter(phrase =>
    phrase.vietnamese_phrase.toLowerCase().includes(lowerCaseQuery) ||
    phrase.polish_phrase.toLowerCase().includes(lowerCaseQuery)
  );

  console.log(`[JS] searchPhrases filtered to ${results.length} results.`);
  return results;
};

/**
 * Searches for subcategories by name.
 * The search is case-insensitive and matches any part of the subcategory name.
 * @param query The search term.
 * @returns A promise that resolves to an array of Subcategory objects.
 */
export const searchSubcategories = async (query: string): Promise<Subcategory[]> => {
  console.log(`[DB] searchSubcategories called with query: "${query}"`);
  const db = await getConnection();
  // 1. Fetch all subcategories from the database.
  const allSubcategories = await db.getAllAsync<Subcategory>('SELECT * FROM subcategories;');

  // 2. Perform the case-insensitive search in JavaScript.
  const lowerCaseQuery = query.toLowerCase();
  const results = allSubcategories.filter(subcategory =>
    subcategory.name.toLowerCase().includes(lowerCaseQuery)
  );

  if (results.length > 0) {
    console.log(`[JS] searchSubcategories filtered to ${results.length} results.`);
  } else {
    console.log(`[JS] No subcategories found for query: "${query}"`);
  }
  return results;
};

/**
 * Fetches a single phrase by its ID.
 * @param phraseId The ID of the phrase.
 * @returns A promise that resolves to a single Phrase object or null if not found.
 */
export const getPhraseById = async (phraseId: number): Promise<Phrase | null> => {
  const db = await getConnection();
  const result = await db.getFirstAsync<Phrase>(
    'SELECT * FROM phrases WHERE id = ?;',
    [phraseId]
  );
  return result;
};

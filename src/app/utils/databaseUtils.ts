import clientPromise from '@/app/lib/mongodb';
import { Collection } from 'mongodb';

/**
 * Returns mongodb collection by database and collection name
 * @param {string} database
 * @param {string} collection
 * @returns {Promise<Collection<Document>>}
 */
export const getCollection = async (
  database: string,
  collection: string
): Promise<Collection<Document>> => {
  const client = await clientPromise;
  const db = client.db(database);
  return db.collection(collection);
};

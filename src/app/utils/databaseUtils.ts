import clientPromise from '@/app/lib/mongodb';

export const getCollection = async (database: string, collection: string) => {
  const client = await clientPromise;
  const db = client.db(database);
  return db.collection(collection);
};

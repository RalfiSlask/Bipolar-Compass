import clientPromise from '@/app/lib/mongodb';

export const getCollection = async (database: string, collection: string) => {
  const client = await clientPromise;
  const db = client.db(database);
  return db.collection(collection);
};

export const getVerificationCodeAsString = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

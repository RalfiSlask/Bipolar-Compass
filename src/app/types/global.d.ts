// global.d.ts
declare global {
  const _mongoClientPromise: Promise<MongoClient>;
}

export {};

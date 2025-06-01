// global.d.ts
declare global {
  const _mongoClientPromise: Promise<MongoClient>;
  interface Window {
    webkitAudioContext: typeof AudioContext;
    webkitSpeechRecognition: typeof SpeechRecognition;
    SpeechRecognition: typeof SpeechRecognition;
  }
}

export {};

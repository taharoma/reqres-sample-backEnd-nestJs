/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGOURL: string;
      PORT: number;
    }
  }
}

export {};

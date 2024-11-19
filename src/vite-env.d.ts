/// <reference types="vite/client" />

interface Window {
  electron: {
    auth: {
      login: () => Promise<void>;
      logout: () => Promise<void>;
    };
    ai: {
      generateResponse: (prompt: string) => Promise<string>;
    };
    store: {
      get: (key: string) => Promise<any>;
      set: (key: string, value: any) => Promise<void>;
    };
  };
}
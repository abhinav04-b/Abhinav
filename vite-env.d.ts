/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly GEMINI_API_KEY: string; // Add this since you use it
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

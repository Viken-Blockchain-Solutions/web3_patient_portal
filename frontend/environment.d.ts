declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ALCHEMY_API_KEY: string;
      NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string;
      NEXT_PUBLIC_TEST_URL: string;
      NEXT_PUBLIC_TEST_API_KEY: string;
    }
  }
}

export {};

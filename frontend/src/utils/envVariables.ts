import "dotenv/config";

// Dock variables
export const dockUrl = process.env.NEXT_PUBLIC_TEST_URL;
export const dockApiKey = process.env.NEXT_PUBLIC_TEST_API_KEY as string;
export const dockIssuerDid = process.env.NEXT_PUBLIC_ISSUER_DID as string;

// Alchemy variables
export const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string;

// WalletConnect variables
export const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

// Supabase variables
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
export const supabaseRolekey = process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY as string;

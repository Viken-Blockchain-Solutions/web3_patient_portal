import "dotenv/config";

// Dock variables
export const dockUrl = process.env.NEXT_PUBLIC_TEST_URL;
export const dockApiKey = process.env.NEXT_PUBLIC_TEST_API_KEY as string;
export const dockIssuerDid = process.env.NEXT_PUBLIC_ISSUER_DID as string;

// PolygonID variables
export const polygonIssuerDid = process.env.NEXT_PUBLIC_POLYGON_ID_ISSUER_DID as string;

// Alchemy variables
export const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string;

// WalletConnect variables
export const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

// DID variables
export const dadoggDid = process.env.NEXT_PUBLIC_DADOGG_DID as string;
export const thecilDid = process.env.NEXT_PUBLIC_THECIL_DID as string;
export const kenDid = process.env.NEXT_PUBLIC_KEN_DID as string;


/* console.log("Dock URL:", dockUrl);
console.log("Dock API Key:", dockApiKey);
console.log("Dock Issuer DID:", dockIssuerDid);
console.log("Polygon Issuer DID:", polygonIssuerDid);
console.log("Alchemy API Key:", alchemyApiKey);
console.log("WalletConnect Project ID:", walletConnectProjectId);
console.log("Dadogg DID:", dadoggDid);
console.log("Thecil DID:", thecilDid);
console.log("Ken DID:", kenDid); */
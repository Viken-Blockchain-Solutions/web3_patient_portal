// Define the types for the credential's properties

// used on src/components/IssuedCredential
export type Proof = {
  type: string;
  created: string;
  verificationMethod: string;
  proofPurpose: string;
  jws: string;
};

export type CredentialSubject = {
  [key: string]: any;
};
// used on /admin, /components/IssuedCredential
export interface Credential {
  "@context": Array<any>;
  id: string;
  type: Array<string>;
  credentialSubject: CredentialSubject;
  issuanceDate: string;
  issuer: any;
  proof: Proof;
}


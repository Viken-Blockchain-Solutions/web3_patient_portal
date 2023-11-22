export interface Contribution {
  credential_id: string;
  contributor_did: string;
  test_name: string;
  issuer_id: string;
  issuer_name: string;
  issuer_logo: string;
  test_result: object;
  pool_id: string;
  submitted_at?: string | null;
  verified_status: boolean;
}

export interface Pool {
  pool_id: string;
  created_at: string;
  pool_heading: string;
  start_date: string;
  end_date: string;
  funding_amount: number;
  currency_unit: string;
  contributions_amount: number;
  proof_template: string;
}

export interface NewPool {
  pool_id: string;
  created_at?: string | null;
  pool_heading: string;
  pool_description: string;
  start_date: string;
  end_date: string;
  funding_amount: number;
  currency_unit: string;
  contributions_amount?: number | null;
  proof_template: string;
}

export interface PoolComponentProps {
  pool: Pool;
}

// Issue Test Credentials

export interface IssueTestResultResponse {
  sent: boolean;
  qrUrl?: string;
  issuedCredentials?: any[];
  error?: string;
}

export interface EncryptionPayload {
  senderDid: string;
  recipientDids: string[];
  type: string;
  payload: {
    domain: string;
    credentials: any[];
  };
}


// Proof Templates is used for verifying credentials

export interface ProofTemplateVerificationProps {
  proofTemplateID: string;
  setHolderCredentials: (credentials: any) => void;
  setIsProofVerified: (isVerified: boolean) => void;
}

export interface ProofResponse {
  id: string;
  status: boolean;
  data: any | null;
  holderDID: string;
  credentials: any[];
}

// Research Pools
export interface PoolCardProps {
  title: string;
  startDate: string;
  endDate: string;
  funding: number;
  currency_unit: string;
  proofTemplateID: string; // Add this line
}

export interface PoolModalProps {
  proofTemplateID: string; // Add this interface
}


// Contributors

export interface Contributor {
  contributor_did: string;
  name?: string;
  phone_number?: string;
  country?: string;
  age?: number;
  gender?: string;
  medical_conditions?: string;
  consent_given?: boolean;
}

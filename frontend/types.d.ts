export interface DIDProfile {
  id: string;
  did: string;
  type: string;
  controller: string;
  credentialCount: string;
  updatedLast: string;
  profile: {
    name: string;
    description: string;
    logo: string;
    type: string;
  };
  keyId: string;
  jobId: string | null;
}

export type DIDProfiles = DIDProfile[];

interface SchemaMetadata {
  [key: string]: any; // Replace 'any' with a more specific type if possible
}

interface SchemaProperties {
  [key: string]: any; // Replace 'any' with a more specific type if possible
}

export interface SchemaDefinition {
  $metadata?: SchemaMetadata;
  $schema: string;
  description: string;
  properties: SchemaProperties;
  required?: string[];
  type: "object";
  name: string;
  additionalProperties: boolean;
  $id: string;
}

interface SchemaItem {
  schema: SchemaDefinition;
  id: string;
  uri: string;
  created: string;
}

export type SchemaArray = SchemaItem[];

export interface Contribution {
  credential_id: string;
  contributor_id: string;
  test_name: string;
  issuer_id: string;
  issuer_name: string;
  issuer_logo: string;
  cholesterol_value: string;
  cholesterol_unit: string;
  cholesterol_reference_range: string;
}
import { create } from 'zustand';
export interface Contribution {
  credential_id: string;
  contributor_id: string;
  test_name: string;
  issuer_id: string;
  issuer_name: string;
  issuer_logo: string;
  cholesterol_value: number;
  cholesterol_unit: string;
  cholesterol_reference_range: string;
  pool_id: string;
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

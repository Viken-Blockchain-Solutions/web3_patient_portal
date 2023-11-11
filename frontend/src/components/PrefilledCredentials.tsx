// Filename: app/admin/components/PreFilledCredential.tsx
'use client';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import { Button } from '@nextui-org/react';
import { SchemaDefinition } from '../../types';

interface PreFilledCredentialProps {
  schema: SchemaDefinition | any; 
  issuerDid: string;
  dockUrl: string;
  apiToken: string;
}

const PreFilledCredential: React.FC<PreFilledCredentialProps> = ({ schema }: any) => {
  const [credentialQR, setCredentialQR] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  const dockUrl = process.env.NEXT_PUBLIC_TEST_URL as string;
  const apiToken = process.env.NEXT_PUBLIC_TEST_API_KEY as string;

  const issueCredential = async () => {
    setIsLoading(true);

    // Pre-fill the credential data based on the schema
    const credentialBody = {
      "credential": {
          "id": `urn:uuid:${v4()}`, // Replace {{uuid}} with an actual UUID
          "@context": [
              "https://www.w3.org/2018/credentials/v1",
              "https://schema.dock.io/LabTestVerification-V1699459342994.json-ld"
          ],
          "type": [
              "VerifiableCredential",
              "LabTestVerification"
          ],
          "issuer": {
              "id": `${process.env.NEXT_PUBLIC_ISSUER_DID}`,
              "name": "VBS - Labs"
          },
          "issuanceDate": new Date().toISOString(),
          "credentialSubject": {
              "id": "did:key:z6MkpSo2tzogQaNyEJ14Q6cLCgcNPeKikyGv7SGudqfnqGis", // Replace {{subjectDid}} with the subject's DID or unique identifier
              "testName": "Lipid Panel",
              "results": {
                  "totalCholesterol": {
                      "value": "150",
                      "unit": "mg/dL",
                      "referenceRange": "50-250 mg/dL"
                  }
              }
          },
          "credentialSchema": {
              "id": "https://schema.dock.io/LabTestVerification-V1-1699459342994.json",
              "type": "JsonSchemaValidator2018"
          },
          "name": "Lab Test Verification",
          "description": "A verifiable credential for a lab test result."
      }
  }
    

    console.log("Prefilled data:", credentialBody)

    try {
      const response = await fetch(`${dockUrl}/credentials`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'DOCK-API-TOKEN': apiToken as string,
        },
        body: JSON.stringify(credentialBody),
      });

      if (!response.ok) {
        throw new Error(`Failed to issue credential: ${response.statusText}`);
      }

      const credentialData = await response.json();
      console.log("Successfully issued credential:", credentialData);
      setCredentialQR(credentialData.id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Button onClick={issueCredential} disabled={!schema}>
          Issue Credential
        </Button>
      )}
      {credentialQR && <div className="mt-4"></div>}
    </div>
  );
};

export default PreFilledCredential;

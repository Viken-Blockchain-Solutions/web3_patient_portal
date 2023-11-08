// Filename: app/admin/components/PreFilledCredential.tsx
'use client';
import React, { useState } from 'react';

import { Button } from '@nextui-org/react';
import { SchemaDefinition } from '../../types';

interface PreFilledCredentialProps {
  schema: SchemaDefinition | any; 
  issuerDid: string;
  dockUrl: string;
  apiToken: string;
}

const PreFilledCredential: React.FC<PreFilledCredentialProps> = ({ schema, issuerDid, dockUrl, apiToken }: any) => {
  const [credentialQR, setCredentialQR] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const issueCredential = async () => {
    setIsLoading(true);

    // Pre-fill the credential data based on the schema
    const preFilledData = {
      "@context": schema?.$metadata?.jsonLdContext,
      type: ['VerifiableCredential', schema.name],
      issuer: issuerDid,
      credentialSubject: {
        // ...populate with pre-filled data specific to the schema
      },
      // ...any other fields required by the schema
    };
    console.log("Prefilled data:", preFilledData)

    try {
      const response = await fetch(`${dockUrl}/credentials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'DOCK-API-TOKEN': 'eyJzY29wZXMiOlsidGVzdCIsImFsbCJdLCJzdWIiOiIxMDg5MSIsInNlbGVjdGVkVGVhbUlkIjoiMTUwMTIiLCJjcmVhdG9ySWQiOiIxMDg5MSIsImlhdCI6MTY5OTMwNTE3MSwiZXhwIjo0Nzc4NjAxMTcxfQ.nUnHQyBE1qz59oKALpQtDehxRZal1-ozdA59YnVI3A2W9KrulEUs1Ltga3rKdKlRUjHrHd8XE61MlE2o9sdLCg',
        },
        body: JSON.stringify(preFilledData),
      });

      if (!response.ok) {
        throw new Error(`Failed to issue credential: ${response.statusText}`);
      }

      const credentialData = await response.json();
      setCredentialQR(credentialData.qrCodeData);
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
      {credentialQR && (
        <div className="mt-4">
      
        </div>
      )}
    </div>
  );
};

export default PreFilledCredential;

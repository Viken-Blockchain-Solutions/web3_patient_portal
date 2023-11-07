'use client'
import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';

const dockUrl = process.env.NEXT_PUBLIC_TEST_URL as string;
const apiToken = 'eyJzY29wZXMiOlsidGVzdCIsImFsbCJdLCJzdWIiOiIxMDg5MSIsInNlbGVjdGVkVGVhbUlkIjoiMTUwMTIiLCJjcmVhdG9ySWQiOiIxMDg5MSIsImlhdCI6MTY5OTMwNTE3MSwiZXhwIjo0Nzc4NjAxMTcxfQ.nUnHQyBE1qz59oKALpQtDehxRZal1-ozdA59YnVI3A2W9KrulEUs1Ltga3rKdKlRUjHrHd8XE61MlE2o9sdLCg';

const Notification = ({ message }: any) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline">{message}</span>
    </div>
);

const AdminPage = () => {
    // State hooks for form inputs and responses
    const [did, setDid] = useState('');
    const [credential, setCredential] = useState('');
    const [presentation, setPresentation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

  
    const createDid = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${dockUrl}/dids`, {
          method: 'POST',
          body: JSON.stringify({"type": "dock"}),
          headers: {
            'Content-Type': 'application/json',
            'DOCK-API-TOKEN': apiToken,
          },
        });
        const data = await response.json();
        if (response.ok) {
            console.log("create did:", data.data)
          setDid(data.data.did);
        } else {
          throw new Error(data.message || 'Failed to create DID');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to create DID');
      } finally {
        setLoading(false);
      }
    };



    // Function to verify a DID
    const verifyDid = async () => {
        setLoading(true);
        try {
            // Call your API to verify the DID
            const response = await fetch(`${dockUrl}/verify-did/${did}`, { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'DOCK-API-TOKEN': apiToken,
                  }, 
                });

            const data = await response.json();
            console.log("verify did:", data.data)
            // Handle the verification response
            setLoading(false);
        } catch (err) {
            setError('Failed to verify DID');
            setLoading(false);
        }
    };

    // Function to issue a credential
    const issueCredential = async () => {
        setLoading(true);
        try {
            // Call your API to issue a credential
            const response = await fetch(`${dockUrl}/credentials`, { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'DOCK-API-TOKEN': apiToken,
                  },
                body: JSON.stringify({ did }) 
            });
            const data = await response.json();
            console.log("issue credential:", data.data)
            setCredential(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to issue credential');
            setLoading(false);
        }
    };

    // Function to verify a credential
    const verifyCredential = async () => {
        setLoading(true);
        try {
            // Call your API to verify the credential
            const response = await fetch(`${dockUrl}/api/verify-credential`, { 
                method: 'POST', 
                body: JSON.stringify({ credential }),
                headers: {
                    'Content-Type': 'application/json',
                    'DOCK-API-TOKEN': apiToken,
                  },
                });

            const data = await response.json();
            console.log("verify credential:", data.data)
            // Handle the verification response
            setLoading(false);
        } catch (err) {
            setError('Failed to verify credential');
            setLoading(false);
        }
    };

    // Function to create a presentation
    const createPresentation = async () => {
        setLoading(true);
        try {
            // Call your API to create a presentation
            const response = await fetch(`${dockUrl}/api/create-presentation`, { 
                method: 'POST', 
                body: JSON.stringify({ credential }),
                headers: {
                    'Content-Type': 'application/json',
                    'DOCK-API-TOKEN': apiToken,
                  } 
                });
            const data = await response.json();
            console.log("create presentation:", data.data)
            setPresentation(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to create presentation');
            setLoading(false);
        }
    };

    // Function to verify a presentation
    const verifyPresentation = async () => {
        setLoading(true);
        try {
            // Call your API to verify the presentation
            const response = await fetch(`${dockUrl}/api/verify-presentation`, { 
                method: 'POST', 
                body: JSON.stringify({ presentation }),
                headers: {
                    'Content-Type': 'application/json',
                    'DOCK-API-TOKEN': apiToken,
                  } 
            });
            const data = await response.json();
            console.log("verify presentation:", data.data)
            // Handle the verification response
            setLoading(false);
        } catch (err) {
            setError('Failed to verify presentation');
            setLoading(false);
        }
    };

    return (
        <div className="admin-page p-8">
            <h1 className="text-2xl font-bold mb-6">Admin - DID and Credential Management</h1>
            {error && <Notification message={error} />}
            <div className="space-x-4 mb-6">
                <Button disabled={loading} onClick={createDid}>Create DID</Button>
                <Button disabled={loading || !did} onClick={verifyDid}>Verify DID</Button>
                <Button disabled={loading || !did} onClick={issueCredential}>Issue Credential</Button>
                <Button disabled={loading || !credential} onClick={verifyCredential}>Verify Credential</Button>
                <Button disabled={loading || !credential} onClick={createPresentation}>Create Presentation</Button>
                <Button disabled={loading || !presentation} onClick={verifyPresentation}>Verify Presentation</Button>
            </div>
            {/* Display the DID, Credential, and Presentation data */}
            <div>
                <h3 className="text-lg">DID: {did}</h3>
                <h3 className="text-lg">Credential: {credential}</h3>
                <h3 className="text-lg">Presentation: {presentation}</h3>
            </div>
        </div>
    );
};

export default AdminPage;

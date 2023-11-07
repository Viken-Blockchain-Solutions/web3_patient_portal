// Filename: app/admin/pages/SchemasPage.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
const dockUrl = process.env.NEXT_PUBLIC_TEST_URL as string;
const apiToken = 'eyJzY29wZXMiOlsidGVzdCIsImFsbCJdLCJzdWIiOiIxMDg5MSIsInNlbGVjdGVkVGVhbUlkIjoiMTUwMTIiLCJjcmVhdG9ySWQiOiIxMDg5MSIsImlhdCI6MTY5OTMwNTE3MSwiZXhwIjo0Nzc4NjAxMTcxfQ.nUnHQyBE1qz59oKALpQtDehxRZal1-ozdA59YnVI3A2W9KrulEUs1Ltga3rKdKlRUjHrHd8XE61MlE2o9sdLCg';


interface SchemaMetadata {
    jsonLdContext: string;
    jsonSchema: string;
}

interface SchemaProperties {
    [key: string]: any;
}

interface SchemaDefinition {
    $metadata: SchemaMetadata;
    $schema: string;
    description: string;
    properties: SchemaProperties;
    required: string[];
    type: string;
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

const SchemaCard: React.FC<{ schema: SchemaDefinition }> = ({ schema }) => {
    // Implement the SchemaCard component
    return (
        <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium">{schema.name}</h3>
            <p>{schema.description}</p>
            {/* Render more schema details here */}
        </div>
    );
};

const SchemasPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [schemas, setSchemas] = useState<SchemaItem[]>([]);
    const [selectedSchemaId, setSelectedSchemaId] = useState<string>('');
    const [selectedSchema, setSelectedSchema] = useState<SchemaDefinition | null>(null);
    const [credentialQR, setCredentialQR] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/list-schemas');
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                // Assuming the API returns an object with a 'schemas' key containing the array
                if (data) {
                    console.log("data:", data.data)
                    setSchemas(data.data);
                } else {
                    // Handle the case where data.schemas is not an array
                    console.error('Data is not an array:', data);
                    setSchemas([]); // Set to an empty array or handle accordingly
                }
            } catch (error) {
                console.error('Failed to fetch schemas:', error);
                setSchemas([]); // Fallback to an empty array in case of error
            } finally {
                setIsLoading(false);
            }
        };



        fetchData();
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const schemaId = event.target.value;
        setSelectedSchemaId(schemaId);
        const schemaItem = schemas?.find((schema) => schema.id === schemaId);
        setSelectedSchema(schemaItem ? schemaItem.schema : null);
    };

    const issueCredential = async () => {
        setIsLoading(true);
        if (!selectedSchemaId) {
            console.error('No schema selected');
            return;
        }

        try {
            const response = await fetch(`${dockUrl}/credentials`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'DOCK-API-TOKEN': apiToken,
                },
                body: JSON.stringify({
                    "credential": {
                        "id": "http://example.com/39",
                        "context": ["https://www.w3.org/2018/credentials/examples/v1"],
                        "type": [
                            "VerifiableCredential"
                        ],
                        "subject": {
                            "id": "did:dock:5ELhyt6HMBqBsurH2cYtnYQC2n4BEJkvXwCsiwgegHv3EXiD"
                        },
                        "issuer": {
                            "id": "did:dock:5ELhyt6HMBqBsurH2cYtnYQC2n4BEJkvXwCsiwgegHv3EXiD",
                            "name": "VBS - Issuer"
                        }
                    }
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to issue credential: ${response.statusText}`);
            }

            const credentialData = await response.json();
            // Assuming credentialData contains a property 'qrCodeData' that we need to display
            setCredentialQR(credentialData.qrCodeData);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false); // Hide loading feedback
        }
    };

    return (
        <div className="p-4">
            {isLoading && <div>Loading...</div>}
            <div className="flex flex-row gap-4 mb-8">
                <div className="w-1/2">
                    <label htmlFor="schema-select" className="block text-sm font-medium text-gray-700">
                        Select Credential Schema
                    </label>
                    <select
                        id="schema-select"
                        value={selectedSchemaId}
                        onChange={handleSelectChange}
                        className="..."
                    >
                        <option value="">Select a schema...</option>
                        {Array.isArray(schemas) && schemas.map((schemaItem) => (
                            <option key={schemaItem.id} value={schemaItem.id}>
                                {schemaItem.schema.name}
                            </option>
                        ))}
                    </select>

                </div>
                <div className="w-1/2">
                    {selectedSchema && <SchemaCard schema={selectedSchema} />}
                </div>
            </div>

            {/* New row for issuing the credential */}
            <div className="mt-8">
                <button onClick={issueCredential} className="mt-4">
                    Issue Credential
                </button>
                {credentialQR && (
                    <div className="mt-4">
                        <QRCodeSVG value={credentialQR} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SchemasPage;

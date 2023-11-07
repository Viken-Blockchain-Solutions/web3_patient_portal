// Filename: app/admin/pages/SchemasPage.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface SchemaMetadata {
  jsonLdContext: string;
  jsonSchema: string;
}

interface SchemaProperties {
  [key: string]: any; // Replace 'any' with a more specific type if possible
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
  const [schemas, setSchemas] = useState<SchemaItem[]>([]);
  const [selectedSchemaId, setSelectedSchemaId] = useState<string>('');
  const [selectedSchema, setSelectedSchema] = useState<SchemaDefinition | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/list-schemas');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setSchemas(data); // Assuming the API returns the array directly
      } catch (error) {
        console.error('Failed to fetch schemas:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const schemaId = event.target.value;
    setSelectedSchemaId(schemaId);
    const schemaItem = schemas.find((schema) => schema.id === schemaId);
    setSelectedSchema(schemaItem ? schemaItem.schema : null);
  };

  return (
    <div className="p-4">
      <div className="flex flex-row gap-4 mb-8">
        <div className="w-1/2">
          <label htmlFor="schema-select" className="block text-sm font-medium text-gray-700">
            Select Credential Schema
          </label>
          <select
            id="schema-select"
            value={selectedSchemaId}
            onChange={handleSelectChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select a schema...</option>
            {schemas.map((schema) => (
              <option key={schema.id} value={schema.id}>
                {schema.schema.name}
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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={issueCredential}
        >
          Issue Credential
        </button>

        {qrCodeData && (
          <div className="mt-4">
            <QRCodeSVG value={qrCodeData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemasPage;

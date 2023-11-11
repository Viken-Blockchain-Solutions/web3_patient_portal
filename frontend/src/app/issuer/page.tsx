// Filename: app/admin/pages/SchemasPage.tsx
// import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@nextui-org/react';
import PreFilledCredential from '../../components/PrefilledCredentials';

import { dockUrl, apiToken } from '../layout';

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

const renderProperty = (property: any, value: any) => {
  if (value.type === "object") {
    return (
      <div
        key={property}
        className="border-1 p-5 rounded-lg border-gray-300 mt-1"
      >
        <p className="text-base">
          <span className="font-semibold">{value.title || property}:</span>
        </p>
        <p className="text-xs leading-6">{value.description}</p>
        {Object.entries(value.properties || {}).map(
          ([nestedKey, nestedValue]) => renderProperty(nestedKey, nestedValue)
        )}
      </div>
    );
  } else {
    return (
      <div key={property} className="p-4 rounded-lg shadow-md">
        <p className="text-base pt-1">
          <span className="font-semibold">{value.title || property}:</span>
        </p>
        <p className="text-xs leading-6 pb-1">{value.description}</p>
      </div>
    );
  }
};

const SchemaCard: React.FC<{ schema: SchemaDefinition }> = ({ schema }) => {
  console.log("Schema:", schema);

  return (
    <div className="grid rounded-lg p-3 gap-3">
      <h3 className="text-lg font-bold leading-5">{schema.name}</h3>
      <p className="text-xs leading-6">{schema.description}</p>
      {Object.entries(schema.properties).map(([key, value]) =>
        renderProperty(key, value)
      )}
    </div>
  );
};

const SchemasPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [schemas, setSchemas] = useState<SchemaItem[] | null>(null);
  const [selectedSchemaId, setSelectedSchemaId] = useState<string>("");
  const [selectedSchema, setSelectedSchema] = useState<SchemaDefinition | null>(
    null
  );
  const [credentialQR, setCredentialQR] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/list-schemas");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        // Assuming the API returns an object with a 'schemas' key containing the array
        if (data.data) {
          console.log("data:", data.data);
          setSchemas(data.data);
        } else {
          // Handle the case where data.schemas is not an array
          console.error("Data is not an array:", data);
          setSchemas(null); // Set to an empty array or handle accordingly
        }
      } catch (error) {
        console.error("Failed to fetch schemas:", error);
        setSchemas(null); // Fallback to an empty array in case of error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const schemaId = event.target.value;
    console.log("schemaId:", schemaId);
    setSelectedSchemaId(schemaId);
    const schemaItem = schemas?.find((schema) => schema.id === schemaId);
    setSelectedSchema(schemaItem ? schemaItem.schema : null);
  };

  const issueCredential = async () => {
    setIsLoading(true);
    if (!selectedSchemaId) {
      console.error("No schema selected");
      return;
    }

    try {
      const response = await fetch(`${dockUrl}/credentials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "DOCK-API-TOKEN": `${dockApiKey}`
        },
        body: JSON.stringify({
          schemaId: selectedSchemaId
        })
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
          <label
            htmlFor="schema-select"
            className="block text-sm font-medium text-gray-700"
          >
            Select Credential Schema
          </label>
          <select
            id="schema-select"
            value={selectedSchemaId}
            onChange={handleSelectChange}
            className="..."
          >
            <option value="">Select a schema...</option>
            {Array.isArray(schemas) &&
              schemas.map((schemaItem) => (
                <option key={schemaItem.id} value={schemaItem.id}>
                  {schemaItem.schema.name}
                </option>
              ))}
          </select>

                    <div className="mt-8">
                        <Button onClick={issueCredential} className="mt-4">
                            Issue Credential
                        </Button>
                        {credentialQR && (
                            <div className="mt-4">
                                /
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-3/4">
                    {selectedSchema && <SchemaCard schema={selectedSchema} />}
                </div>
            <PreFilledCredential
                // @ts-ignore
                schema={selectedSchema}
                issuerDid={process.env.NEXT_PUBLIC_ISSUER_DID as string}
                dockUrl={dockUrl}
                // @ts-ignore
                apiToken={apiToken}
            />
            </div>
            {/* New row for issuing the credential */}

        </div>
    );
};

export default SchemasPage;

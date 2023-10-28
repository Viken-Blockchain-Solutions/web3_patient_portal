# Schemas for Decentralized Identity Verification in Healthcare

This folder contains the schema and context files for decentralized identity verification related to healthcare, specifically for blood clot lab tests and general lab tests.

## Files

### Blood Clot Lab Tests

1. **JSON Schema**: `BloodClotLabTestCredential-v1.json`  
   - **Location**: `schemas/json/healthcare/`
   - **Purpose**: Defines the structure and validation rules for blood clot lab test credentials.
   
2. **JSON-LD Context**: `BloodClotLabTestContext-v1.json-ld`  
   - **Location**: `schemas/json-ld/healthcare/`
   - **Purpose**: Provides the semantic context for terms used in blood clot lab test credentials.

### General Lab Tests

1. **JSON Schema for General Lab Tests**: `LabTestCredential-v1.json`  
   - **Location**: `schemas/json/healthcare/`
   - **Purpose**: Defines the structure and validation rules for general lab test credentials.

2. **JSON-LD Context for General Lab Tests**: `labtest-v1.json-ld`  
   - **Location**: `schemas/json-ld/healthcare/`
   - **Purpose**: Provides the semantic context for terms used in general lab test credentials.

## Use Cases and Workflow

### JSON Schema

#### Use Case

- **Validation**: Ensures that the data structure of the lab test credentials adheres to the defined schema. This is crucial for maintaining data integrity and interoperability.

#### How to Use

1. **Data Validation**: Before issuing or verifying a credential, validate the data against this schema to ensure it meets the required structure.
2. **API Contract**: Can be used as a contract for APIs that will produce or consume this kind of credential.
3. **Documentation**: Provides a structured way to understand what fields a credential must have, aiding in development and debugging.

### JSON-LD Context

#### Use Case

- **Semantic Interoperability**: Provides a way to map the terms in the JSON document to their corresponding Linked Data definitions (IRIs). This is essential for ensuring that the data is not only syntactically correct but also semantically meaningful.

#### How to Use

1. **Data Linking**: When issuing or verifying a credential, this context is referenced to map the terms in the credential to their globally-recognized identifiers.
2. **Data Integration**: Helps in integrating the data with other linked data ecosystems or ontologies, especially in healthcare systems that might use different terminologies.
3. **Data Understanding**: Makes the credential self-descriptive, aiding in data discovery and reuse.

### Typical Workflow

1. **Issuance**: When a lab test is completed, a new credential is created. Before issuing, the data is validated against the JSON Schema. The JSON-LD Context is included in the credential to provide semantic context.
  
2. **Verification**: When the credential needs to be verified, it's first checked against the JSON Schema for structural validity. The JSON-LD Context is then used to ensure semantic integrity.

3. **Interoperability**: Both the schema and the context ensure that the credential can be understood and used not just within your own application, but also across different healthcare systems that adhere to similar standards.

By using both, you ensure that your credentials are both structurally valid and semantically meaningful, adhering to best practices in decentralized identity and healthcare data management.

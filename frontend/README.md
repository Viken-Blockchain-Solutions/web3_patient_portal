# Decentralized Identity and Lab Test Verification

## Overview

This Next.js application serves as a comprehensive solution for secure credentials and lab test result verification in healthcare settings. A unique feature is the integration of a lab test result issuance system, allowing healthcare providers to securely and directly send verified test results to patients.

## Table of Contents

- [Decentralized Identity and Lab Test Verification](#decentralized-identity-and-lab-test-verification)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Key Features](#key-features)
  - [Technology Stack](#technology-stack)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Running the App](#running-the-app)
  - [Workflow](#workflow)
  - [Performance Metrics](#performance-metrics)
  - [Potential Risks](#potential-risks)
  - [How to Contribute](#how-to-contribute)
  - [Licensing](#licensing)

## Key Features

- Decentralized credentials verification via Dock Certs.
- Next.js frontend, leveraging the "app-router" approach for enhanced scalability
- Direct issuance of Verifiable Credentials (VC) for lab test results to patients' wallets
- Manual importing VC's for lab test results to patients' wallet

## Technology Stack

- **Frontend**: Next.js
- **Identity Management**: Dock Wallet
- **Blockchain Interactions**: Dock testnet
- **DID Technologies**: Creating DID's, issuing VC's, DidComm, Presentations,Proof-Requests.

## Getting Started

### Installation

```bash
# Clone the repository to your local machine
git clone https://github.com/Viken-Blockchain-Solutions/web3_patient_portal.git

# Change to the project directory
cd web3_patient_portal

# Install required packages
yarn install
```

### Running the App

```bash
# Start the development server
yarn dev
```

## Workflow

1. **Patient Consultation**: Patients consult with healthcare specialists.
2. **Lab Tests**: Based on the consultation, lab tests such as blood clot tests are prescribed.
3. **Lab Processing**: Tests are conducted and results are processed in the lab.
4. **Verifiable Credentials**: The lab generates a Verifiable Credential (VC) for the test result.
5. **Issuance**: The VC is issued directly to the patient's digital wallet. This can be done whether the patient is on-site or off-site.

## Performance Metrics

- Count of successful credentials verifications

## Potential Risks

- Interoperability with pre-existing healthcare systems

## How to Contribute

For guidelines on contributing to this project, please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) document.

## Licensing

This project is distributed under the MIT License. For more information, see the [LICENSE.md](LICENSE.md) file.

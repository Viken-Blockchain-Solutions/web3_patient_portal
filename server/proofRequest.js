const { CholesterolLabTestCredential } = require("./vcHelpers/CholesterolLabTestCredential");

// design your own customised authentication requirement here using Query Language
// https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/

const humanReadableAuthReason = "Lipid Panel LabResult Credential";

const credentialSubject = {
  "circuitId": "credentialAtomicQuerySigV2",
  "id": 1698964266,
  "query": {
    "allowedIssuers": [
      "*"
    ],
    "context": "ipfs://QmP1GavowvEbCQZGsQSGvEn2UWAz5dnbYsMBXXx9rGe8vj",
    "credentialSubject": {
      "testName": {
        "$eq": "Lipid Panel"
      }
    },
    "type": "CholesterolLabTestCredential"
  }
};

const proofRequest = CholesterolLabTestCredential(credentialSubject);

module.exports = {
  humanReadableAuthReason,
  proofRequest,
};

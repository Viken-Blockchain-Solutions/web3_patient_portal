export const labtest_credential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    {
      dk: "https://ld.dock.io/credentials#",
      LabTestVerification: "dk:LabTestVerification",
      results: "dk:results",
      totalCholesterol: "dk:totalCholesterol",
      value: "dk:value",
      unit: "dk:unit",
      referenceRange: "dk:referenceRange",
      testName: "dk:testName",
      name: "dk:name",
      logo: "dk:logo"
    }
  ],
  id: "https://creds-testnet.dock.io/dc76fb6e8d7f0f21a3a478c34ceb9e0dc6eaa939c3219c4cff35af3864c228b3",
  type: ["VerifiableCredential", "LabTestVerification"],
  credentialSubject: {
    results: {
      totalCholesterol: {
        value: "150",
        unit: "mg/dl",
        referenceRange: "50-250"
      }
    },
    id: "did:key:z6MkpSo2tzogQaNyEJ14Q6cLCgcNPeKikyGv7SGudqfnqGis",
    testName: "Lipid Test"
  },
  issuanceDate: "2023-11-08T16:02:34.401Z",
  issuer: {
    name: "VBS - Test VC Issuer ",
    logo: "https://img.dock.io/0585947e51bf445a4c5fabe3b7ce86e6",
    id: "did:dock:5ELhyt6HMBqBsurH2cYtnYQC2n4BEJkvXwCsiwgegHv3EXiD"
  },
  name: "Lab Test Verification",
  credentialSchema: {
    id: "data:application/json;charset=utf-8,%7B%22%24schema%22%3A%22http%3A%2F%2Fjson-schema.org%2Fdraft-07%2Fschema%23%22%2C%22type%22%3A%22object%22%2C%22properties%22%3A%7B%22credentialSubject%22%3A%7B%22type%22%3A%22object%22%2C%22properties%22%3A%7B%22id%22%3A%7B%22type%22%3A%22string%22%7D%2C%22results%22%3A%7B%22type%22%3A%22object%22%2C%22properties%22%3A%7B%22totalCholesterol%22%3A%7B%22type%22%3A%22object%22%2C%22properties%22%3A%7B%22value%22%3A%7B%22type%22%3A%22string%22%7D%2C%22unit%22%3A%7B%22type%22%3A%22string%22%7D%2C%22referenceRange%22%3A%7B%22type%22%3A%22string%22%7D%7D%7D%7D%7D%2C%22testName%22%3A%7B%22type%22%3A%22string%22%7D%7D%7D%2C%22proof%22%3A%7B%22type%22%3A%22object%22%2C%22properties%22%3A%7B%22type%22%3A%7B%22type%22%3A%22string%22%7D%2C%22%40context%22%3A%7B%22type%22%3A%22array%22%2C%22items%22%3A%5B%7B%22type%22%3A%22object%22%2C%22properties%22%3A%7B%22sec%22%3A%7B%22type%22%3A%22string%22%7D%2C%22proof%22%3A%7B%22type%22%3A%22object%22%2C%22properties%22%3A%7B%22%40id%22%3A%7B%22type%22%3A%22string%22%7D%2C%22%40type%22%3A%7B%22type%22%3A%22string%22%7D%2C%22%40container%22%3A%7B%22type%22%3A%22string%22%7D%7D%7D%7D%7D%2C%7B%22type%22%3A%22string%22%7D%5D%7D%2C%22created%22%3A%7B%22type%22%3A%22string%22%2C%22format%22%3A%22date-time%22%7D%2C%22verificationMethod%22%3A%7B%22type%22%3A%22string%22%7D%2C%22proofPurpose%22%3A%7B%22type%22%3A%22string%22%7D%7D%7D%2C%22cryptoVersion%22%3A%7B%22type%22%3A%22string%22%7D%2C%22credentialSchema%22%3A%7B%22type%22%3A%22string%22%7D%2C%22%40context%22%3A%7B%22type%22%3A%22string%22%7D%2C%22id%22%3A%7B%22type%22%3A%22string%22%7D%2C%22issuanceDate%22%3A%7B%22type%22%3A%22string%22%2C%22format%22%3A%22date-time%22%7D%2C%22issuer%22%3A%7B%22type%22%3A%22object%22%2C%22properties%22%3A%7B%22name%22%3A%7B%22type%22%3A%22string%22%7D%2C%22logo%22%3A%7B%22type%22%3A%22string%22%7D%2C%22id%22%3A%7B%22type%22%3A%22string%22%7D%7D%7D%2C%22name%22%3A%7B%22type%22%3A%22string%22%7D%2C%22type%22%3A%7B%22type%22%3A%22string%22%7D%7D%2C%22definitions%22%3A%7B%22encryptableString%22%3A%7B%22type%22%3A%22string%22%7D%2C%22encryptableCompString%22%3A%7B%22type%22%3A%22string%22%7D%7D%7D",
    type: "JsonSchemaValidator2018",
    parsingOptions: {
      useDefaults: false,
      defaultMinimumInteger: -4294967295,
      defaultMinimumDate: -17592186044415,
      defaultDecimalPlaces: 0
    },
    version: "0.0.3"
  },
  proof: {
    "@context": [
      {
        sec: "https://w3id.org/security#",
        proof: {
          "@id": "sec:proof",
          "@type": "@id",
          "@container": "@graph"
        }
      },
      "https://ld.dock.io/security/bbs/v1"
    ],
    type: "Bls12381BBS+SignatureDock2022",
    created: "2023-11-08T16:05:57Z",
    verificationMethod:
      "did:dock:5ELhyt6HMBqBsurH2cYtnYQC2n4BEJkvXwCsiwgegHv3EXiD#keys-2",
    proofPurpose: "assertionMethod",
    proofValue:
      "zVuXcyjNAWk6h5UadRJAuaTjVJfwKg35Hd1ZuZvx6xBtUCZNfoj1x21FKzMyBfBYv9vve7m5jkYmiEkrrapHDKBaFAEFmSBBGiWC2KVs6GpiR9AVbppgA714Z2eyRttqQsPBcpEdJjwXyUAiz5XVX7ZpBk"
  }
};

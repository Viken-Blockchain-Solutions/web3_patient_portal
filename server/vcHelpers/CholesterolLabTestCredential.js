module.exports = {
  // VC type: CholesterolLabTestCredential
  // https://raw.githubusercontent.com/Viken-Blockchain-Solutions/web3_patient_portal/main/schemas/json-ld/healthcare/CholesterolLabTestCredential-v1.jsonld
  CholesterolLabTestCredential: (credentialSubject) => ({
    id: 1,
    circuitId: "credentialAtomicQuerySigV2",
    query: {
      allowedIssuers: ["*"],
      type: "CholesterolLabTestCredential",
      context:
        "https://raw.githubusercontent.com/Viken-Blockchain-Solutions/web3_patient_portal/main/schemas/json-ld/healthcare/CholesterolLabTestCredential-v1.jsonld",
      credentialSubject,
    },
  }),
  // See more off-chain examples
  // https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/#equals-operator-1
};

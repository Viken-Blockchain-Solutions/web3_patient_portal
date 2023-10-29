const { CholesterolLabTestCredential } = require("./vcHelpers/CholesterolLabTestCredential");

// design your own customised authentication requirement here using Query Language
// https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/

const humanReadableAuthReason = "Lipid Panel";

const credentialSubject = {

      testName: {
        $eq: "Lipid Panel"
      }
    };

const proofRequest = CholesterolLabTestCredential(credentialSubject);

module.exports = {
  humanReadableAuthReason,
  proofRequest,
};

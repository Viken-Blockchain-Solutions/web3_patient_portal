"use client";
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { labtest_credential } from "../../utils/schemas/prefilled_labtest_credential";
const dockUrl = process.env.NEXT_PUBLIC_TEST_URL as string;
const apiToken = process.env.NEXT_PUBLIC_TEST_API_KEY as string;
// const apiToken = 'eyJzY29wZXMiOlsidGVzdCIsImFsbCJdLCJzdWIiOiIxMDg5MSIsInNlbGVjdGVkVGVhbUlkIjoiMTUwMTIiLCJjcmVhdG9ySWQiOiIxMDg5MSIsImlhdCI6MTY5OTMwNTE3MSwiZXhwIjo0Nzc4NjAxMTcxfQ.nUnHQyBE1qz59oKALpQtDehxRZal1-ozdA59YnVI3A2W9KrulEUs1Ltga3rKdKlRUjHrHd8XE61MlE2o9sdLCg';

const Notification = ({ message }: any) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong className="font-bold">Error!</strong>
    <span className="block sm:inline">{message}</span>
  </div>
);

const AdminPage = () => {
  // State hooks for form inputs and responses
  const [did, setDid] = useState("");
  const [didJob, setDidJob] = useState("");
  const [issuedCredential, setIssuedCredential] = useState();
  const [credential, setCredential] = useState<object | null>();
  const [presentation, setPresentation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch dids and setDid based on profile == null, testing purposes only
  const getDid = async () => {
    try {
      const response = await fetch(`${dockUrl}/dids`, {
        method: "GET",
        headers: {
          "DOCK-API-TOKEN": apiToken,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log("getDid", { data });
        data.find((did: any) => {
          if (did.profile === null) setDid(did.did);
        });
      }
    } catch (error) {
      console.log("getDidError", error);
    }
  };

  const createDid = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${dockUrl}/dids`, {
        method: "POST",
        body: JSON.stringify({ type: "dock", keyType: "ed25519" }),
        headers: {
          "Content-Type": "application/json",
          "DOCK-API-TOKEN": apiToken
        }
      });
      const data = await response.json();
      if (response.ok) {
        console.log("create did:", data);
        console.log("create did.jobId:", data.id);
        setDid(data.did);
        setDidJob(data.id);
      } else {
        throw new Error(data.message || "Failed to create DID");
      }
    } catch (err: any) {
      console.log("createDid:Error:", err);

      setError(err.message || "Failed to create DID");
    } finally {
      setLoading(false);
    }
  };

  // Function to verify a DID
  const verifyDid = async () => {
    setLoading(true);
    try {
      // Call your API to verify the DID
      const response = await fetch(`${dockUrl}/jobs/${didJob}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "DOCK-API-TOKEN": apiToken
        }
      });

      const data = await response.json();
      console.log("verify did:", data);
      // Handle the verification response
      setLoading(false);
    } catch (err) {
      setError("Failed to verify DID");
      setLoading(false);
    }
  };

  // get credentials
  const getCredentials = async () => {
    try {
      const response = await fetch(`${dockUrl}/credentials`, {
        method: "GET",
        headers: {
          "DOCK-API-TOKEN": apiToken,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log("getCredentials", { data });
        data.find((_credential: any) => {
          if (_credential.type === "TestCredential") setCredential(_credential);
        });
      }
    } catch (error) {
      console.log("getCredentials:error", error);
    }
  };
  // Function to issue a credential
  const issueCredential = async () => {
    if (did === "")
      return console.log("no [did], need one to issue credential");
    const credentialBody = {
      type: ["TestCredential"],
      subject: {
        propOne: "propOne",
      },
      issuanceDate: new Date().toISOString(),
      issuer: did,
    };
    setLoading(true);
    try {
      console.log("creating a signed credential");
      // Call your API to issue a credential
      const response = await fetch(`${dockUrl}/credentials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "DOCK-API-TOKEN": apiToken
        },
        body: JSON.stringify({ credential: credentialBody }),
      });
      if (response.status === 200) {
        const _credential = await response.json();
        console.log("issue credential success:", { _credential });
        setIssuedCredential(_credential);
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to issue credential");
      setLoading(false);
    }
  };

  // Function to verify a credential
  const verifyCredential = async () => {
    setLoading(true);
    try {
      // Call your API to verify the credential
      const response = await fetch(`${dockUrl}/verify`, {
        method: "POST",
        body: JSON.stringify(issuedCredential),
        headers: {
          "Content-Type": "application/json",
          "DOCK-API-TOKEN": apiToken
        }
      });

      const data = await response.json();
      console.log("verify credential:success", { data });
      // Handle the verification response
      setLoading(false);
    } catch (err) {
      setError("Failed to verify credential");
      setLoading(false);
    }
  };

  // Function to create a presentation
  const createPresentation = async () => {
    setLoading(true);
    try {
      // Call your API to create a presentation
      const response = await fetch(`${dockUrl}/api/create-presentation`, {
        method: "POST",
        body: JSON.stringify(credential),
        headers: {
          "Content-Type": "application/json",
          "DOCK-API-TOKEN": apiToken
        }
      });
      const data = await response.json();
      console.log("create presentation:", data.data);
      setPresentation(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to create presentation");
      setLoading(false);
    }
  };

  // Function to verify a presentation
  const verifyPresentation = async () => {
    setLoading(true);
    try {
      // Call your API to verify the presentation
      const response = await fetch(`${dockUrl}/api/verify-presentation`, {
        method: "POST",
        body: JSON.stringify(presentation),
        headers: {
          "Content-Type": "application/json",
          "DOCK-API-TOKEN": apiToken
        }
      });
      const data = await response.json();
      console.log("verify presentation:", data.data);
      // Handle the verification response
      setLoading(false);
    } catch (err) {
      setError("Failed to verify presentation");
      setLoading(false);
    }
  };

  return (
    <div className="admin-page p-8">
      <h1 className="text-2xl font-bold mb-6">
        Admin - DID and Credential Management
      </h1>
      {error && <Notification message={error} />}
      <div className="space-x-4 mb-6">
        <Button disabled={loading} onClick={getDid}>
          Get DID
        </Button>
        <Button disabled={loading} onClick={createDid}>
          Create DID
        </Button>
        <Button disabled={loading || !did} onClick={verifyDid}>
          Verify DID
        </Button>
        <Button disabled={loading} onClick={getCredentials}>
          Get Credentials
        </Button>
        <Button disabled={loading || !did} onClick={issueCredential}>
          Issue Credential
        </Button>
        <Button disabled={loading || !issuedCredential} onClick={verifyCredential}>
          Verify Credential
        </Button>
        <Button disabled={loading || !credential} onClick={createPresentation}>
          Create Presentation
        </Button>
        <Button
          disabled={loading || !presentation}
          onClick={verifyPresentation}
        >
          Verify Presentation
        </Button>
      </div>
      {/* Display the DID, Credential, and Presentation data */}
      <div>
        <h3 className="text-lg">DID: {did}</h3>
        {issuedCredential && (
            //@ts-ignore
          <h3 className="text-lg">issuedCredential: {issuedCredential.type}</h3>
        )}
        <h3 className="text-lg">Presentation: {presentation}</h3>
      </div>
    </div>
  );
};

export default AdminPage;

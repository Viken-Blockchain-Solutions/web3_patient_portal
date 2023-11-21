import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";

interface LabResultsProps {
  credentials: any[];
}

const creds = ["Cholesteroltest", "Bloodtest", "Diabetestest"];

export default function LabResults({ credentials }: LabResultsProps) {
  console.log(credentials);
  return (
    <div className="p-4 mt-4 rounded-md justify-center items-center bg-green-100">
      <div className="p-4 mt-4 rounded-md justify-center items-center bg-green-100">
        <table className="min-w-full divide-y divide-gray-200 rounded-md">
          <thead className="bg-green-50">
            <tr>
              <th colSpan={2} className="px-6 py-4 text-left text-sm font-semibold text-green-800">
                <p className="text-md leading-6 pb-1">
                  Follow the links below to view your lab results.
                </p>
                <p className="text-md leading-6 pb-1">
                  Scan the QR code on the page to import the
                  <span className="text-green-800 underline font-semibold mr-2">Verifiable Credential</span>
                  into your <span className="text-green-800 underline font-semibold">DOCK WALLET</span>.
                </p>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {credentials.map((credential, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {creds[index]} PDF Link
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link href={credential.id} target="_blank" rel="noopener noreferrer" className="text-green-800 underline font-semibold">
                      <FontAwesomeIcon icon={faHandPointRight} /> Access {creds[index]} Results
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-10 py-2 whitespace-nowrap text-xs font-medium text-gray-700">
                  PDF Password
                  </td>
                  <td className="px-8 py-2 whitespace-nowrap text-xs text-gray-500">
                  1234
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

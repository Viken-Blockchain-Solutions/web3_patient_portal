// Filename: app/admin/pages/TestQRCode.tsx
//import { QRCodeSVG } from 'qrcode.react';
"use client";
import React, { useState } from "react";

const TestQRCode: React.FC = () => {
  const [showQR, setShowQR] = useState(false);
  //   const testQRValue = "https://example.com/test-qr-code";

  const handleGenerateQR = () => {
    setShowQR(true);
  };

  return (
    <div className="p-4">
      <button onClick={handleGenerateQR} className="my-4">
        Generate Test QR Code
      </button>
      {showQR && (
        <div className="mt-4">{/** <QRCodeSVG value={testQRValue} /> */}</div>
      )}
    </div>
  );
};

export default TestQRCode;

// Filename: app/admin/pages/TestQRCode.tsx
'use client';
import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@nextui-org/react';

const TestQRCode: React.FC = () => {
    const [showQR, setShowQR] = useState(false);
    const testQRValue = 'https://example.com/test-qr-code';

    const handleGenerateQR = () => {
        setShowQR(true);
    };

    return (
        <div className="p-4">
            <Button onClick={handleGenerateQR} className="my-4">
                Generate Test QR Code
            </Button>
            {showQR && (
                <div className="mt-4">
                    <QRCodeSVG value={testQRValue} />
                </div>
            )}
        </div>
    );
};

export default TestQRCode;

"use client";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType, QrcodeErrorCallback, QrcodeSuccessCallback } from "html5-qrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { userStore } from "../../../stores/appStore";

export default function QrReader() {
    const Did = userStore((state: any) => state.Did)
    const setDid = userStore((state: any) => state.setDid)
    const [autoStartCamera] = useState(true);

    let scanner: any;
    useEffect(() => {
        if (autoStartCamera) {
            scanner = new Html5QrcodeScanner(
                "reader",
                {
                    fps: 8,
                    qrbox: {
                        width: 250,
                        height: 250,
                    },
                    experimentalFeatures: {
                        useBarCodeDetectorIfSupported: true
                    },
                    rememberLastUsedCamera: true,
                    supportedScanTypes: [
                        Html5QrcodeScanType.SCAN_TYPE_CAMERA
                    ],
                },
                false
            );
        }
        return () => {
            if (scanner) {
                scanner.clear();
            }
        };
    }, [autoStartCamera]);

    function startCamera() {
        scanner.render(onScanSuccess, onScanFailure);
    }

    async function onScanSuccess(decodedResult: QrcodeSuccessCallback) {
        scanner.clear();
        const result = extractQRData(decodedResult);
        setDid(result)
    }

    const extractQRData = (decodedResult: any) => {
        return decodedResult
    }

    function onScanFailure(error: QrcodeErrorCallback) {
        console.warn(`Code scan error = ${error}`);
    }

    return (
        <div className="card lg:card-side">
            <div>
                {(!Did || Did === '') && (
                    <>
                        <div id="reader" className="w-auto"></div>
                        <button
                            className="btn-primary mt-3"
                            onClick={startCamera}>
                            <FontAwesomeIcon icon={faQrcode} />   Scan Qr code
                        </button>
                    </>
                )}
            </div>
            {(Did && Did !== '') &&
                <>
                    <button
                        className="btn-primary mt-3"
                        onClick={startCamera}>
                        <FontAwesomeIcon icon={faQrcode} /> Scan Again
                    </button>
                </>
            }
            <br />

        </div>
    );
}

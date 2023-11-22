"use client";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { userStore } from "../../../stores/appStore";

export default function QrReader() {
  const Did = userStore((state: any) => state.Did);
  const setDid = userStore((state: any) => state.setDid);

  let scanner: any;

  function startCamera() {
    scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 8,
        qrbox: {
          width: 250,
          height: 250
        },
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true
        },
        rememberLastUsedCamera: true,
        supportedScanTypes: [
          Html5QrcodeScanType.SCAN_TYPE_CAMERA
        ]
      },
      false
    );
    if (scanner) {
      scanner.clear();
      scanner.render(onScanSuccess, onScanFailure);
    }
  }

  async function onScanSuccess(decodedResult: any) {
    scanner.clear();
    const result = extractQRData(decodedResult);
    setDid(result);
  }

  const extractQRData = (decodedResult: any) => {
    return decodedResult;
  };

  function onScanFailure(error: any) {
    console.warn(`Code scan error = ${error}`);
  }

  return (
    <div className="card lg:card-side">
      <div>
        <div id="reader" className="w-auto my-4 rounded-lg"></div>
        {(!Did || Did === "") && (
          <>
            <button
              className="btn-primary"
              onClick={startCamera}>
              <FontAwesomeIcon icon={faQrcode} />   Scan Qr code
            </button>
          </>
        )}
      </div>
      {(Did && Did !== "") &&
                <>
                  <button
                    className="btn-primary"
                    onClick={startCamera}>
                    <FontAwesomeIcon icon={faQrcode} /> Scan Again
                  </button>
                </>
      }
      <br />

    </div>
  );
}

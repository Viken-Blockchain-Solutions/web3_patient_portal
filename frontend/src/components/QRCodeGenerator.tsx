import React from "react";
import { useQRCode } from "next-qrcode";

function QRCodeGenerator(props:{url:string}) {
  const { Canvas } = useQRCode();
  const url: string = props.url;

  return (
    <Canvas
      text={url}
      options={{
        errorCorrectionLevel: "M",
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: "#010599FF",
          light: "#FFBF60FF"
        }
      }}
    />
  );
}

export default QRCodeGenerator;
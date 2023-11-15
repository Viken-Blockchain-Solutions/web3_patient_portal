"use client";
import { useEffect } from "react";
import { useQRCode } from "next-qrcode";

export const QRCodeGenerator = ({ url, setQrCodeGenerated }: any) => {
  const { Canvas } = useQRCode();

  useEffect(() => {
    setQrCodeGenerated(true);
  });

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
};
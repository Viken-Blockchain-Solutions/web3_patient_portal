import { useQRCode } from "next-qrcode";

export const QRCodeGenerator = ({ url }: any) => {
  const { Canvas } = useQRCode();
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
import { useQRCode } from "next-qrcode";

export const QRCodeGenerator = ({ url }: any) => {
  const { Canvas } = useQRCode();

  return (
    <div className="mt-6 mb-5 w-fit rounded-lg overflow-hidden shadow-lg">
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
    </div>
  );
};
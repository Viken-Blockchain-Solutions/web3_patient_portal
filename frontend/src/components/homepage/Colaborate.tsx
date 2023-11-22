import Image from "next/image";
import Colab from "../../public/assets/images/colaborate.svg";

export default function Colaborate() {

  return (
    <div className="p-5">
      <div className="text-center my-5 m-auto">
        <h1 className="text-4xl mb-3">
                    Lets contribute together!
        </h1>
        <hr className="divider" />
      </div>
      <Image className="stepImg mx-auto" src={Colab} height={60} width={60} sizes="100%" alt={"colaborate"} priority />
    </div>
  );
}
import Image from "next/image";
import HomeImg from "../../public/assets/images/phone.png";

export default function BasicExplanation() {
  return (
    <>
      <div className="text-center my-5 m-auto">
        <h1 className="text-4xl mb-3">Contribute & Earn Rewards</h1>
        <hr className="divider" />
        <p className="mt-4" >
                    We believe decentralized digital identity (DID) can transform healthcare.
          <br />
                    Users can contribute to medical research by sharing lab results and earning rewards.
        </p>

      </div>

      <div className={"lg:flex sm:block place-items-center justify-center	"}>


        <section className='lg:w-1/2 w-full items-center'>
          <h3 className="text-4xl leading-tight">
                        What is a
            <br />
                        Dencentralized Digital Identity <small className="text-2xl text-main italic">(DID)</small>
          </h3>
          <div className="mt-5">
            <p className="bg-slate-100 rounded-lg p-3 w-fit">
                            Decentralized identity is like having a digital ID card but with a cool twist.
              <br />It´s called self-sovereign identity because you´re in charge.
              <br />Instead of a big organization holding your ID, you own and control it yourself.
            </p>
          </div>
        </section>

        <section className='lg:w-1/2 w-full'>
          <Image className="headerImg" src={HomeImg} height={60} width={60} sizes="100%" alt={"organization"} priority />
        </section>
      </div>
    </>
  );
}

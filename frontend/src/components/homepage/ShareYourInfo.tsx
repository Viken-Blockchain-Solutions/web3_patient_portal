import Image from "next/image";
import Papers from "../../public/assets/images/papers.png";
import Key from "../../public/assets/images/key.png";
import Locker from "../../public/assets/images/locker.png";

export default function ShareYourInfo() {

  return (
    <>
      <div className="ta-c mt-20 mb-10 pt-10">
        <h1 className="text-4xl mb-4">Share your information safely</h1>
        <p className="text-main font-bold ">
          Verification with Zero-Knowledge Proofs
        </p>        
      </div>
      <hr className="divider" />
      <div className={"lg:flex sm:block place-items-center justify-center mt-5"}>

        <section className='lg:w-1/3'>
          <div className="light-card">
            <Image src={Key} height={60} width={60} sizes="100%" alt={"key"} priority />
            <p className="font-normal">
              <span className="font-medium">Control your private data</span>
              <br />
              Manage your own private data and choose what to share.
            </p>
          </div>
        </section>

        <section className='lg:w-1/3'>
          <div className="light-card bg-purple-dark">
            <div>
              <Image src={Locker} height={60} width={60} sizes="100%" alt={"Locker"} priority />
              <p className="text-white font-normal">
                <span className="font-medium">Zero-Knowledge Proofs</span>
                <br />
                You can prove information about yourself without revealing the
                data, supporting the proof.
              </p>
            </div>
          </div>

        </section>

        <section className='lg:w-1/3 '>
          <div className="light-card">
            <Image src={Papers} height={60} width={60} sizes="100%" alt={"Locker"} priority />
            <p className="font-normal">
              <span className="font-medium">Contribute</span>
              <br />
              You can easy colaborate by sharing a proof of identity.
              Get rewards providing only the required data.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
"use client";
import Image from "next/image";
import HomeImg from "../../public/assets/images/phone.png";
import Papers from "../../public/assets/images/papers.png";
import Key from "../../public/assets/images/key.png";
import Locker from "../../public/assets/images/locker.png";

export default function About() {

  return (
    <div>
      <div className="text-center my-5 m-auto">
        <h1 className="text-3xl mb-3">Contribute & Earn Rewards</h1>
        <hr className="divider" />
        <p className="mt-4" >
                    We believe decentralized digital identity (DID) has the power to transform healthcare.
          <br />
                    Users can contribute to medical research by sharing lab results and earn rewards.
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
            <p >
                            Decentralized identity is like having a digital ID card, but with a cool twist.
              <br />It's called self-sovereign identity because you're in charge.
              <br />Instead of a big organization holding your ID, you own and control it yourself.
            </p>
          </div>
        </section>

        <section className='lg:w-1/2 w-full'>
          <Image className="headerImg" src={HomeImg} height={60} width={60} sizes="100%" alt={"organization"} />
        </section>
      </div>

      <div className="ta-c mt-10 mb-10">
        <h1 className="text-3xl mb-3 ">Share your information safely</h1>
        <p className="text-main font-bold">
                    Verification with Zero-Knowledge Proofs
        </p>
        <hr className="divider" />
      </div>

      <div className={"lg:flex sm:block place-items-center justify-center mt-5"}>

        <section className='lg:w-1/3'>
          <div className="light-card">
            <Image src={Key} height={60} width={60} sizes="100%" alt={"key"} />
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
              <Image src={Locker} height={60} width={60} sizes="100%" alt={"Locker"} />
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
            <Image src={Papers} height={60} width={60} sizes="100%" alt={"Locker"} />
            <p className="font-normal">
              <span className="font-medium">Contribute</span>
              <br />
                            You can easy colaborate by sharing a proof of identity.
                            Get rewards providing only the required data.
            </p>
          </div>
        </section>

      </div>

      <div className="text-center my-5 mt-10 m-auto">
        <h1 className="text-3xl mb-3">Start Collaborating Today</h1>
        <hr className="divider" />

        <p>
                    Contribute with Medical institutes, organizations, researches and more by providing your
          <br />
                    Lab results as <span className="text-main">verifyable crendetials (VC)</span>
        </p>
      </div>
    </div>
  );
}



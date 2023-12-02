import Image from "next/image";
import Dock from "../../public/assets/images/dock.webp";
import StepOne from "../../public/assets/images/register.png";
import StepTwo from "../../public/assets/images/doctor.svg";
import StepThree from "../../public/assets/images/screens.png";
import GoogleApp from "../../public/assets/images/googleapp.png";
import AppleApp from "../../public/assets/images/appleapp.png";
import Potion from "../../public/assets/images/potion.png";
import Reward from "../../public/assets/images/reward.png";
import Link from "next/link";


export default function Steps() {

  return (
    <>
      <div className="mt-10 ta-c mb-20 text-main">
        <h1 className="text-3xl" id="steps">
          3 simple steps</h1>
      </div>


      <div className={"mt-10 mb-20 pt-10 pb-10  lg:flex sm:block place-items-center justify-center	ta-c"}>
        <section className='lg:w-1/2 w-full items-center'>
          <h3 className="text-3xl font-bold">
            1° Download & Register
          </h3>
          <hr className="divider" />
          <Image className="my-5" src={Dock} height={150} width={150} sizes="100%" alt={"dock"} />
          <p className="text-lg">

            <span className="font-bold mr-2 text-gray-500">Download Dock Wallet App</span>
          </p>
          <div className="inline-flex">
            <div className="w-1/2">
              <Link className="text-main underline italic" href="https://play.google.com/store/apps/details?id=com.dockapp&hl=en_US" target="_black">
                <Image className="stepImg" src={GoogleApp} height={60} width={60} sizes="%" alt={"step1"} />
              </Link>
            </div>

            <div className="w-1/2">
              <Link className="text-main underline italic" href="https://apps.apple.com/us/app/dock-wallet/id1565227368" target="_black">
                <Image className="stepImg" src={AppleApp} height={60} width={60} sizes="100%" alt={"step1"} />
              </Link>
            </div>
          </div>
          <div className="p-4 bg-slate-100 rounded-lg max-w-sm">
            <p >
              This is the first step to get your Identity (DID)
              <br />
              Once your App is installed, you can request a Lab test as a Verifiable Credential (VC).
              <br />
              Scanning a QR code to add this credential to your phone app.
            </p>
          </div>
          <hr className="divider" />
        </section>

        <section className='lg:w-1/2 w-full'>
          <Image className="stepImg" src={StepOne} height={60} width={60} sizes="100%" alt={"step1"} />
        </section>
      </div>

      <div className={"mt-10 pt-10 mb-20 pb-10 lg:flex sm:block place-items-center justify-center	ta-c"}>
        <section className='lg:w-1/2 w-full items-center'>
          <h3 className="text-3xl font-bold">
            2° Request a Lab Result VC
          </h3>
          <Image className="mt-6 swing" src={Potion} height={120} width={120} sizes="100%" alt={"Potion"} />
          <div className="mt-5 p-4 bg-slate-100 rounded-lg max-w-xs">
            <p >
              We provide a Laboratory page for you to request a Lab test result verifiable credential
              <br />
              You will use this credential to contribute to the Research Pool by just scanning a QR code
            </p>
          </div>
          <hr className="divider" />
        </section>

        <section className='lg:w-1/2 w-full'>
          <Image className="stepImg" src={StepTwo} height={60} width={60} sizes="100%" alt={"step1"} />
        </section>
      </div>

      <div className={"mt-10 pt-10 pb-10  lg:flex sm:block place-items-center justify-center	ta-c"}>

        <section className='lg:w-1/2 w-full'>
          <Image className="stepImg" src={StepThree} height={60} width={60} sizes="100%" alt={"step3"} />
        </section>

        <section className='lg:w-1/2 w-full items-center'>
          <h3 className="text-3xl font-bold">
            3° Contribute to Research Pools
          </h3>

          <Image className="mt-4" src={Reward} height={200} width={200} sizes="100%" alt={"Reward"} />
          <span className="text-lg text-main font-bold italic">Get rewards!</span>

          <div className="mt-5 p-4 bg-slate-100 rounded-lg max-w-xs">
            <p >
              Use your Lab test verifiable credentials you get from the Lab page
              <br />
              and start getting rewards for providing this data to research Pools.
            </p>
          </div>
          <hr className="divider" />
        </section>

      </div>
    </>
  );
}

import Image from "next/image";
import Dock from "../../public/assets/images/dock.webp"
import StepOne from "../../public/assets/images/register.png"
import StepTwo from "../../public/assets/images/doctor.svg"
import StepThree from "../../public/assets/images/screens.png"
import Potion from "../../public/assets/images/potion.png"
import Reward from "../../public/assets/images/reward.png"
import Link from "next/link";


export default function Steps() {

    return (
        <>
            <div className="mt-10 ta-c text-main">
                <h1 className="text-2xl" id="steps">
                    3 simple steps</h1>
            </div>

            <div className={'mt-10 pt-10  lg:flex sm:block place-items-center justify-center	ta-c'}>
                <section className='lg:w-1/2 w-full items-center'>
                    <h3 className="text-3xl leading-tight">
                        1° Download & Register
                    </h3>
                    <hr className="divider" />
                    <Image className="my-5" src={Dock} height={60} width={60} sizes="100%" alt={'dock'} />
                    <p className="text-lg">

                        <span className="font-bold mr-2">Download Dock Wallet App</span>

                        <br /><Link className="text-main underline italic" href="https://play.google.com/store/apps/details?id=com.dockapp&hl=en_US" target="_black">Play Store for Android</Link>
                        <br />or
                        <br /> <Link className="text-main underline italic" href="https://apps.apple.com/us/app/dock-wallet/id1565227368" target="_black">App Store for Iphone</Link>
                    </p>
                    <div className="mt-5 p-4 bg-slate-100 rounded-lg max-w-sm">
                        <p >
                            This is the first step to get your Idendity (DID)
                            <br />
                            Once your App installed, you can start requesting Lab test as a Verifiable crendential (VC).
                            <br />
                            Scanning a QR code to add this crendential into your phone app.
                        </p>
                    </div>
                    <hr className="divider" />
                </section>

                <section className='lg:w-1/2 w-full'>
                    <Image className="stepImg" src={StepOne} height={60} width={60} sizes="100%" alt={'step1'} />
                </section>
            </div>

            <div className={'mt-10  lg:flex sm:block place-items-center justify-center	ta-c'}>
                <section className='lg:w-1/2 w-full items-center'>
                    <h3 className="text-3xl leading-tight">
                        2° Request a Lab Result VC
                    </h3>
                    <Image className="mt-6 swing" src={Potion} height={80} width={80} sizes="100%" alt={'Potion'} />
                    <div className="mt-5 p-4 bg-slate-100 rounded-lg max-w-xs">
                        <p >
                            We provide a Laboratory page for you to request a Lab test result verifyable crendetial
                            <br />
                            You will use this crendential for contrubuting to Research Pool by just scanning a QR code
                        </p>
                    </div>
                    <hr className="divider" />
                </section>

                <section className='lg:w-1/2 w-full'>
                    <Image className="stepImg" src={StepTwo} height={60} width={60} sizes="100%" alt={'step1'} />
                </section>
            </div>

            <div className={'mt-10 pt-10  lg:flex sm:block place-items-center justify-center	ta-c'}>

                <section className='lg:w-1/2 w-full'>
                    <Image className="stepImg" src={StepThree} height={60} width={60} sizes="100%" alt={'step3'} />
                </section>

                <section className='lg:w-1/2 w-full items-center'>
                    <h3 className="text-3xl leading-tight">
                        3° Contribute to Research Pools
                    </h3>

                    <Image className="mt-4" src={Reward} height={100} width={100} sizes="100%" alt={'Reward'} />
                    <span className="text-lg text-main">Get rewards</span>

                    <div className="mt-5 p-4 bg-slate-100 rounded-lg max-w-xs">
                        <p >
                            Use your Lab test verifyable credentials you get from the Lab page
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
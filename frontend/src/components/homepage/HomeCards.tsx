'use-client'
import Link from "next/link";
import Image from "next/image";
import Book from "../../public/assets/images/book.png"
import Potion from "../../public/assets/images/potion.png"
import PatiensLogo from "../../public/assets/images/patiens.png"

export default function HomeCards() {
    return (
        <div className={'lg:flex sm:block gap-6'}>
            <section className='m-auto lg:w-1/2 w-full bg-indigo-100 p-8 my-5 m-w-90 rounded-lg shadow-lg sm:mb-5 sm:mx-auto'>
                <h1 className='text-2xl mb-4 font-extrabold font-medium text-indigo-600 flex items-center'>
                    <Image src={Book} height={50} width={50} alt={'book'} />
                    Research Pools
                </h1>
                <h2 className='text-md mb-3 font-extrabold font-medium text-indigo-500' >Contribute by verifiedying your digital credential</h2>
                <p className='text-md mb-3'>
                    This credential represents your lab results and is a key to participating in medical research pools and earn rewards.
                </p>
                <p className='text-md mb-3'>
                    With your credential, you can securely contribute to research initiatives and be part of groundbreaking medical discoveries. Your participation is encrypted, ensuring your privacy while allowing you to contribute to the advancement of medicine.
                </p>
                <Link href='/pools' className='inline-block mt-4 p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500'>
                    CONTRUBITE USING VC
                </Link>
            </section>

            <section className='m-auto lg:w-1/2 w-full bg-green-100 p-8 my-5 m-w-90 rounded-lg shadow-lg sm:mx-auto place-items-center'>
                <h1 className='text-2xl mb-4 font-extrabold font-medium text-green-800 flex items-center place-items-center'>
                    <Image className=" swing" src={Potion} height={60} width={60} sizes="100%" alt={'Potion'} />
                    Laboratory</h1>
                <h2 className='text-md mb-3 font-extrabold text-green-500'>For Patients</h2>
                <p className='text-md mb-3'>
                    Are you interested in contributing to medical research and earning from it? Explore our available research pools, contribute your Verifiable Credentials, and earn a share from the research funds.
                </p>
                <p className='text-md mb-3'>
                    Your data is encrypted and secure, and you have full control over who can access it. Contribute to the future of medicine while earning from it.
                </p>
                <Link href='/issuer' className='inline-block mt-4 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700'>
                    REQUEST VC
                </Link>
            </section>

        </div>
    );
};


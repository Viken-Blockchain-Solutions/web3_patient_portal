
import Link from "next/link";
import Image from "next/image";
import Book from "../../public/assets/images/book.png";
import LaboratoryCard from "./LaboratoryCard";


export default function HomeCards() {
  return (
    <div className="lg:flex sm:block gap-6">
      <div>
        <LaboratoryCard />
      </div>
      <section className='m-auto lg:w-9/12 w-full bg-indigo-100 p-8 my-5 m-w-90 rounded-lg shadow-lg sm:mb-5 sm:mx-auto'>
        <h1 className='text-2xl mb-4 font-semibold text-indigo-600 flex items-center'>
          <Image src={Book} height={50} width={50} alt={"book"} priority />
          Research Pools
        </h1>
        <h2 className='text-md mb-3 font-semibold text-indigo-500' >Contribute by Verifying Your Digital Credential</h2>
        <p className='text-md mb-3'>
          This credential represents your lab results and is a key to participating in medical research pools and earn rewards.
        </p>
        <p className='text-md mb-3'>
          With your credential, you can securely contribute to research initiatives and be part of groundbreaking medical discoveries.
        </p>
        <p>
          Your participation is encrypted, ensuring your privacy while allowing you to contribute to the advancement of medicine.
        </p>
        <Link href='/pools' className='inline-block mt-4 p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500'>
          CONTRUBITE USING VC
        </Link>
      </section>
    </div>
  );
}


"use client";
import Image from "next/image";
import HomeImg from "../../public/assets/images/world.png";
import Link from "next/link";

export default function Header() {

  return (
    <div className={"header lg:flex sm:block"}>
      <section className='lg:w-1/2 w-full'>
        <h1 className='text-6xl text-left font-semibold'>
            Welcome to
          <br />
            the Medical <br />
            Research Hub
        </h1>
        <h2 className="mb-4 mt-4">
          <span className="text-main">Your Gateway to Health Innovation!</span>
        </h2>
        <Link href="#steps">
          <button className="btn-primary text-xl font-semibold italic">
            How it´s work ?
          </button>
        </Link>

      </section>

      <section className='lg:w-1/2 w-full'>
        <Image className="headerImg" src={HomeImg} height={60} width={60} sizes="100%" alt={"organization"} priority />
      </section>

    </div>

  );
}

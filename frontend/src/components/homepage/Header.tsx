"use client";
import Image from "next/image";
import HomeImg from "../../public/assets/images/world.png";

export default function Header() {

  const handleClick = () => {
    const targetElement = document.getElementById("steps");

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth"
      });
    }
  };

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

        <button
          onClick={handleClick}
          className="btn-primary text-3xl font-semibold italic">
          How it´s work ?
        </button>

      </section>

      <section className='lg:w-1/2 w-full'>
        <Image className="headerImg" src={HomeImg} height={60} width={60} sizes="100%" alt={"organization"} priority />
      </section>

    </div>

  );
}

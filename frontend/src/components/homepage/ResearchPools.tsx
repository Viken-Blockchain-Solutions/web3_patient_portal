import Image from "next/image";
import Book from "../../public/assets/images/book.png";

export default function ResearchPools() {

  return (
    <div className="pb-10">
      <div className="text-center my-10 pt-10 mt-10 m-auto">
        <h1 className="text-3xl mb-3">
          Research Pools
        </h1>
        <hr className="divider" />

        <p>
          With your credential, you can securely contribute to research initiatives
          <br />
          and be part of groundbreaking medical discoveries.
          <br />
          Your participation is encrypted, ensuring your privacy while allowing you to contribute to advancing medicine.
        </p>
      </div>

      <div className={"mt-10  lg:flex sm:block place-items-center justify-center"}>

        <section className='lg:w-1/3'>
          <div className="pool-card bg-slate-100">
            <p className="font-medium  inline-flex place-items-center">
              <Image src={Book} height={40} width={40} sizes="100%" alt={"key"} />
              Cholesterol Level Study
            </p>
          </div>
        </section>

        <section className='lg:w-1/3'>
          <div className="pool-card bg-slate-100">
            <div>
              <p className="text-black font-medium inline-flex place-items-center">
                <Image src={Book} height={40} width={40} sizes="100%" alt={"Locker"} />
                Diabetes Monitoring
              </p>
            </div>
          </div>

        </section>

        <section className='lg:w-1/3 '>
          <div className="pool-card bg-slate-100">
            <p className="font-medium  inline-flex place-items-center">
              <Image src={Book} height={40} width={40} sizes="100%" alt={"Locker"} />
              Blood Test Research
            </p>
          </div>
        </section>

      </div>

    </div>
  );
}

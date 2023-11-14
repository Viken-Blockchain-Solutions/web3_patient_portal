import Link from "next/link";
import Dock from "../../public/assets/images/dock.webp"
import Image from "next/image";

const Page: React.FC = () => {
    return (
        <div className="pb-10 bg-slate-100 rounded-lg p-5">
            <div className="text-center my-10 pt-10 mt-10 m-auto">

                <h1 className="text-3xl mb-3">
                    Access using your DID
                </h1>
                <hr className="divider" />                
                <p>
                    Use your DID from your Dock Wallet mobile app to access Research Pools.
                    <br />
                    Your participation is encrypted, ensuring your privacy while allowing you to contribute to the advancement of medicine.
                </p>

                <div className="mt-10">
                    <input placeholder="input your DID" className="accessIput" />
                </div>


                <Link href="/dashboard">
                    <button className=" mt-5 btn-primary text-2xl w-full font-semibold">
                        Access
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Page;

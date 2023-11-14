import Link from "next/link";

export const Menu = () => {
  return (
    <div className="flex flex-row justify-center gap-6">
      <Link href="/home" className="text-blue-500">
      Home
      </Link>
      <Link href="/laboratory" className="text-blue-500">
      Laboratory
      </Link>
      <Link href="/medicalhub" className="text-blue-500">
      Medical Hub
      </Link>
    </div>
  );
};
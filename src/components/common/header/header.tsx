import Link from "next/link";
import { FcMenu } from "react-icons/fc";

export default function Header() {
  return (
    <header className="h-[60px] flex border-b">
      <div className="max-w-[300px] w-full h-full border-r flex items-center justify-center">
        <Link href={'/'} className="text-2xl font-bold">Check payment</Link>
      </div>
      <div className="flex-1 flex items-center px-2">
        <button className="text-2xl">
          <FcMenu />
        </button>
        <div></div>
      </div>
    </header>
  );
}

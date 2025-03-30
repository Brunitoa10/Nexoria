import "@/styles/globals.css";
import Image from "next/image";
import Link from "next/link";
import DesktopMenu from "./Desktop/DesktopMenu";
import MobileMenu from "./Mobile/MobileMenu";

export default function Navbar() {
  return (
    <nav className="p-4 transparent flex justify-between items-center">
      <Link href="/">
        <Image
          src="https://7abby72f43.ufs.sh/f/r7k0vuzPmhf9N0yVrIeUaBZkmRvAHVL0juKwe321rnofypqI"
          alt="Mi Portafolio"
          width={140}
          height={80}
          className="cursor-pointer block"
        />
      </Link>
      <DesktopMenu/>
      <MobileMenu/>
    </nav>
  );
}
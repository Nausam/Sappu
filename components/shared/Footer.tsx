import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className=" dark:bg-lighteBlue_1 bg-primary-50">
      <div className="flex-center wrapper flex-between flex flex-wrap gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image
            src="/assets/images/sappu_logo.png"
            width={100}
            height={100}
            alt="sappu logo with no text"
          />
        </Link>

        <div>
          <h5 className="mb-3 h5">REGISTER</h5>
          <div className="flex flex-col ">
            <Link href="/" className="hover:underline">
              PUBG Mobile
            </Link>
            <Link href="/" className="hover:underline">
              Mobile Legends
            </Link>
            <Link href="/" className="hover:underline">
              Brawl Stars
            </Link>
            <Link href="/" className="hover:underline">
              Thakuru Wars
            </Link>
            <Link href="/" className="hover:underline">
              Chess Mobile
            </Link>
          </div>
        </div>

        <div>
          <h5 className="mb-3 h5">COMMUNITY</h5>
          <div className="flex flex-col ">
            <Link href="/" className="hover:underline">
              Discord
            </Link>
            <Link href="/" className="hover:underline">
              Facebook
            </Link>
            <Link href="/" className="hover:underline">
              Twitter
            </Link>
            <Link href="/" className="hover:underline">
              Instagram
            </Link>
            <Link href="/" className="hover:underline">
              Leaderboard
            </Link>
          </div>
        </div>

        <div>
          <h5 className="mb-3 h5">CONTACT</h5>
          <div className="flex flex-col ">
            <p>Adress</p>
            <p>+960 Phone</p>
            <p>Raa Atoll</p>
            <p>Innamaadhoo</p>
            <p>Maldives</p>
          </div>
        </div>
      </div>
      <Separator />
      <div className="wrapper">
        <p className="dark:text-white font-medium">
          Copyright © QuantumQube Pvt Ltd 2024. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

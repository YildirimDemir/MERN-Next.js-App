import Image from "next/image";
import Link from "next/link";
import Style from "./footer.module.css";

export default function Footer() {
    return (
        <div className={Style.footer}>
            <div className={`${Style["footer__logo"]}`}>
                <Image src="/img/logo-green.png" width={150} height={250} alt="Natours-logo" />
            </div>
            <ul className={`${Style["footer__nav"]}`}>
                <li>
                    <Link href="*">About us</Link>
                </li>
                <li>
                    <Link href="*">Dowload apps</Link>
                </li>
                <li>
                    <Link href="*">Become a guide</Link>
                </li>
                <li>
                    <Link href="*">Careers</Link>
                </li>
                <li>
                    <Link href="*">Contact</Link>
                </li>
            </ul>
            <p className={`${Style["footer__copyright"]}`}>
                2024 &copy; by Infinitix Software. All rights reserved.
            </p>
        </div>
    )
}

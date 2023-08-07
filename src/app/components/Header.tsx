import Betterflix from "../assets/Betterflix.svg"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
    return(
        <header className="header">
            <Link href={""}><Image src={Betterflix} alt="Netflix Logo" width={50} height={20}></Image></Link>
            <Link href={""}><button>Sign in</button></Link>
        </header>
    )
}
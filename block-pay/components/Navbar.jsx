
import Link from "next/link";
import Image from "next/image";
import Button from "@/app/Button";
import { navLinks } from "@/constants/index";
import { logo } from "@/public/assets/images";


const Navbar = () => {
    return (
    <nav className='w-[1289px] h-[50px] flex pt-[40px] justify-between items-center '>
        <Link href="/">
                <Image src={logo} alt="logo" className="w-[10rem] h-[5rem]" />
        </Link>
        
        <ul className='list-none text-[20px] sm:flex hidden justify-end'>
            {navLinks.map((nav) => (
                <li key={nav.id} className="nav-text m-[60px] justify-end bg-hover">
                    <Link href={`/${nav.id}`}>
                        {nav.title}
                    </Link>
                </li>
            ))}
        </ul>

        <Button/>
    </nav>
    )
}

export default Navbar;
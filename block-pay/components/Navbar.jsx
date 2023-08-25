
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import { navLinks } from "@/constants/index";
import { logo } from "@/public/assets/images";


const Navbar = () => {
    return (
    <nav className='w-[1289px] h-[50px] px-24 flex pt-[8px] justify-between items-center '>
        <Link href="./">
            <Image src={logo} alt="logo" className="w-[10rem] h-[5rem]" />
        </Link>
        
        <ul className='list-none text-[20px] sm:flex hidden justify-end'>
            {navLinks.map((nav) => (
                <li key={nav.id} className="nav-text m-[60px] justify-end bg-hover">
                    <a href={`/${nav.id}`}>
                        {nav.title}
                    </a>
                </li>
            ))}
        </ul>

        <Button/>
    </nav>
    )
}

export default Navbar;
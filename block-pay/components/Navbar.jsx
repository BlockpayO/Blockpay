import { Button } from "@/components/Button";
import { navLinks } from "@/constants/index";

const Navbar = () => {
    return (
    <nav className='w-full mt-3 mb-3 flex py-1 justify-between items-center'>
        <a href="/">
            <img src="" alt="" />
        </a>

        <ul className='list-none text-[20px] sm:flex hidden justify-between items-center flex-1'>
            {navLinks.map((nav) => (
                <li key={nav.id} className="text-color bg-hover">
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

export default Navbar
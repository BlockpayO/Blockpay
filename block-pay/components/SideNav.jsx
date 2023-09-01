import { dashboards } from "@/constants";
import { logo, transactIcon, settingsIcon, logOut, payments, homeIcon } from "@/public/assets/images";
import Image from "next/image";
import Link from "next/link";

const SideNav = () => {
    return (
        <div className="flex flex-col bg-[#f7f7f7] sticky">
            <div className="flex justify-center my-7">
                <Image src={logo} className="w-[10rem] h-[5rem] cursor-pointer" alt="Logo" />
            </div>
            <div className="flex">
                <ul className=" flex flex-col space-y-5">
                    {dashboards.map((dashboard) => (
                        <Link key={dashboard.id} href={`/${dashboard.id}`} className="flex py-3 px-11 hover:bg-[#1856F3] hover:text-white cursor-pointer">
                            <div className="w-6 h-6 mr-2 ">
                                {dashboard.icon === transactIcon && (
                                    <Image src={transactIcon} alt="Transaction Icon" />
                                )}
                                {dashboard.icon === settingsIcon && (
                                    <Image src={settingsIcon} alt="Settings Icon" />
                                )}
                                {dashboard.icon === logOut && (
                                    <Image src={logOut} alt="Log Out Icon" />
                                )}
                                {dashboard.icon === homeIcon && (
                                    <Image src={homeIcon} alt="Home Icon"/>
                                )}
                                {dashboard.icon === payments && (
                                    <Image src={payments} alt="Payments Icon" className=""/>
                                )}
                                {/* ... repeat for other icons */}
                            </div>
                            <div>{dashboard.title}</div>
                        </Link>
                    ))}
                </ul>
            </div>

            {/**----======= MAKE THE USERNAME AND USER ID APPEAR AFTER CONNECTING WALLET =======---- */}
            <div className="grid justify-center px=11 py-3 mt-12">
                <h1 className="text-color font-medium text-xl">
                    @Username
                </h1>
                <p className="text-sm">
                    ID: 1234567
                </p>
            </div>
        </div>
    );
}

export default SideNav;
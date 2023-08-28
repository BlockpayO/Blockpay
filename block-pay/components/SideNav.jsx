

import { dashboards } from "@/constants"
import { logo, transactIcon, settingsIcon, viewBalance, logOut, payments } from "@/public/assets/images"
import Image from "next/image"

const SideNav = () => {
    return (
        <div className="flex flex-col justify-start">
            <div>
                <Image src={logo} className="w-[9.5rem] h-[4.5rem]"/>
            </div>
            <div>
                <ul className="flex flex-col">
                    {dashboards.map((dashboard) => (
                        <li key={dashboard.id} className="flex flex-row">
                            {dashboard.icon}
                            {dashboard.title}
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    )
}

export default SideNav
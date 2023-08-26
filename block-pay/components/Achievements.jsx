import "@/styles/globals.css"
import Image from "next/image"
import { achievements } from "@/public/assets/images/index"
import { successes } from "@/constants/index"
import Button from "@/app/Button"

const Achievements = () => {
    return (
        <section className="flex flex-col w-[1230px] items-center ml-[105px] mt-[4rem] justify-between px-24">
            <div className="flex flex-row">
                <div className="flex flex-col justify-center">
                    <h1 className="text-head text-color ">
                        Our Success<br />
                        so far
                    </h1>

                    <ul className="flex flex-col mt-6">
                        {successes.map((success) => (
                            <li className="flex flex-row mb-[29px] items-center" key={success.id}>
                                <Image className="w-[31px] h-[6px] mr-3" src={success.icon}/>
                                <p className="font-normal text-lg">{success.desc}</p> 
                            </li>
                        ))}
                    </ul>

                    <Button/>
                </div>
                
                <Image src={achievements} alt="" className="h-[480px] w-[750px]"/>
            </div>
        </section>
    )
}

export default Achievements;
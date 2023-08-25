import "@/styles/globals.css"
import Image from "next/image"
import { achievements } from "@/public/assets/images/index"

const Achievements = () => {
    return (
        <section className="flex flex-col w-[1230px] items-center ml-[75px] mt-[4rem] justify-between">
            <div className="flex flex-row">
                <div className="flex flex-col justify-center">
                    <h1 className="text-head text-color ">
                        Our Success<br />
                        so far
                    </h1>
                </div>
                
                <Image src={achievements} alt="" className="h-[480px] w-[750px]"/>
            </div>
        </section>
    )
}

export default Achievements;
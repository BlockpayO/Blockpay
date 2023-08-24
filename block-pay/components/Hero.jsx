import "@/styles/globals.css"
import Image from "next/image";
import { heroImg } from "@/public/assets/images";


export const Hero = () => {
    return (
        <section className="flex flex-row w-[1156.53] px-24 justify-between items-center">
            <div className="flex flex-row items-center justify-between mt-[35px]">

                <h1 className="text-color text-left sm:text-[47px] text-[47px] font-medium">
                Your Personal<br />
                Subscription<br />
                Manager
                </h1>

                <Image src={heroImg} className="width-[499px] height-[417.53px]" alt="" />
            </div>
        </section>
    )
};

export default Hero;
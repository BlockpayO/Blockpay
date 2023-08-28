import "@/styles/globals.css";
import Image from "next/image";
import { heroImg } from "@/public/assets/images";

const Hero = () => {
    return (
        <section className="flex flex-row w-[1156.53] px-24 justify-between items-center">
            <div className="flex flex-row items-center justify-between mt-[35px]">

                <h1 className="text-color text-left text-head mr-6">
                Your Personal<br />
                Subscription<br />
                Manager
                </h1>

                <Image src={heroImg} className="w-[459px] h-[417.53px] ml-9" alt="hero-img" />
            </div>
        </section>
    )
};

export default Hero;

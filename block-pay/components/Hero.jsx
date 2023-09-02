import "@/styles/globals.css";
import Image from "next/image";
import { heroImg } from "@/public/assets/images";

const Hero = () => {
  return (
    <section className="flex flex-col sm:flex-row w-full px-4 sm:px-24 justify-center items-center">
      <div className="flex flex-col sm:flex-row items-center justify-center w-full mt-6 sm:mt-0">
        <h1 className="text-color text-center sm:text-left text-head px-8">
          Your Personal<br />
          Subscription<br />
          Manager
        </h1>

        <div className="px-8">
        <Image
          src={heroImg}
          className="w-[300px] h-[273px] sm:w-[459px] sm:h-[417.53px] mt-6 sm:mt-0"
          alt="hero-img"
        />
        </div>
      </div>
    </section>
  );
};

export default Hero;

import "@/styles/globals.css";
import Image from "next/image";
import { heroImg } from "@/public/assets/images";

const Hero = () => {
  return (
    <section className="flex flex-col sm:flex-row w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 justify-center items-center">
      <div className="flex flex-col sm:flex-row items-center justify-center mt-6 sm:mt-16 lg:mt-20">
        <div className="text-center sm:text-left sm:mr-8">
          <h1 className="text-color text-head text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
            Your Personal
            <br />
            Subscription
            <br />
            Manager
          </h1>
        </div>
        <div className="mt-6 sm:mt-0 sm:ml-6">
          <Image
            src={heroImg}
            className="w-[300px] h-[272.53px] sm:w-[459px] sm:h-[417.53px]"
            alt="hero-img"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

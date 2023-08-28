import { trusts } from "@/constants/index";
import Image from "next/image";

const TrustedBy = () => {
  return (
    <section className="w-full px-4 md:px-6 lg:px-16 xl:px-20 mt-8 text-center">
      <h2 className="trust text-color text-2xl md:text-3xl font-semibold mb-4">
        Trusted By
      </h2>

      <div className="flex flex-wrap justify-center items-center">
        {trusts.map((trust, index) => (
          <div key={index} className="mx-2 my-2 w-[130px] h-[50px]">
            <Image src={trust.img} alt={trust.alt} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustedBy;

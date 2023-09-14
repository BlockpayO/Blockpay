import Image from "next/image";
import { advantages } from "@/constants";
import Button from "@/components/Button";
import "@/styles/globals.css";

const Cards = () => (
  <div className="flex flex-col sm:flex-row pt-6 mb-8 justify-center items-center">
    {advantages.map((advantage, index) => (
      <div key={index} className="card mx-4 flex flex-col items-center">
        <div className="card-icon mx-auto mb-4">
          <Image src={advantage.img} alt={advantage.id} />
        </div>
        <div className="rounded-[15px] w-full px-4 py-6 bg-[#F7F7F7] text-center shadow-md">
          <h2 className="card-head mb-3">{advantage.id}</h2>
          <p className="card-desc">{advantage.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

const Advantages = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-head text-color text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
            Advantages<br />We Offer
          </h1>
        </div>

        <Cards />
        <div className="text-center mt-6">
          <Button />
        </div>
      </div>
    </section>
  );
};

export default Advantages;

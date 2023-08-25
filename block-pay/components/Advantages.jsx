import "@/styles/globals.css";
import Image from "next/image";
import { advantages } from "@/constants";
import { Button } from "@/components/index";
import "@/styles/globals.css";

const Cards = () => (
    <div className="flex flex-col pt-6 mb-6">
        <div className="flex sm:flex-row">
        {advantages.map((advantage, index) => (
            <div key={index} className="card mx-4 flex-row justify-between">
                <div className="card-icon mx-auto">
                    <Image src={advantage.img} alt={advantage.id}/>
                </div>
                <div className="rounded-[15px] w-auto px-[8px] py-[10px] bg-[#F7F7F7]">
                    <h2 className="card-head mb-3">{advantage.id}</h2>
                    <p className="card-desc">{advantage.desc}</p>
                </div>
            </div>
        ))}
        </div>
    </div>
);

const Advantages = () => {
    return (
    <section className="flex flex-col w-[1156.53] px-24 justify-between items-center mt-12">
        <div className="flex flex-col items-center justify-between">
            <h1 className="text-head text-color">Advantages<br/>
            We Offer</h1>

            <Cards/>
            <Button/>
        </div>
    </section>
    )
}

export default Advantages;
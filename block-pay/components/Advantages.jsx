import "@/styles/globals.css";
import Image from "next/image";
import { advantages } from "@/constants";
import { Button } from "@/components/index";

const Cards = () => (
    <div className="card-container pt-6">
        {advantages.map((advantage, index) => (
            <div key={index} className="card flex flex-row">
                <div className="card-icon mx-auto mb-4">
                    <Image src={advantage.img} alt={advantage.id}/>
                </div>
                <h2 className="card-head mb-3">{advantage.id}</h2>
                <p className="card-desc mb-4">{advantage.desc}</p>
            </div>
        ))}
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
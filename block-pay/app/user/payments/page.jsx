import SideNav from "@/components/SideNav";
import Image from "next/image";
import { paymentCards } from "@/constants";

const PaymentsPage = () => {
    return (
        <main className="flex">
            <SideNav/>
            <div className="flex justify-center items-center">
                <div className="flex flex-col sm:flex-row pt-6 mb-6 justify-center items-center">
                    {paymentCards.map((paymentCard, index) => (
                        <div key={index} className="">
                            <div className="">
                                <Image src={paymentCard.img} alt={paymentCard.id} />
                            </div>
                            <div className="">
                                <h2 className="">{paymentCard.title}</h2>
                                <p className="">{paymentCard.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default PaymentsPage
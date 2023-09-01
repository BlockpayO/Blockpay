import SideNav from "@/components/SideNav";
import Image from "next/image";
import { paymentCards } from "@/constants";
import Link from "next/link";

const PaymentsPage = () => {
    return (
        <main className="flex">
            <SideNav/>
            <div className="flex justify-center items-center p-12">
                    <div className="flex flex-col sm:flex-row justify-between">
                        {paymentCards.map((paymentCard) => (
                            <Link key={paymentCard.id} 
                                href={`/user/payments/${paymentCard.id}`}
                                className="flex flex-col p-5 h-64 w-72 rounded-3xl mx-8 items-center bg-[#f7f7f7] cursor-pointer hover:scale-105">
                                <div className="w-24 h-24 p-4">
                                    <Image src={paymentCard.img} alt={paymentCard.id}/>
                                </div>
                                <div className="flex-col text-center p-2 mb-4">
                                    <h2 className="text-color font-medium text-xl mb-4">{paymentCard.title}</h2>
                                    <p className="font-normal text-sm">{paymentCard.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
            </div>
        </main>
    )
}

export default PaymentsPage
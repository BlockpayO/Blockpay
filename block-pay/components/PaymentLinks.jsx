import "@/styles/globals.css";
import Image from "next/image";
import { cashpayment, paymentID, genpaylink } from "@/public/assets/images/index";

const PaymentLinks = () => {
    return (
        <section className="flex flex-col w-[1230px] px-24 justify-between items-center mt-[4rem]">
            <div className="flex flex-row">
                <div className="flex flex-col my-auto">
                    <h1 className="text-head text-color">Payment Links</h1>
                    <Image className="w-[600px] h-[144.31px]" src={paymentID} alt={"generatepayment link"}/>
                </div>
                <Image className="w-[600px] h-[440px]" src={cashpayment} alt="cash payment"/>
            </div>
            <div className="flex flex-col">
                <Image className="flex-col h-[600px] w-[940px]" src={genpaylink} alt="cash payment"/>
            </div>
        </section>
    )
}

export default PaymentLinks;
import "@/styles/globals.css"
import { trusts } from "@/constants/index"
import Image from "next/image"

const TrustedBy = () => {
    return (
    <section className="flex flex-col w-[1150] px-24 mt-[50px]">
            <h2 className="trust text-color h2 text-left">Trusted By</h2>

        <div className="pt-6 flex flex-row">
            {trusts.map((trust, index) => (
            <div key={index} className="mr-4 w-[185px] h-[70px]">
                    <Image src={trust.img} alt={`${trust.alt}`}/>
            </div>
        ))}
        </div>
        </section>
    )
}

export default TrustedBy;
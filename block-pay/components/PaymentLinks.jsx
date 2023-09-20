import Image from "next/image";
import {
  cashpayment,
  paymentID,
  genpaylink,
  getpayName,
} from "@/public/assets/images/index";

const PaymentLinks = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mt-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex flex-col my-4 sm:my-0">
            <h1 data-aos='fade-left' className="text-head text-color text-2xl md:text-3xl">
              Payment Links
            </h1>
            <Image data-aos='fade-up'
              className="w-full h-auto md:w-[600px] md:h-[144.31px] mt-4"
              src={paymentID}
              alt={"generate payment link"}
            />
          </div>
          <Image  data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500"
            className="w-full h-auto md:w-[600px] md:h-[440px] mt-4 sm:mt-0"
            src={cashpayment}
            alt="cash payment"
          />
        </div>
        <div data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" className="flex flex-col sm:flex-row justify-between items-center mt-8">
          <Image
            className="w-full h-auto md:w-[469px] md:h-[480px] mb-4 sm:mb-0"
            src={getpayName}
            alt="get payment name"
          />
          <Image
            className="w-full h-auto md:w-[450px] md:h-[480px] mt-4 sm:mt-0"
            src={genpaylink}
            alt="generate payment link"
          />
        </div>
      </div>
    </section>
  );
};

export default PaymentLinks;

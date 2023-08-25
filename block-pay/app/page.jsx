import {Navbar, Hero, Advantages, PaymentLinks, Achievements, TrustedBy, Footer} from '@/components/index';
import '@/styles/globals.css';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Navbar/>
      <Hero/>
      <Advantages/>
      <TrustedBy/>
      <PaymentLinks/>
      <Achievements/>
      <Footer/>
    </main>
  )
};

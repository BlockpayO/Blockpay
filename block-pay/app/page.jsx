
import {Navbar, Hero, Advantages, PaymentLinks, Achievements, TrustedBy, Footer} from '@/components/index';
import '@/styles/globals.css';



export default function Home() {
  return (
    <main>
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

import {Navbar, Hero} from '@/components';
import '../styles/globals.css';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between py-5 px-24">
      <Navbar/>
      <Hero/>
    </main>
  )
}

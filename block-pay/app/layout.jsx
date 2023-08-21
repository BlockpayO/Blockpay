import '../styles/globals.css';
import localFont from 'next/font/local';
import Home from './page';

export const metadata = {
  title: 'Blockpay',
  description: 'Your personal subscription manager',
}


const aeonik = localFont({
  src: [
    {
      path: 'fonts//Aeonik-Light.otf',
      weight: '300',
      style: 'light',
    },
    {
      path: '/fonts/Aeonik-Regular.otf',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: 'fonts/Aeonik-Bold.otf',
      weight: '700',
      style: 'bold',
    },
    {
      path: 'fonts//Aeonik-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'fonts/Aeonik-RegularItalic.otf',
      weight: 'normal',
      style: 'italic',
    },
  ],
})


const Layout = () => {
  return (
    <html lang="en" className={aeonik.className}>
      <body>
        <Home />
      </body>
    </html>
  )
}

export default Layout;
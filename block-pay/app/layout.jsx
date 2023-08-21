import '../styles/globals.css';
import localFont from 'next/font/local';
import Home from './page';

export const metadata = {
  title: 'Blockpay',
  description: 'Your personal subscription manager',
}

const Layout = () => {
  return (
    <html lang="en">
      <body>
        <Home />
      </body>
    </html>
  )
}

export default Layout;
    
    /*
    const aeonik = localFont ({
      src: [
        {
          path: './styles/fonts/Aeonik-font-download/Aeonik-Light.otf',
          weight: '300',
          style: 'light'
        },
        {
          path: './styles/fonts/Aeonik-font-download/Aeonik-Regular.otf',
          weight: '400',
          style: 'normal'
        },
        {
          path: './styles/fonts/Aeonik-font-download/Aeonik-Bold.otf',
          weight: '700',
          style: 'bold'
        },
      ]
    })
    */

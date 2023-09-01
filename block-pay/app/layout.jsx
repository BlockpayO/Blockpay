
import '@/styles/globals.css';
import localFont from 'next/font/local';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const metadata = {
  title: 'Blockpay',
  description: 'Your personal subscription manager',
}

const aeonik = localFont({
  src: [
    {
      path: '/fonts/Aeonik-Light.otf',
      weight: '300',
      style: 'light',
    },
    {
      path: '/fonts/Aeonik-Regular.otf',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: '/fonts/Aeonik-Bold.otf',
      weight: '700',
      style: 'bold',
    },
    {
      path: '/fonts/Aeonik-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '/fonts/Aeonik-RegularItalic.otf',
      weight: 'normal',
      style: 'italic',
    },
  ],
})

const Layout = ({ children }) => {
  return (
    <html lang="en" className={`${aeonik.className}`}>
      <title>Blockpay - Your personal subscription manager</title>
      <body>
        <main>
          {children}
        </main>
        <ToastContainer />
      </body>
     
    </html>
 
  )
}

export default Layout;
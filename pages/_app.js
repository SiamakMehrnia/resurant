import "@/styles/globals.css";
import Navbar from '@/components/shared/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

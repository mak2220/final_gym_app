import "@/styles/globals.css";
import "@/styles/normalize.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext"; 

export default function App({ Component, pageProps }: AppProps) {
  return (
      <AuthProvider>
        <Navbar/>
        <Component {...pageProps} />
        <Footer/>
      </AuthProvider>
      )
}

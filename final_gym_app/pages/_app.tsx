import "@/styles/globals.css";
import "@/styles/normalize.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext"; 

export default function App({ Component, pageProps }: AppProps) {
  return (
      <AuthProvider>
        <Head>
          <link rel="icon" href="favicon.ico"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        </Head>
        <Navbar/>
        <Component {...pageProps} />
        <Footer/>
      </AuthProvider>
      )
}

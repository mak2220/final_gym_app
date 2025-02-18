import {useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import client from "@/lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type ConnectionStatus = {
  isConnected: boolean;
};

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await client.connect(); // `await client.connect()` will use the default database passed in the MONGODB_URI
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="bg-[url('/images/bg-home.jpeg')] bg-cover bg-center min-h-screen">
    {isConnected ? (
      <section className="flex flex-col items-center h-screen">
        <h1 className="font-edu text-size-2.5 text-yellow-500 pt-14 lg:text-size-4.5">
          Estas en <br/> Gym App
        </h1>
        <h2 className="font-edu text-size-1.5 text-yellow-500 pt-4 mb-14 lg:text-size-2.5 lg:mb-6">
          Ready to go?
        </h2>
        <p className="text-center text-size-1 text-yellow-500 mb-14 lg:text-size-1.5 lg:pt-2 lg:mb-4">
          Conocenos, ve ejemplos de ejercios, nuestras rutinas y horarios, registra tu progreso
        </p>
        
        <Link href="/registro">
          <h1 className="px-3 py-2 border-2 bg-yellow-500 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-yellow-500 hover:border-yellow-500 transition duration-200 lg:px-6 lg:py-3">
            Ingresa o Regístrate Ahora
          </h1>
        </Link> 
      </section>
    ) : (
        <h2 className="font-edu text-lg text-red-500">
          Tenemos problemas de conexión. En breve los solucionaremos.
        </h2>
    )}
  </main>    
  );
}

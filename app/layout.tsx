import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar/NavBar";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import NextTopLoader from "nextjs-toploader";


const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Nexoria",
  description: "Pagina de novelas",
  icons: {
    icon: "https://7abby72f43.ufs.sh/f/r7k0vuzPmhf9yXmL1sE16HUAL57ORQ2MNv8coatwqIJCTVum",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="es" className={urbanist.variable}>
      <body className="antialiased">
      <NextTopLoader showSpinner={false} color="#00FFFF" />
        <Navbar />
        <main className="container mx-auto px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

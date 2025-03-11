
import { Poppins } from "next/font/google";
import "./globals.css";
import RainbowProvider from "@/providers/RainbowProvider";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner"
import WagmiConfigProvider from "@/providers/WagmiConfigProvider";



export const poppins = Poppins({
  variable: "--font-poppins",

  weight:['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} bg-[#0D1117] antialiased`}
      >
        <WagmiConfigProvider>
        <RainbowProvider>
          
          <Navbar/>
          {children}
          <Toaster/>
            </RainbowProvider>
        </WagmiConfigProvider>
      </body>
    </html>
  );
}

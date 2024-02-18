import { Navbar } from "@/src/components";
import "./globals.css";
import { useEffect } from "react";

export const metadata = {
  title: "Futlovers",
  description: "Cadastre times e jogadores",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div style={{margin: "16px 10%"}}>
          {children}
        </div>
      </body>
    </html>
  );
}

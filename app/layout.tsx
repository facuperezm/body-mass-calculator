import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Body Mass Index Calculator",
  description: "Developed by Facundo Perez Montalvo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-screen">
      <body
        className={`${inter.className} max-w-6xl p-6 mx-auto text-gray-900 bg-gradient-to-r from-white to-teal-200 rounded-ee-3xl`}
      >
        {children}
      </body>
    </html>
  );
}

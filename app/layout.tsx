import "./globals.css";
import GlobalProvider from "./components/global-provider";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store"; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}

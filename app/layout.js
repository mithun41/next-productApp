import Navbar from "./Components/Navbar";
import "./globals.css";
import Providers from "./Components/Providers";

export const metadata = {
  title: "Product App",
  description: "Next.js demo project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        {/* Wrap everything that needs session inside SessionProvider */}
        <div>
          <Providers>
            <Navbar />
            <main>{children}</main>
          </Providers>
          <footer className="py-8 text-sm text-center text-gray-500">
            © 2025 ProductApp
          </footer>
        </div>
      </body>
    </html>
  );
}

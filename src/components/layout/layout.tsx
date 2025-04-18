
import { Header } from "./header";
import { Footer } from "./footer";
import { ReactNode } from "react";
import { GlobalCssManagerProvider } from "../theme/GlobalCssManagerProvider";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <GlobalCssManagerProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </GlobalCssManagerProvider>
  );
}

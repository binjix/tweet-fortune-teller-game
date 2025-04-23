
import { ReactNode } from "react";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1">{children}</main>
      <footer className="py-4 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Bull or Bear Prediction Game 
            <span className="mx-2">•</span> 
            Market data simulated for demo purposes
          </p>
        </div>
      </footer>
    </div>
  );
}

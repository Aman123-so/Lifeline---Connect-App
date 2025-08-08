"use client";

import Link from "next/link";
import { HeartHandshake, Menu, Siren } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import React from "react";

const navLinks = [
  { href: "/", label: "Request Blood" },
  { href: "/organ-donation", label: "Pledge Organs" },
  { href: "/nearby", label: "Nearby" },
  { href: "/profile", label: "Profile" },
];

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <HeartHandshake className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline">
              Lifeline Connect
            </span>
          </Link>
          <nav className="hidden gap-6 text-sm md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === link.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild className="hidden sm:flex">
            <Link href="/#request-form">
              <Siren className="mr-2 h-4 w-4" />
              Emergency
            </Link>
          </Button>
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6" onClick={() => setSheetOpen(false)}>
                    <HeartHandshake className="h-6 w-6 text-primary" />
                    <span className="font-bold sm:inline-block font-headline">
                      Lifeline Connect
                    </span>
                </Link>
                <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setSheetOpen(false)}
                        className={cn(
                          "transition-colors hover:text-foreground/80",
                          pathname === link.href ? "text-foreground" : "text-foreground/60"
                        )}
                    >
                        {link.label}
                    </Link>
                    ))}
                    <Button asChild className="mt-4" onClick={() => setSheetOpen(false)}>
                        <Link href="/#request-form">
                        <Siren className="mr-2 h-4 w-4" />
                        Emergency
                        </Link>
                    </Button>
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

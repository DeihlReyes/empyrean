"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Building2, Menu, Users, UserPlus } from "lucide-react";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  { title: "I am a Property Owner", icon: Building2, href: "/services/property-owner" },
  { title: "I am a Buyer/Tenant/Guest", icon: Users, href: "/services/buyer-tenant-guest" },
];

const partners = [
  { title: "I am a Broker/Agent/Realty Firm", description: "Partner with us to expand your business", icon: UserPlus, href: "/services/broker-agent" },
  { title: "I am a Developer Representative", icon: Building2, href: "/services/developer" },
  { title: "I am a Business/Professional", icon: Building2, href: "/services/business-professional" },
];

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { icon: React.ElementType }
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900",
            className
          )}
          {...props}
        >
          <h2 className="text-sm font-semibold leading-none text-gray-900">{title}</h2>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function Header() {
  const [open, setOpen] = useState(false);

  const closeSheet = () => setOpen(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 h-24 px-6 lg:px-12 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/home" className="relative h-16 w-16">
          <Image
            src="/assets/empyrean-logo.png"
            alt="Empyrean Logo"
            fill
            className="object-contain"
          />
        </Link>
        <Link href="https://empyrean.ph/home" className="no-underline hover:no-underline">
          <h1 className="text-gray-800 text-base sm:text-lg md:text-xl font-bold">
            Empyrean Real Estate Solutions
          </h1>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center">
        <NavigationMenu>
          <NavigationMenuList className="gap-0 space-x-0 text-sm">
            <NavigationMenuItem>
              <Button variant="ghost" className="text-[15px] font-normal text-gray-700 hover:text-gray-900 hover:bg-gray-100" asChild>
                <Link href="/home">Home</Link>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="ghost" className="text-[15px] font-normal text-gray-700 hover:text-gray-900 hover:bg-gray-100" asChild>
                <Link href="/about-us">About Us</Link>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-[15px] font-normal text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white border-none">
                <ul className="grid w-[350px] gap-3 p-4">
                  {services.map((service) => (
                    <ListItem key={service.title} title={service.title} icon={service.icon} href={service.href} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-[15px] font-normal text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                Partners
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white border-none">
                <ul className="grid w-[350px] gap-3 p-4">
                  {partners.map((partner) => (
                    <ListItem key={partner.title} title={partner.title} icon={partner.icon} href={partner.href} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="ghost" className="text-[15px] font-normal text-gray-700 hover:text-gray-900 hover:bg-gray-100" asChild>
                <Link href="/philippinerealestateinventory">Philippine Real Estate Inventory</Link>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="ghost" className="text-[15px] font-normal text-gray-700 hover:text-gray-900 hover:bg-gray-100" asChild>
                <Link href="/contact-us">Contact Us</Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
            <SheetHeader className="p-6 border-b">
              <SheetTitle className="flex items-center justify-between">Menu</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <nav className="flex flex-col">
                <Link href="/home" className="px-6 py-3 text-gray-700 hover:bg-gray-100" onClick={closeSheet}>
                  Home
                </Link>
                <Link href="/about-us" className="px-6 py-3 text-gray-700 hover:bg-gray-100" onClick={closeSheet}>
                  About Us
                </Link>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="services" className="border-none">
                    <AccordionTrigger className="px-6 py-3 text-gray-700 hover:bg-gray-100 hover:no-underline normal-case">
                      Services
                    </AccordionTrigger>
                    <AccordionContent className="bg-gray-50">
                      {services.map((service) => (
                        <Link key={service.title} href={service.href} className="flex items-center gap-2 px-8 py-3 text-gray-700 hover:bg-gray-100" onClick={closeSheet}>
                          <span>{service.title}</span>
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="partners" className="border-none">
                    <AccordionTrigger className="px-6 py-3 text-gray-700 hover:bg-gray-100 hover:no-underline normal-case">
                      Partners
                    </AccordionTrigger>
                    <AccordionContent className="bg-gray-50">
                      {partners.map((partner) => (
                        <Link key={partner.title} href={partner.href} className="flex items-center gap-2 px-8 py-3 text-gray-700 hover:bg-gray-100" onClick={closeSheet}>
                          <span>{partner.title}</span>
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* ✅ Mobile Philippine Real Estate Inventory Link */}
                <Link href="/philippinerealestateinventory" className="px-6 py-3 text-gray-700 hover:bg-gray-100" onClick={closeSheet}>
                  Philippine Real Estate Inventory
                </Link>

                <Link href="/contact-us" className="px-6 py-3 text-gray-700 hover:bg-gray-100" onClick={closeSheet}>
                  Contact Us
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

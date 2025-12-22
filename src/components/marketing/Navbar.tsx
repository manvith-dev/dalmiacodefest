"use client";

import Link from "next/link";
import { ButtonGroup } from "@/components/ui/button-group";

import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { H3 } from "@/components/Typography";

export function Navbar() {
  return (
    <div className="z-30 py-4">
      <NavigationMenu className="text-muted-foreground flex flex-row justify-between min-w-screen px-8 md:px-16">
        <NavigationMenuList>
          <NavigationMenuItem className="flex flex-row items-center gap-4">
            <H3>DCF</H3>
            <NavigationMenuLink
              asChild
              className="hidden sm:flex hover:bg-transparent"
            >
              <Link href="/">Home</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className="hidden sm:flex hover:bg-transparent"
            >
              <Link href="#about">About</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className="hidden sm:flex hover:bg-transparent"
            >
              <Link href="#rules">Rules</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className="hidden sm:flex hover:bg-transparent"
            >
              <Link href="#contact">Contact</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuItem className="flex flex-row items-center gap-4">
          <Link href="/participants/dashboard">
            <Button size="sm" variant="outline">
              Dashboard
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" variant="outline">
              Register
            </Button>
          </Link>
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  );
}

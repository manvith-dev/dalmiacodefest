"use client";

import Link from "next/link";
import { ButtonGroup } from "@/components/ui/button-group";

import { ModeToggle } from "@/components/ui/mode-toggle";

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
      <NavigationMenu className="text-muted-foreground flex flex-row justify-between min-w-screen px-16">
        <NavigationMenuList>
          <NavigationMenuItem className="flex flex-row items-center gap-4">
            <H3>DCF</H3>
            <NavigationMenuLink asChild className="hover:bg-transparent">
              <Link href="/docs">Home</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild className="hover:bg-transparent">
              <Link href="/docs">About</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild className="hover:bg-transparent">
              <Link href="/docs">Need help?</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild className="hover:bg-transparent">
              <Link href="/docs">Contact</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <ButtonGroup>
          <Button size="sm" variant="secondary">
            Log In
          </Button>
          <Button size="sm" variant="secondary">
            Register
          </Button>
        </ButtonGroup>
      </NavigationMenu>
    </div>
  );
}

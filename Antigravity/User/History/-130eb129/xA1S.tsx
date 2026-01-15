"use client";

import { Menu, Search, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/components/providers/AuthProvider";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "Dashboard" }: HeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  return (
    <header className="sticky top-0 z-30 flex h-24 items-center gap-4 bg-gradient-to-b from-[#fffbf5] to-transparent dark:from-slate-900 dark:to-transparent px-8 transition-colors duration-200">
      
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden cursor-pointer clay-button bg-white dark:bg-slate-800 p-2 h-12 w-12 rounded-full shadow-md hover:scale-105 transition-transform">
            <Menu className="h-6 w-6 text-foreground" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 border-none bg-transparent shadow-none">
          <Sidebar isMobile />
        </SheetContent>
      </Sheet>

      {/* Page Title */}
      <h1 className="hidden lg:block text-3xl font-black font-heading tracking-tight text-foreground">{title}</h1>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <Button variant="ghost" size="icon" className="hidden sm:flex h-12 w-12 rounded-full clay-button bg-white dark:bg-slate-800 shadow-md hover:scale-105 transition-transform cursor-pointer">
          <Search className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="sr-only">Search</span>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-full clay-button bg-white dark:bg-slate-800 shadow-md hover:scale-105 transition-transform cursor-pointer">
          <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          {/* Notification dot */}
          <span className="absolute top-3 right-3 w-3 h-3 bg-red-400 rounded-full border-2 border-white dark:border-slate-800" />
          <span className="sr-only">Notifications</span>
        </Button>

        {/* Theme Toggle */}
        <div className="bg-white dark:bg-slate-800 rounded-full shadow-md clay-button p-1">
            <ThemeToggle />
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-12 w-12 rounded-full cursor-pointer p-0 hover:scale-105 transition-transform ring-2 ring-white dark:ring-slate-700 shadow-lg">
              <Avatar className="h-full w-full">
                <AvatarImage src={user?.picture || undefined} alt={user?.name || "User"} />
                <AvatarFallback className="bg-primary text-white text-lg font-bold">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 border-none bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl rounded-[2rem] p-4 mt-2" align="end" forceMount>
            <DropdownMenuLabel className="font-normal mb-2">
              <div className="flex flex-col space-y-1">
                <p className="text-lg font-bold leading-none text-foreground">{user?.name || "Guest User"}</p>
                <p className="text-sm font-medium leading-none text-muted-foreground">
                  {user?.email || "guest@example.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-100 dark:bg-white/10" />
            <DropdownMenuItem className="cursor-pointer rounded-xl py-3 px-4 text-base font-medium hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary transition-colors duration-200">Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-xl py-3 px-4 text-base font-medium hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary transition-colors duration-200">Settings</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-100 dark:bg-white/10" />
            <DropdownMenuItem 
              className="cursor-pointer rounded-xl py-3 px-4 text-base font-medium text-red-500 hover:bg-red-50 focus:bg-red-50 transition-colors"
              onClick={handleLogout}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

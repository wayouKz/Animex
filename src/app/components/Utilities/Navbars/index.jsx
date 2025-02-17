"use client";
import {signOut} from 'next-auth/react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { useState, useEffect } from "react";
import SearchAnime from "../../SearchAnime";
import {  usePathname } from "next/navigation";
export default function Navbars() {
  const [session, setSession] = useState(null);
  const pathname = usePathname();
  useEffect(() => {
    async function fetchSession() {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      setSession(data);
    }
    fetchSession();
  }, []);

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link href="/" className=" font-bold text-inherit">ANIMEX</Link>
        </NavbarBrand>
        {session?.user ? (
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/details/anime">
              Anime
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/details/manga">
              Manga
            </Link>
          </NavbarItem>
        </NavbarContent>
        ): null}
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        {session?.user ? (
          <>
            <SearchAnime />
            <Dropdown placement="bottom-end" className="bg-[#FFB22C]" >
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={session.user.name}
                  size="sm"
                  // src={session.user.image || "https://i.pravatar.cc/150"}
                  src={session.user.image || "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"}
                />
              </DropdownTrigger>
              <DropdownMenu  variant="solid">
                <DropdownItem key="profile" className="h-14 gap-2 ">
                  <p className="font-semibold text-[#000]">Signed in as</p>
                  <p className="font-semibold text-[#000]">{session.user.name}</p>
                </DropdownItem>
                <DropdownItem key="settings" color="default" className='bg-[#754E1A]'>My Profile</DropdownItem>
                <DropdownItem key="dashboard" color="warning" href='/dashboard' className='bg-[#754E1A]'>Dashboard</DropdownItem>

                <DropdownItem key="logout" color="danger" className='bg-[#754E1A]' onClick={() => signOut({
                  callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
                })}>Logout
                </DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          pathname !== "/login" && (
            <div className="bg-[#000] rounded px-4  py-3 ">
              <Link href="/api/auth/signin" className="text-sm text-[#fff]">
                Login
              </Link>
            </div>
          )
        )}
      </NavbarContent>
    </Navbar>
  );
}

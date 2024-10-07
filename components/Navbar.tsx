"use client"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input } from "@nextui-org/react";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function Nav() {

    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
          router.push(`/manga?search=${encodeURIComponent(searchQuery)}`);
        }
      };

    return (
        <Navbar isBordered shouldHideOnScroll className="shadow-lg bg-white bg-opacity-5">
            <NavbarContent justify="start">
                <NavbarBrand className="mr-4 flex items-center">
                    <Link href="/" aria-label="Go to home page" color="foreground" className="flex items-center">
                        <Image 
                            src="/Sanji.jpeg"
                            alt="MangaHub Logo"
                            width={60} 
                            height={60}
                            className="mr-2 rounded-lg"
                        />
                        <p className="hidden sm:block font-bold text-white text-lg pl-1" style={{ fontFamily: "'Road Rage', cursive" }}>Pages</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent as="div" className="items-center" justify="end">
        <form onSubmit={handleSearchSubmit}>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small text-gray-700",
              inputWrapper: "h-full font-normal text-default-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<IoMdSearch size={18} className="text-gray-500" />}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </NavbarContent>
        </Navbar>
    );
}

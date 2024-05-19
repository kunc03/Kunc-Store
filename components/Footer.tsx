import Link from 'next/link';
import React from 'react';
import { BiCopyright } from 'react-icons/bi';
import { BsAmd } from 'react-icons/bs';

const Footer = () => {
  return (
    <div className="relative w-full flex flex-col items-start bg-gray-100">
      <div className="relative flex lg:flex-row md:flex-row flex-col gap-10 items-start p-5">
        <Link href="/" className="font-semibold flex gap-3 items-center ">
          <span className="ring-1 ring-gray-300 p-2 rounded-xl">
            <BsAmd size={18} />
          </span>
          KUNC STORE
        </Link>

        <div className="flex flex-col gap-5 items-start text-gray-600 text-[15px] p-[5px]">
          <Link href="/search" className="hover:text-gray-950 hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/search/shirts" className="hover:text-gray-950 hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/search/stickers" className="hover:text-gray-950 hover:underline underline-offset-4">
            Terms & Conditions
          </Link>
          <Link href="/search/stickers" className="hover:text-gray-950 hover:underline underline-offset-4">
            Shipping & Return Policy
          </Link>
          <Link href="/search/stickers" className="hover:text-gray-950 hover:underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link href="/search/stickers" className="hover:text-gray-950 hover:underline underline-offset-4">
            FAQ
          </Link>
        </div>
      </div>
      <div className="p-5 border-t-[1px] border-gray-300 w-full flex lg:flex-row md:flex-row flex-col lg:justify-between md:justify-between justify-center items-center text-gray-500 text-sm gap-1">
        <h2 className="flex gap-1 items-center lg:flex-row md:flex-row flex-col">
          <span className="flex gap-1 items-center">
            <BiCopyright /> 2023-2024 ACME, Inc. All rights reserved.
          </span>{' '}
          | <span>Designed in California</span>
        </h2>

        <Link href="" className="flex items-center gap-2 text-gray-600 font-semibold">
          Recrafted by{' '}
          <span className="text-gray-950">
            <BsAmd size={15} />
          </span>{' '}
          KUNC
        </Link>
      </div>
    </div>
  );
};

export default Footer;

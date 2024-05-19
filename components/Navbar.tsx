import Link from 'next/link';
import { useContext, useState } from 'react';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import { BiSearch } from 'react-icons/bi';
import { TbMenu } from 'react-icons/tb';
import { IoClose } from 'react-icons/io5';
import { CiAlignLeft, CiUser } from 'react-icons/ci';
import { BsAmd } from 'react-icons/bs';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenu, setIsMenu] = useState(false);
  const [isSearch, setSearch] = useState('');
  const router = useRouter();

  const handleMenu = () => {
    setIsMenu(!isMenu);
    console.log(isMenu);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push({
      pathname: '/search/all', // Ganti 'destinationPage' dengan path halaman tujuan Anda
      query: {
        q: e.target.value, // Ganti 'key' dengan nama kunci dan 'value' dengan nilai yang ingin Anda kirim
      },
    });
  };

  // pathname.startsWith(`/search/${category})

  const subMenu = (
    <div className="lg:flex md:flex sm:flex hidden gap-5 items-center text-gray-600 text-sm">
      <Link href="/search/smartphones" className={`hover:text-gray-950 hover:underline underline-offset-4`}>
        Smartphone
      </Link>
      <Link href="/search/laptops" className={`hover:text-gray-950 hover:underline underline-offset-4`}>
        Laptop
      </Link>
      <Link href="/search/fragrances" className={`hover:text-gray-950 hover:underline underline-offset-4`}>
        Fragrance
      </Link>
      <Link href="/search/skincare" className={`hover:text-gray-950 hover:underline underline-offset-4`}>
        Skincare
      </Link>
      <Link href="/search/Groceries" className={`hover:text-gray-950 hover:underline underline-offset-4`}>
        Groceries
      </Link>
    </div>
  );

  const searchInput = (
    <div className="relative w-[40%] lg:flex md:flex sm:flex hidden">
      <input placeholder="Search for products..." className="px-4 py-3 ring-1 ring-gray-300 text-sm rounded-full w-full outline-none focus:shadow-sm focus:shadow-gray-950 " onChange={handleSearch} />
      {/* <BiSearch size={18} className="absolute right-2 top-2" /> */}
    </div>
  );

  return (
    <div className="relative w-full p-5 flex justify-between items-center bg-gray-100">
      <button onClick={handleMenu} className="relative group lg:hidden md:hidden sm:hidden block p-2 rounded-md ring-1 ring-gray-300 cursor-pointer z-20  transition ease-in-out delay-150 duration-300 animete-spin">
        {!isMenu ? <TbMenu size={24} className="group-hover:scale-110" /> : <IoClose size={24} className="group-hover:scale-110" />}
      </button>

      <div className="relative flex gap-5 items-center basis-3/4">
        <Link href="/" className="font-semibold flex gap-3 items-center ">
          <span className="ring-1 ring-gray-300 p-2 rounded-xl">
            <BsAmd size={20} />
          </span>
          KUNC STORE
        </Link>
        {searchInput}
        {subMenu}
      </div>

      <div className="flex justify-end items-center gap-4 basis-1/4">
        <Link href="/login" className="group p-2 rounded-md flex justify-center items-center duration-200 ring-1 ring-gray-300">
          <CiUser size={24} className="group-hover:scale-110 duration-300" />
        </Link>
        <Link href="/cart" className="group p-2 rounded-md flex justify-center items-center duration-200 ring-1 ring-gray-300">
          <PiShoppingCartSimpleLight size={24} className="group-hover:scale-110 duration-300" />
        </Link>
      </div>

      {isMenu === true && (
        <div className="fixed bg-gray-100 ring-1 ring-gray-300 left-2 top-2 w-full h-screen flex flex-col gap-5 z-10 rounded-md px-4 py-16">
          <div className="w-full">
            <input placeholder="Search for products..." className="px-4 py-3 ring-1 ring-gray-300 text-sm rounded-md w-full outline-none focus:shadow-sm focus:shadow-gray-950" onChange={handleSearch} />
          </div>
          <div className="w-full flex flex-col gap-5 text-center font-semibold">
            <Link href="/search/smartphones" className={`hover:text-gray-950 hover:underline underline-offset-4 hover:bg-gray-200 py-2 rounded-md transition-all duration-200`}>
              Smartphone
            </Link>
            <Link href="/search/laptops" className={`hover:text-gray-950 hover:underline underline-offset-4 hover:bg-gray-200 py-2 rounded-md transition-all duration-200`}>
              Laptop
            </Link>
            <Link href="/search/fragrances" className={`hover:text-gray-950 hover:underline underline-offset-4 hover:bg-gray-200 py-2 rounded-md transition-all duration-200`}>
              Fragrance
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import { BiSearch } from 'react-icons/bi';
import { TbMenu } from 'react-icons/tb';
import { IoClose } from 'react-icons/io5';
import { CiAlignLeft, CiUser } from 'react-icons/ci';
import { BsAmd } from 'react-icons/bs';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useCart } from '@/pages/context/CartContext';

const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);
  const router = useRouter();
  const { cart, addToCart, removeFromCart } = useCart();
  const [categories, setCategories] = useState<any[]>([]);

  const fetchData = async () => {
    await fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMenu = () => {
    setIsMenu(!isMenu);
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
      {categories.slice(0, 5).map((category: any, i: number) => (
        <Link href={`/search/${category.slug}`} className={`hover:text-gray-950 hover:underline underline-offset-4`} key={i}>
          {category.name}
        </Link>
      ))}
    </div>
  );

  const searchInput = (
    <div className="relative w-[39%] lg:flex md:flex sm:flex hidden">
      <input placeholder="Search for products..." className="px-4 py-3 ring-1 ring-gray-300 text-sm rounded-full w-full outline-none focus:shadow-sm focus:shadow-gray-950 " onChange={handleSearch} />
      {/* <BiSearch size={18} className="absolute right-2 top-2" /> */}
    </div>
  );

  return (
    <div className="relative w-full p-5 flex justify-between items-center bg-gray-100">
      <button onClick={handleMenu} className="relative group lg:hidden md:hidden sm:hidden block p-2 rounded-md ring-1 ring-gray-300 cursor-pointer transition ease-in-out delay-150 duration-300 animete-spin">
        <TbMenu size={24} className="group-hover:scale-110" />
      </button>

      <div className="relative flex gap-5 items-center justify-center basis-3/4">
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
        <Link href="/cart" className="relative group p-2 rounded-md flex justify-center items-center duration-200 ring-1 ring-gray-300">
          <PiShoppingCartSimpleLight size={24} className="group-hover:scale-110 duration-300" />
          <p className="absolute bg-blue-600 text-white font-bold rounded-full h-4 w-4 text-xs left-0 bottom-0 justify-center flex items-center">{cart.length}</p>
        </Link>
      </div>

      {isMenu === true && (
        <div className="fixed bg-gray-100 ring-1 ring-gray-300 left-0 top-0 w-full h-screen flex flex-col gap-5 z-20 p-4">
          <button onClick={handleMenu} className="relative group lg:hidden md:hidden sm:hidden block p-2 rounded-md ring-1 ring-gray-300 cursor-pointer transition ease-in-out delay-150 duration-300 animete-spin w-10 h-10">
            <IoClose size={24} className="group-hover:scale-110" />
          </button>
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
            <Link href="/search/skincare" className={`hover:text-gray-950 hover:underline underline-offset-4`}>
              Skincare
            </Link>
            <Link href="/search/Groceries" className={`hover:text-gray-950 hover:underline underline-offset-4`}>
              Groceries
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

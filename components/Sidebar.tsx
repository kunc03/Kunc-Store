import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState, ReactNode } from 'react';
import Loading from './loading/Loading';
import LoadingText from './loading/LoadingText';

interface Props {
  children: ReactNode;
}

const Sidebar = ({ children }: Props) => {
  const [categories, setCategories] = useState<any[]>([]);
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    await fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isActiveAll = '/search/all';

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flex gap-5 justify-between bg-gray-100 px-5">
      <div className="flex flex-col gap-1 text-[15px] text-start w-[12rem]">
        <h2 className="text-xs text-gray-500 mb-2">Collections</h2>
        {loading ? (
          <LoadingText />
        ) : (
          <>
            <div className="lg:flex md:flex sm:flex flex-col hidden gap-1 items-start text-gray-600 text-sm">
              {categories.map((category: any, i: number) => {
                const isActive = pathname.startsWith(`/search/${category}`);
                return (
                  <div className="lg:flex md:flex sm:flex hidden" key={i}>
                    <Link href={`/search/${category}`} className={`${isActive ? 'text-gray-950 underline underline-offset-4' : 'hover:text-gray-950 hover:underline underline-offset-4 '}`}>
                      {category.slice(0, 1).toUpperCase()}
                      {category.slice(1, category.length).toLowerCase().replace(/-/g, ' ')}
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="w-full">{children}</div>
      <div className="w-[11rem]">Sort</div>
    </div>
  );
};

export default Sidebar;

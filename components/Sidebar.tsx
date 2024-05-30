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
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const router = useRouter();

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

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // misalnya, ukuran layar kurang dari 640 piksel dianggap sebagai layar kecil
    };

    handleResize(); // Panggil fungsi handleResize saat komponen pertama kali dimuat untuk menyesuaikan tampilan awal

    window.addEventListener('resize', handleResize); // Tambahkan event listener untuk mendeteksi perubahan ukuran layar

    return () => {
      window.removeEventListener('resize', handleResize); // Hapus event listener saat komponen tidak lagi digunakan
    };
  }, []);

  const selectCategory = (
    <select value={selectedOption} onChange={handleOptionChange} className="p-2">
      {categories.map((category: any, i: number) => (
        <option value={category} key={i}>
          {category.name}
        </option>
      ))}
    </select>
  );

  return (
    <div className="flex lg:flex-row md:flex-row flex-col gap-5 justify-between bg-gray-100 px-5">
      <div className="flex flex-col gap-1 text-[15px] text-start lg:w-[12rem] md:w-[12rem] w-full">
        <h2 className="text-xs text-gray-500 mb-2">Categories</h2>
        {loading ? (
          <LoadingText />
        ) : (
          <>
            {isSmallScreen ? (
              selectCategory
            ) : (
              <div className="lg:flex md:flex sm:flex flex-col hidden gap-1 items-start text-gray-600 text-sm">
                {categories.map((category: any, i: number) => {
                  const isActive = pathname.startsWith(`/search/${category.slug}`);

                  const handleCategory = () => {
                    router.push(`{/search/${category.slug}}`);
                  };

                  return (
                    <div className="lg:flex md:flex sm:flex hidden" key={i}>
                      <Link href={`/search/${category.slug}`} className={`${isActive ? 'text-gray-950 underline underline-offset-4' : 'hover:text-gray-950 hover:underline underline-offset-4 '}`}>
                        {category.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      <div className="w-full">{children}</div>
      {/* <div className="w-[11rem]">Sort</div> */}
    </div>
  );
};

export default Sidebar;

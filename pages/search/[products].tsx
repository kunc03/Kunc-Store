import LoadingCard from '@/components/loading/LoadingCard';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ProductSearch = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const category = router.query.products;
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    await fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setCategories(data.products));
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Sidebar>
      {loading ? (
        <LoadingCard />
      ) : (
        <>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 items-center justify-center columns-3xs px-5">
            {categories.map((category: any, i: number) => {
              const totalPrice = category.price - (category.price / 100) * category.discountPercentage;

              const formattedNumber = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalPrice);
              return (
                <Link key={i} href={`/products/${category.id}`} className="group w-full aspect-video ring-1 ring-gray-300 flex justify-center items-center rounded-md bg-white hover:ring-blue-600 relative p-10">
                  <Image
                    src={category.images[3] || category.images[1] || category.thumbnail}
                    alt={category.title}
                    width={300}
                    height={300}
                    className="bg-clip-border object-cover bg-center group-hover:scale-105 duration-300 h-44 rounded-md"
                  />
                  <div className="absolute bottom-5 left-5 flex items-center ring-1 ring-gray-300 p-1 rounded-full font-bold text-sm text-gray-950 bg-white/80">
                    <h1 className="py-1 px-2 line-clamp-1 w-28">{category.title}</h1>
                    <p className="p-2 truncate rounded-full bg-blue-600 text-white">${formattedNumber} USD</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </Sidebar>
  );
};

export default ProductSearch;

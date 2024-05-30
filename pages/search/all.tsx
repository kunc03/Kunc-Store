import Layout from '@/components/container/Layout';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { q } = router.query;

  console.log(q);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products${q ? `/search?q=${q}` : ''}`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [q]);

  return (
    <Layout>
      <Sidebar>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 items-center justify-center columns-3xs lg:px-5 md:px-5 p-0">
          {products.map((product: any, i: number) => {
            const totalPrice = product.price - (product.price / 100) * product.discountPercentage;

            const formattedNumber = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalPrice);
            return (
              <Link key={i} href={`/products/${product.id}`} className="group w-full aspect-video ring-1 ring-gray-300 flex justify-center items-center rounded-md bg-white hover:ring-blue-600 relative p-10">
                <Image src={product.images[3] || product.images[1] || product.thumbnail} alt={product.title} width={300} height={300} className="bg-clip-border object-cover bg-center group-hover:scale-105 duration-300 h-44 rounded-md" />
                <div className="absolute bottom-5 left-5 flex items-center ring-1 ring-gray-300 p-1 rounded-full font-bold text-sm text-gray-950 bg-white/80">
                  <h1 className="py-1 px-2 line-clamp-1 w-28">{product.title}</h1>
                  <p className="p-2 truncate rounded-full bg-blue-600 text-white">${formattedNumber} USD</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Sidebar>
    </Layout>
  );
};

export default AllProducts;

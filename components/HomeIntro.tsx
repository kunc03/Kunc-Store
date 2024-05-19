import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Loading from './loading/Loading';

interface Props {
  products: any;
}

const HomeIntro = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // console.log(products);

  return (
    <div className="flex flex-col gap-5 items-center mb-5">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex lg:flex-row md:flex-row flex-col gap-5 w-full justify-between px-5">
            <div className="columns-3xs flex flex-col gap-5 md:basis-1/3 sm:basis-0">
              {products.slice(1, 2).map((product: any) => {
                const totalPrice = product.price - (product.price / 100) * product.discountPercentage;

                const formattedNumber = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalPrice);

                return (
                  <Link key={product.id} href={`/products/${product.id}`} className="group w-full aspect-square ring-1 ring-gray-300 flex justify-center items-center rounded-md bg-white hover:ring-blue-600 relative">
                    <Image src={product.images[3]} alt={product.title} width={300} height={300} className="bg-clip-border object-cover bg-center group-hover:scale-105 duration-300 rounded-lg" />
                    <div className="absolute bottom-5 left-5 flex items-center gap-5 ring-1 ring-gray-300 p-1 rounded-full font-bold text-sm text-gray-950 bg-white/60">
                      <h1 className="p-2">{product.title}</h1>
                      <p className="p-2 rounded-full bg-blue-600 text-white">${formattedNumber} USD</p>
                    </div>
                  </Link>
                );
              })}
              {products.slice(3, 4).map((product: any) => {
                const totalPrice = product.price - (product.price / 100) * product.discountPercentage;

                const formattedNumber = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalPrice);
                return (
                  <Link key={product.id} href={`/products/${product.id}`} className="group w-full aspect-square ring-1 ring-gray-300 flex justify-center items-center rounded-md bg-white hover:ring-blue-600 relative">
                    <Image src={product.images[1]} alt={product.title} width={200} height={200} className="bg-clip-border bg-cover group-hover:scale-105 duration-300" />
                    <div className="absolute bottom-5 left-5 flex items-center gap-5 ring-1 ring-gray-300 bg-white/60 p-1 rounded-full font-bold text-sm text-gray-950">
                      <h1 className="p-2">{product.title}</h1>
                      <p className="p-2 rounded-full bg-blue-600 text-white">${formattedNumber} USD</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            {products.slice(2, 3).map((product: any) => {
              const totalPrice = product.price - (product.price / 100) * product.discountPercentage;

              const formattedNumber = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalPrice);

              return (
                <Link key={product.id} href={`/products/${product.id}`} className="group md:basis-2/3 sm:basis-0 aspect-square ring-1 ring-gray-300 flex justify-center items-center rounded-md bg-white hover:ring-blue-600 relative">
                  <Image src={product.images[0]} alt={product.title} width={550} height={250} className=" group-hover:scale-105 duration-300" />
                  <div className="absolute lg:bottom-[30%] lg:left-[10%] bottom-5 left-5 flex items-center gap-5 ring-1 ring-gray-300 p-1 rounded-full font-bold text-sm text-gray-950 bg-white/60">
                    <h1 className="p-2 trunc">{product.title}</h1>
                    <p className="p-2 rounded-full bg-blue-600 text-white">${formattedNumber} USD</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 items-center justify-center columns-3xs px-5">
            {products.slice(4, 10).map((product: any) => {
              const totalPrice = product.price - (product.price / 100) * product.discountPercentage;

              const formattedNumber = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalPrice);

              return (
                <Link key={product.id} href={`/products/${product.id}`} className="group w-full aspect-video ring-1 ring-gray-300 flex justify-center items-center rounded-md bg-white hover:ring-blue-600 relative p-20 py-10">
                  <Image src={product.images[3] || product.images[1]} alt={product.title} width={300} height={300} className="bg-clip-border object-cover bg-center group-hover:scale-105 duration-300 h-44 rounded-md" />
                  <div className="absolute bottom-5 left-5 flex items-center ring-1 ring-gray-300 p-1 rounded-full font-bold text-sm text-gray-950 bg-white/80">
                    <h1 className="py-1 px-2 line-clamp-1 w-28">{product.title}</h1>
                    <p className="p-2 truncate rounded-full bg-blue-600 text-white">${formattedNumber} USD</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeIntro;

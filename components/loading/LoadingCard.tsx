import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const LoadingCard = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 items-center justify-center columns-3xs px-5">
      <div className="group w-full animate-pulse aspect-square ring-1 ring-gray-200 flex justify-center items-center rounded-md  hover:ring-blue-200 relative p-10">
        <div className="bg-clip-border object-cover bg-center group-hover:scale-105 duration-300 h-44 rounded-md bg-gray-200 w-full" />
        <div className="absolute bottom-5 left-5 flex items-center ring-1 ring-gray-200 p-1 rounded-full font-bold text-sm text-gray-950 bg-white/60">
          <h1 className="py-1 px-2 line-clamp-1 w-28"></h1>
          <p className="p-5 truncate rounded-full bg-blue-200 text-white"> </p>
        </div>
      </div>
      <div className="group w-full animate-pulse aspect-square ring-1 ring-gray-200 flex justify-center items-center rounded-md  hover:ring-blue-200 relative p-10">
        <div className="bg-clip-border object-cover bg-center group-hover:scale-105 duration-300 h-44 rounded-md bg-gray-200 w-full" />
        <div className="absolute bottom-5 left-5 flex items-center ring-1 ring-gray-200 p-1 rounded-full font-bold text-sm text-gray-950 bg-white/60">
          <h1 className="py-1 px-2 line-clamp-1 w-28"></h1>
          <p className="p-5 truncate rounded-full bg-blue-200 text-white"> </p>
        </div>
      </div>
      <div className="group w-full animate-pulse aspect-square ring-1 ring-gray-200 flex justify-center items-center rounded-md  hover:ring-blue-200 relative p-10">
        <div className="bg-clip-border object-cover bg-center group-hover:scale-105 duration-300 h-44 rounded-md bg-gray-200 w-full" />
        <div className="absolute bottom-5 left-5 flex items-center ring-1 ring-gray-200 p-1 rounded-full font-bold text-sm text-gray-950 bg-white/60">
          <h1 className="py-1 px-2 line-clamp-1 w-28"></h1>
          <p className="p-5 truncate rounded-full bg-blue-200 text-white"> </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;

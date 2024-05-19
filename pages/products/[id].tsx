import Loading from '@/components/loading/Loading';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { FaExchangeAlt } from 'react-icons/fa';
import { GrDeliver, GrReturn } from 'react-icons/gr';

const DetailsProduct = () => {
  const router = useRouter();
  const id = router.query.id;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any>([]);

  const [image, setImage] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const data = products.images;

  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  {
    loading ? <Loading /> : <div> </div>;
  }

  // const [loadingImage, setLoadingImage] = useState('');
  useEffect(() => {
    data?.slice(0, 1).map((image: any, i: number) => {
      setSelectedImage(image);
    });
  });

  const totalPrice = products.price - (products.price / 100) * products.discountPercentage;

  const formattedNumber = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalPrice);

  const handleClick = () => {
    setIsClick(!isClick);
  };

  return (
    <div className="w-full px-5 bg-gray-100">
      <div className="flex justify-center lg:flex-row md:flex-row flex-col bg-white h-full p-5 rounded-lg border-[1px] border-gray-300">
        <div className="lg:basis-2/3 md:basis-2/3 basis-0  flex flex-col items-center justify-center">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="relative w-full h-full  flex flex-col items-center justify-center p-5 mb-5">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <Image src={image} quality={100} width={450} height={400} alt={'Product Image'} className="lg:absolute md:absolute static group-hover:scale-105 duration-300 rounded-lg" />
                ) : (
                  // <Image src={image} width={250} height={250} alt={'Product Image'} className="group-hover:scale-105 duration-300 rounded-lg h-[20rem] w-[26rem] -cover" />
                  <Image src={selectedImage} quality={100} width={450} height={400} alt={'Product Image'} className="lg:absolute md:absolute static group-hover:scale-105 duration-300 rounded-lg" />
                )}
              </div>
              <div className="flex items-center justify-center gap-2 z-10 bg-white/70">
                {products.images?.map((image: any, i: number) => {
                  // console.log(image);
                  return (
                    <button onClick={() => setImage(image)} key={i} className="group flex w-20 h-20 rounded-md ring-[1px] ring-gray-300 p-1">
                      <Image
                        src={image}
                        width={250}
                        height={250}
                        alt={'Product Image'}
                        loading={image.length === i + 1 ? 'eager' : 'lazy'}
                        className={`group-hover:scale-105 duration-300 rounded-lg h-full w-full ${image == image && 'bg-gray-200 '}`}
                      />
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div className="lg:basis-1/3 md:basis-1/3 basis-0 p-10">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="flex flex-col gap-3 font-semibold">
                <h1 className="text-5xl">{products.title}</h1>
                <p className="font-normal text-sm text-gray-400">{products.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <p className="bg-gray-100 p-1 rounded-md border-[1px] border-gray-300">Rating: {products.rating}</p>
                  <p className="bg-gray-100 p-1 rounded-md border-[1px] border-gray-300">Stock: {products.stock}</p>
                </div>
                <div className="flex flex-col gap-2 items-center text-gray-400 mt-5">
                  <div className="bg-gray-100 w-full p-1">
                    <div className="flex justify-between items-center w-full">
                      <h1 className="flex font-normal text-sm">Shipping & Returns</h1>
                      <button onClick={handleClick}>
                        <BiPlus size={20} />
                      </button>
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                      <div className="flex items-start font-normal text-justify text-gray-600 p-2 gap-2">
                        <GrDeliver size={18} />
                        <div className="flex flex-col w-full text-sm ">
                          <h3 className="font-bold">Fast delivery</h3>
                          <p className="text-xs">Your package will arrive in 3-5 business days at your pick up location or in the comfort of your home.</p>
                        </div>
                      </div>
                      <div className="flex items-start font-normal text-justify text-gray-600 p-2 gap-2">
                        <FaExchangeAlt size={18} />
                        <div className="flex flex-col w-full text-sm ">
                          <h3 className="font-bold">Simple exchanges</h3>
                          <p className="text-xs">Is the fit not quite right? No worries - we{"'"}ll exchange your product for a new one.</p>
                        </div>
                      </div>
                      <div className="flex items-start font-normal text-justify text-gray-600 p-2 gap-2">
                        <GrReturn size={18} />
                        <div className="flex flex-col w-full text-sm ">
                          <h3 className="font-bold">Easy returns </h3>
                          <p className="text-xs">
                            Just return your product and we{"'"}ll refund your money. No questions asked – we{"'"}ll do our best to make sure your return is hassle-free.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-b-[1px] border-gray-300 pb-5"></div>
                <h4 className="w-[40%] flex justify-center p-2 rounded-full bg-blue-600 text-white">${formattedNumber} USD</h4>
              </div>
              <div></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsProduct;

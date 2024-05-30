import Loading from '@/components/loading/Loading';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BiMinus, BiPlus, BiSolidStar, BiStar } from 'react-icons/bi';
import { FaExchangeAlt } from 'react-icons/fa';
import { GrDeliver, GrReturn } from 'react-icons/gr';
import { useCart } from '../context/CartContext';
import Layout from '@/components/container/Layout';

const DetailsProduct = () => {
  const router = useRouter();
  const id = router.query.id;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any>([]);

  const [image, setImage] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const data = products.images;

  const [isClick, setIsClick] = useState(false);
  const [isCart, setIsCart] = useState(false);

  const { cart, addToCart, removeFromCart } = useCart();

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

  const handleCart = () => {
    setIsCart(!isCart);
    if (isCart === false) {
      addToCart(products.id);
    } else {
      removeFromCart(products.id);
    }
  };

  return (
    <Layout>
      <div className="w-full px-5 bg-gray-100">
        <div className="flex justify-center lg:flex-row md:flex-row flex-col bg-white h-full p-5 rounded-lg border-[1px] border-gray-300">
          <div className="lg:basis-2/3 md:basis-2/3 basis-0 flex flex-col items-center justify-center">
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  {image ? (
                    <Image src={image} quality={100} width={450} height={400} alt={'Product Image'} className="h-[80vh] w-auto static group-hover:scale-105 duration-300 rounded-lg" />
                  ) : (
                    <Image src={selectedImage} quality={100} width={450} height={400} alt={'Product Image'} className=" group-hover:scale-105 h-[80vh] w-auto duration-300 rounded-lg" />
                  )}
                </div>
                <div className="flex items-center justify-center gap-2 z-10 bg-white/70">
                  {products.images?.map((image: any, i: number) => {
                    // console.log(image);
                    return (
                      <button onClick={() => setImage(image)} key={i} className="group flex justify-center w-20 h-20 rounded-md ring-[1px] ring-gray-300 p-1">
                        <Image
                          src={image}
                          width={250}
                          height={250}
                          alt={'Product Image'}
                          loading={image.length === i + 1 ? 'eager' : 'lazy'}
                          className={`group-hover:scale-105 duration-300 rounded-lg h-full w-auto ${image == image && 'bg-gray-200 '}`}
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
                    <p className="bg-blue-100 font-normal p-1 rounded-md border-[1px] border-gray-300">Rating: {products.rating}/5</p>
                    <p className="bg-blue-100 p-1 font-normal rounded-md border-[1px] border-gray-300">Stock: {products.stock}</p>
                  </div>
                  <div className="flex flex-col gap-2 items-center text-gray-400 mt-5">
                    <div className="bg-blue-100  border-[1px] border-gray-300 w-full py-2 px-3 rounded-md relative">
                      <div className="flex justify-between items-center w-full">
                        <h1 className="flex font-normal text-sm">Shipping & Returns</h1>
                        <button onClick={handleClick}>{!isClick ? <BiPlus size={20} /> : <BiMinus size={20} />}</button>
                      </div>
                      <div className={`${isClick === true ? 'flex' : 'hidden'} absolute flex-col gap-3 left-0 mt-3 bg-blue-100 border-[1px] border-gray-300 w-full py-2 px-3 rounded-md z-20`}>
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
                  <div className="border-b-[1px] border-gray-300 my-5"></div>
                  <div className="flex justify-between items-center">
                    <h4 className="flex justify-center p-2 rounded-full text-blue-600">${formattedNumber} USD</h4>
                    <button onClick={handleCart} className="flex justify-between p-2 rounded-full bg-blue-600 text-white hover:text-gray-950 hover:bg-blue-200 hover:shadow-sm hover:shadow-blue-600 duration-200 items-center">
                      {/* <BiPlus size={23} className="rounded-full" /> */}
                      {!isCart ? 'Add To Cart' : 'Remove from Cart'}
                    </button>
                  </div>
                  <div className="border-b-[1px] border-gray-300 my-5"></div>

                  <button className="flex justify-center p-2 rounded-full bg-blue-600 text-white hover:text-gray-950 hover:bg-blue-200 hover:shadow-sm hover:shadow-blue-600 duration-200 items-center">Go To Checkout</button>
                </div>
                <div></div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailsProduct;

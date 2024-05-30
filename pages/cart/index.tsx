import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { GetProductById } from '@/utils/getProductById';
import Loading from '@/components/loading/Loading';
import Image from 'next/image';
import { BiMinus, BiPlus, BiTrash } from 'react-icons/bi';
import { HiMinusSmall } from 'react-icons/hi2';
import { MdOutlineAdd } from 'react-icons/md';

const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  {
    loading ? <Loading /> : <div> </div>;
  }

  interface Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }

  const countPlus = () => {
    setCount(count + 1);
  };
  const countMinus = () => {
    if (count !== 0) {
      setCount(count - 1);
    }
    return;
  };

  const [totalOverall, setTotalOverall] = useState<number>(0);
  const [quantity, setQuantity] = useState(0);

  // tambahkan product dg ID yang sama
  const handleQuantity = () => {};
  // jumlah/length ID yang sama dikali price
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    {
      cart.map((id: any) => setAmount(parseInt(id)));
    }
  });

  // console.log(amount);

  return (
    <div className="w-full px-5 bg-gray-100">
      <div className="flex justify-center lg:flex-row md:flex-row flex-col bg-white h-full p-5 rounded-lg border-[1px] border-gray-300">
        <div className="lg:basis-2/3 md:basis-2/3 basis-0 flex flex-col items-center justify-center">
          <table className="w-full">
            <thead>
              <tr className="flex">
                <th className="basis-2/5 text-start">Item </th>
                <th className="basis-1/5 text-center">Quantity </th>
                <th className="basis-1/5 text-center">Price</th>
                <th className="basis-1/5 text-end">Total</th>
              </tr>
            </thead>
            <tbody className="flex flex-col gap-5 py-5">
              {cart.map((id: any, index: number) => {
                const product = GetProductById(id);
                if (!product) return null;

                const totalPrice = parseFloat(product.price) - (parseFloat(product.price) / 100) * parseFloat(product.discountPercentage);

                const formattedNumber = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalPrice);
                const totalAmount = parseFloat(formattedNumber);

                return (
                  <tr className="text-sm flex" key={index}>
                    {' '}
                    <td className="flex basis-2/5 gap-2 items-center rounded-md text-gray-500">
                      <Image src={product.thumbnail} width={250} height={250} alt={'Product Image'} loading="eager" className={`group-hover:scale-105 duration-300 w-20 h-20 rounded-lg ring-[1px] ring-gray-300`} />
                      <div>
                        <p className="font-semibold">{product.title}</p>
                        <p>{product.brand}</p>
                      </div>
                    </td>
                    <td className="flex basis-1/5 gap-2 items-center justify-center rounded-md text-gray-500 border-2">
                      <BiTrash size={20} />
                      <div>
                        <button>
                          <HiMinusSmall />
                        </button>
                        <span>{quantity}</span>
                        <button>
                          <MdOutlineAdd />
                        </button>
                      </div>
                    </td>
                    <td className="flex basis-1/5 gap-2 items-center justify-center rounded-md text-gray-500">
                      {/* <h1>{totalAmount}</h1> */}
                      <input type="number" step="0.01" defaultValue={totalAmount} />
                    </td>
                    <td className="flex basis-1/5 gap-2 text-end justify-end items-center rounded-md text-gray-500">
                      <BiTrash size={20} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="lg:basis-1/3 md:basis-1/3 basis-0 p-10">right</div>
      </div>
    </div>
  );
};

export default CartPage;

import signIn from '@/lib/firebase/signin';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push('/admin');
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen">
      <div className="p-6 bg-white rounded-lg border-[1px] border-gray-300">
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full gap-3">
          <h1 className="flex text-gray-950 text-2xl font-bold mb-5">Login to KUNC STORE</h1>
          <div className="flex flex-col w-[20rem]">
            <label htmlFor="email" className="text-gray-950">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="p-2 bg-gray-100 border-gray-300 border-[1px] w-full focus:outline-none focus:border-blue-600 focus:shadow-sm focus:shadow-blue-600"
            />
          </div>
          <div className="flex flex-col w-[20rem]">
            <label htmlFor="password" className="text-gray-950">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="p-2 bg-gray-100 border-gray-300 border-[1px] w-full focus:outline-none focus:border-blue-600 focus:shadow-sm focus:shadow-blue-600"
            />
          </div>

          <button
            type="submit"
            className="flex bg-blue-600 font-semibold text-gray-50 w-full p-2 items-center justify-center hover:ring-[1px] hover:ring-blue-600 hover:bg-white hover:text-blue-600 hover:shadow-sm hover:shadow-blue-600 duration-200 transition-all"
          >
            Login
          </button>
        </form>
        <p className="text-xs text-start w-full pt-1">
          Don{"'"}t have an account?{' '}
          <Link href={'/register'} className="text-blue-500 hover:text-blue-700 font-bold">
            Register Now
          </Link>
        </p>
        <div className="border-b-[1px] my-5 border-gray-300 w-full"></div>
        <div>
          <button
            type="submit"
            className="flex bg-blue-600 font-semibold text-gray-50 w-full p-2 items-center justify-center hover:ring-[1px] hover:ring-blue-600 hover:bg-white hover:text-blue-600 hover:shadow-sm hover:shadow-blue-600 duration-200 transition-all"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import Image from 'next/image';
import { Inter, Quicksand } from 'next/font/google';
import HomeIntro from '@/components/HomeIntro';
import Layout from '@/components/container/Layout';

const inter = Inter({ subsets: ['latin'] });
const quicksand = Quicksand({ subsets: ['latin'] });

export default function Home() {
  return (
    <Layout>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-gray-100 ${quicksand.className}`}>
        <HomeIntro />
      </main>
    </Layout>
  );
}

import react, { useEffect, useState } from 'react';
import {
  useDevCycleClient,
  useVariableValue,
} from '@devcycle/react-client-sdk';
import Navbar from '@/components/navbar/Navbar';
import Confetti from 'https://esm.sh/react-confetti';
import Showcase from '@/components/Showcase';
import Categories from '@/components/Categories';
import ProductList from '@/components/ProductList';
import Header from '@/components/Header';

export default function HomePage() {
  const saleActiveFlag = useVariableValue('sale-active', false);

  const [confetti, toggleConfetti] = useState(false);

  useEffect(() => {
    if (saleActiveFlag) {
      if (!localStorage.getItem('confetti')) {
        localStorage.setItem('confetti', 'blabla');
        toggleConfetti(() => true);
        setTimeout(() => toggleConfetti(() => false), 10000);
      }
    }

    return () => localStorage.removeItem('confetti');
  }, [saleActiveFlag]);

  return (
    <div className="mx-auto md:w-[80%] lg:w-[70%]">
      {/* Hello there !{saleActiveFlag ? <img src="/sale/banner.jpg" /> : 'No sale'} */}
      {confetti && <Confetti />}
      <Header />
      <Showcase saleActiveFlag={saleActiveFlag} />
      <Categories />
      <ProductList />
    </div>
  );
}

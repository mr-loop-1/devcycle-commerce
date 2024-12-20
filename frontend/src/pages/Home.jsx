import react, { useEffect, useState } from 'react';
import { useVariableValue } from '@devcycle/react-client-sdk';
import Navbar from '@/components/navbar/Navbar';
import Confetti from 'https://esm.sh/react-confetti';
import Showcase from '@/components/Showcase';
import Categories from '@/components/Categories';
import ProductList from '@/components/ProductList';

export default function HomePage() {
  const saleActiveFlag = useVariableValue('sale-active', false);
  const [confetti, toggleConfetti] = useState(false);

  if (saleActiveFlag) {
    useEffect(() => {
      if (!localStorage.getItem('confetti')) {
        localStorage.setItem('confetti', 'blabla');
        toggleConfetti(() => true);
        setTimeout(() => toggleConfetti(() => false), 10000);
      }

      return () => localStorage.removeItem('confetti');
    }, []);
  }

  return (
    <div className="mx-2 md:mx-40 lg:mx-80">
      {/* Hello there !{saleActiveFlag ? <img src="/sale/banner.jpg" /> : 'No sale'} */}
      {confetti && <Confetti />}
      <Navbar />
      <Showcase saleActiveFlag={saleActiveFlag} />
      <Categories />
      <ProductList />
    </div>
  );
}

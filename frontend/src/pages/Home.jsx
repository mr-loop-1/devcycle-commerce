import react, { useEffect, useState } from 'react';
import { useVariableValue } from '@devcycle/react-client-sdk';
import Navbar from '@/components/navbar/Navbar';
import Confetti from 'https://esm.sh/react-confetti';

export default function HomePage() {
  const saleActiveFlag = useVariableValue('sale-active', false);
  const [confetti, toggleConfetti] = useState(false);

  if (saleActiveFlag) {
    useEffect(() => {
      if (!localStorage.getItem('confetti')) {
        localStorage.setItem('confetti', 'blabla');
        toggleConfetti(() => true);
        setTimeout(() => toggleConfetti(() => false), 4000);
      }

      return () => localStorage.removeItem('confetti');
    }, []);
  }

  return (
    <div>
      {/* Hello there !{saleActiveFlag ? <img src="/sale/banner.jpg" /> : 'No sale'} */}
      {confetti && <Confetti />}
      <Navbar />
      <div className="content">
        <div className="poster-area">
          <div className="poster-data">
            <p className="poster-head">Free Delivery!</p>
            <p className="poster-desc">
              Don't miss it out! Only today, get free{' '}
              <b style={{ fontSize: '22px' }}>Next Day</b> delivery on all your
              orders.
            </p>
          </div>
          <button className="browse-btn">Browse products</button>
        </div>
        {/* <img src={Delivery} className="delivery" /> */}
        {/* <Popular /> */}
      </div>
    </div>
  );
}

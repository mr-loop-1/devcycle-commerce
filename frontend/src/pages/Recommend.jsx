import { Button } from '@/components/ui/button';
import { useVariableValue } from '@devcycle/react-client-sdk';
import { Link, redirect } from 'react-router-dom';
import { getRecommendedApi } from '../../api/api';
import Product from '@/components/Product';
import { useCountry } from '@/contexts/CountryProvider';

export default function RecommendPage() {
  const isSale = useVariableValue('sale-active', false);
  const recommendPage = useVariableValue('recommend-page', false);
  const recommendStrategy = useVariableValue(
    'recommend-strategy',
    'normal-order'
  );
  const chatbot = useVariableValue('chatbot-status', false);
  const shippingWaiver = useVariableValue('shipping-waiver', 'normal');

  const { country } = useCountry();

  if (!isSale || !recommendPage) {
    redirect('/');
  }

  const data = getRecommendedApi({
    isSale,
    country,
    recommendStrategy,
  });

  return (
    <div className="mx-auto md:w-[80%] lg:w-[70%]">
      <div className="flex justify-around">
        <div className="">
          some recommendations that you may want to add to your cart"
        </div>
        <Link to="/cart">Continue to cart...</Link>
      </div>
      <div id="recommended-products">
        <div className="flex">
          {data.map((product) => {
            return (
              <Product product={product} shippingWaiver={shippingWaiver} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

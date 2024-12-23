import { Button } from '@/components/ui/button';
import { useVariableValue } from '@devcycle/react-client-sdk';
import { Link, redirect } from 'react-router-dom';
import { getRecommendedApi } from '../../api/api';
import Product from '@/components/Product';
import { useCountry } from '@/contexts/CountryProvider';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, SquareArrowOutUpRight } from 'lucide-react';
import ChatBot from '@/components/ChatBot';
import { useCart } from '@/contexts/CartProvider';

export default function RecommendPage() {
  const isSale = useVariableValue('sale-status', false);
  const recommendPage = useVariableValue('recommend-page', false);
  const recommendStrategy = useVariableValue('recommend-strategy', 'profit');
  const chatbot = useVariableValue('chatbot-status', false);
  const shippingWaiver = useVariableValue('shipping-waiver', 'none');

  const { country } = useCountry();
  const { cart } = useCart();

  if (!isSale || !recommendPage) {
    redirect('/');
  }

  const data = getRecommendedApi({
    isSale,
    country,
    recommendStrategy,
    cart,
  });

  return (
    <div className="mx-3 md:mx-auto md:w-[80%] lg:w-[70%]">
      {isSale && (
        <div className="w-full text-white font-extrabold italic border-white mt-6 bg-red-600 overflow-hidden whitespace-nowrap">
          ALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE
          SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE
          SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE
          SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE
          SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE
          SALE SALE
        </div>
      )}
      {isSale && shippingWaiver == 'primary' && (
        <div
          className="w-full text-center text-white font-semibold bg-blue-800"
          style={{ textShadow: '0 0 10px white' }}
        >
          hurray{'!,'} some* products are now eligible for free shipping
        </div>
      )}
      {isSale && shippingWaiver == 'all' && (
        <div
          className="w-full text-center text-white font-semibold bg-blue-800"
          style={{ textShadow: '0 0 10px white' }}
        >
          hurray{'!,'} all products are now eligible for free shipping
        </div>
      )}

      <Card className="mx-2 mt-4 py-5 md:py-10 px-4">
        <div className="w-full text-center text-orange-500 text-4xl font-bold">
          tailored for you
        </div>
        <div className="flex justify-between md:mx-5 items-center mt-10">
          <div className="text-lg font-semibold">
            some recommendations to add to your cart
          </div>
          <span className="flex-shrink-0 ml-16">
            <Link
              to="/cart"
              className="cursor-pointer hover:underline font-semibold text-mono text-blue-600"
            >
              continue to cart <ArrowUpRight className="inline" />
            </Link>
          </span>
        </div>
        <div id="recommended-products" className="mt-10 md:mx-4">
          <div className="flex justify-around flex-wrap">
            {data.map((product) => {
              return (
                <div className="mt-4 mx-2">
                  <Product
                    product={product}
                    shippingWaiver={shippingWaiver}
                    country={country}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Card>
      {chatbot && <ChatBot />}
    </div>
  );
}

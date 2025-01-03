import { useCart } from '@/contexts/CartProvider';
import { useVariableValue } from '@devcycle/react-client-sdk';
import { Link, redirect } from 'react-router-dom';
import { getCartValue } from '../../api/api';
import { useCountry } from '@/contexts/CountryProvider';
import CartProduct from '@/components/CartProducts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { country as countryConfig } from '../../api/db/config';
import ChatBot from '@/components/ChatBot';

export default function CartPage() {
  const isSale = useVariableValue('sale-status', false);
  const cartPage = useVariableValue('cart-page', false);
  const shippingWaiver = useVariableValue('shipping-waiver', 'none');
  const chatbot = useVariableValue('chatbot-status', false);

  const { cart, dispatch } = useCart();
  const { country } = useCountry();

  const cartData = getCartValue({
    isSale,
    country,
    shippingWaiver,
    cartProducts: cart,
  });

  if (!isSale || !cartPage) {
    redirect('/');
  }

  return (
    <div className="mx-3 md:mx-auto md:w-[80%] lg:w-[70%]">
      {isSale && (
        <div
          style={{ textShadow: '0 0 10px white' }}
          className="w-full text-white font-extrabold italic border-white mt-6 bg-red-600 overflow-hidden whitespace-nowrap"
        >
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
          hurray{'!,'} products with in-house shipping are now eligible for free
          shipping
        </div>
      )}
      {isSale && shippingWaiver == 'all' && (
        <div
          className="w-full text-center text-white font-semibold bg-lime-800"
          style={{ textShadow: '0 0 10px white' }}
        >
          hurray{'!,'} all products including third-party shipped are now
          eligible for free shipping
        </div>
      )}
      <div className="mx-auto md:max-w-[80%] mt-4 py-5 md:py-10">
        <div className="w-full text-center font-bold text-3xl">
          Cart checkout
        </div>
        {cart.length ? (
          <div className="mt-6 flex flex-col-reverse md:flex-row w-full p-2">
            <div className="cart-products w-full md:w-[55%]">
              {cartData.productsData.map((product) => {
                return (
                  <CartProduct
                    isSale={isSale}
                    shippingWaiver={shippingWaiver}
                    product={product}
                    dispatch={dispatch}
                    country={country}
                  />
                );
              })}
            </div>
            <div className="md:ml-4 flex h-fit flex-col w-full md:w-[40%]  p-1">
              <Card className="h-fit py-4 px-2 md:p-6 bg-stone-200 flex flex-col">
                <span className="flex justify-between">
                  <span>Cart Value</span>
                  <span>
                    {countryConfig[country].currency}
                    {cartData.priceData.mrp.toFixed(2)}
                  </span>
                </span>
                {isSale && (
                  <span className="flex justify-between my-1">
                    <span className="">Sale Discount</span>
                    <span>
                      {countryConfig[country].currency}-
                      {(
                        cartData.priceData.mrp - cartData.priceData.salePrice
                      ).toFixed(2)}
                    </span>
                  </span>
                )}
                <span className="flex justify-between my-1">
                  <span>Shipping Charges</span>
                  <span>
                    {countryConfig[country].currency}
                    {cartData.priceData.shippingCost.toFixed(2)}
                  </span>
                </span>
                {isSale &&
                  shippingWaiver == 'primary' &&
                  cartData.priceData.shippingCost !=
                    cartData.priceData.discountedShipping && (
                    <span className="flex justify-between my-1">
                      <span>Shipping Discount</span>
                      <span>
                        {countryConfig[country].currency}-
                        {(
                          cartData.priceData.shippingCost -
                          cartData.priceData.discountedShipping
                        ).toFixed(2)}
                      </span>
                    </span>
                  )}
                {isSale &&
                  shippingWaiver == 'all' &&
                  cartData.priceData.shippingCost != 0 && (
                    <span className="flex justify-between my-1">
                      <span>Shipping Discount</span>
                      <span>
                        {countryConfig[country].currency}-
                        {cartData.priceData.shippingCost.toFixed(2)}
                      </span>
                    </span>
                  )}
                {isSale && (
                  <div className="p-2 mt-4 font-mono rounded-xl  bg-lime-600 text-white font-semibold">
                    Congratulations, you have saved{' '}
                    {countryConfig[country].currency}
                    {(
                      cartData.priceData.mrp - cartData.priceData.salePrice
                    ).toFixed(2)}{' '}
                    on this order
                  </div>
                )}
                {isSale &&
                  shippingWaiver == 'primary' &&
                  cartData.priceData.shippingCost !=
                    cartData.priceData.discountedShipping && (
                    <div className="p-2 mt-4 font-mono rounded-xl  bg-violet-600 text-white font-semibold">
                      Congratulations, some of the products in cart are eligible
                      for free shipping
                    </div>
                  )}
                {isSale &&
                  shippingWaiver == 'all' &&
                  cartData.priceData.shippingCost && (
                    <div className="p-2 mt-4 font-mono rounded-xl  bg-violet-600 text-white font-semibold">
                      Congratulations, some of the products in cart are eligible
                      for free shipping
                    </div>
                  )}
              </Card>
              <Card className="h-fit mt-4 py-4 px-2 mb-6 md:p-6 bg-stone-200 flex justify-between text-xl font-semibold">
                <span>Total Cost</span>
                <span>
                  {countryConfig[country].currency}
                  {isSale &&
                    (shippingWaiver == 'none'
                      ? cartData.priceData.salePrice +
                        cartData.priceData.shippingCost
                      : shippingWaiver == 'primary'
                      ? cartData.priceData.salePrice +
                        cartData.priceData.discountedShipping
                      : cartData.priceData.salePrice
                    ).toFixed(2)}
                  {!isSale &&
                    (
                      cartData.priceData.mrp + cartData.priceData.shippingCost
                    ).toFixed(2)}
                </span>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="mt-10 mb-40 w-full flex flex-col items-center pb-12">
            <div className="mt-10 mb-10 w-full text-center text-blue-600 text-5xl font-bold">
              No Additions Yet!
            </div>
            <Link to="/">
              <Button className=" bg-blue-700">Shop Products</Button>
            </Link>
          </Card>
        )}
      </div>
      {chatbot && <ChatBot />}
    </div>
  );
}

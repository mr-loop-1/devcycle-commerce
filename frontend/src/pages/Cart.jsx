import { useCart } from '@/contexts/CartProvider';
import { useVariableValue } from '@devcycle/react-client-sdk';
import { Link, redirect } from 'react-router-dom';
import { getCartValue } from '../../api/api';
import { useCountry } from '@/contexts/CountryProvider';
import CartProduct from '@/components/CartProducts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const isSale = useVariableValue('sale-active', false);
  const cartPage = useVariableValue('cart-page', false);
  const shippingWaiver = useVariableValue('shipping-waiver', 'normal');
  const chatbot = useVariableValue('chatbot-status', false);

  const { cart, dispatch } = useCart();
  const { country } = useCountry();

  const cartData = getCartValue({
    isSale,
    country,
    shippingWaiver,
    cartProducts: cart,
  });
  console.log('🚀 ~ CartPage ~ cartData:', cartData);

  if (!isSale || !cartPage) {
    redirect('/');
  }

  return (
    <div className="mx-3 md:mx-auto md:w-[80%] lg:w-[70%]">
      <div className="mx-auto md:max-w-[80%] mt-4 py-5 md:py-10">
        <div className="w-full text-center font-bold text-3xl">
          Cart checkout
        </div>
        {cart.length ? (
          <div className="mt-6 flex flex-col-reverse md:flex-row w-full p-2">
            <div className="cart-products w-full md:w-[55%]">
              {cartData.productsData.map((product) => {
                return <CartProduct product={product} dispatch={dispatch} />;
              })}
            </div>
            <div className="md:ml-4 flex h-fit flex-col w-full md:w-[40%]  p-1">
              <Card className="h-fit py-4 px-2 md:p-6 bg-stone-200 flex flex-col">
                <span className="flex justify-between">
                  <span>Cart Value</span>
                  <span>{cartData.priceData.mrp.toFixed(2)}</span>
                </span>
                {isSale && (
                  <span className="flex justify-between">
                    <span>Sale Discount</span>
                    <span>
                      -
                      {(
                        cartData.priceData.mrp - cartData.priceData.salePrice
                      ).toFixed(2)}
                    </span>
                  </span>
                )}
                <span className="flex justify-between">
                  <span>Shipping Cost</span>
                  <span>{cartData.priceData.shippingCost.toFixed(2)}</span>
                </span>
                {shippingWaiver != 'normal' && (
                  <span className="flex justify-between">
                    <span>Shipping Discount</span>
                    <span>
                      {(
                        cartData.priceData.shippingCost -
                        cartData.priceData.discountedShipping
                      ).toFixed(2)}
                    </span>
                  </span>
                )}
                {isSale && (
                  <div className="p-2 mt-2 bg-lime-300 font-mono rounded-xl">
                    Congratulations, you have saved{' '}
                    {(
                      cartData.priceData.mrp - cartData.priceData.salePrice
                    ).toFixed(2)}{' '}
                    on this order
                  </div>
                )}
              </Card>
              <Card className="h-fit mt-4 py-4 px-2 mb-6 md:p-6 bg-stone-200 flex justify-between text-xl font-semibold">
                <span>Total Cost</span>
                <span>{cartData.priceData.salePrice.toFixed(2)}</span>
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
    </div>
  );
}

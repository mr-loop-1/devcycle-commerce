import { useCart } from '@/contexts/CartProvider';
import { useVariableValue } from '@devcycle/react-client-sdk';
import { redirect } from 'react-router-dom';
import { getCartValue } from '../../api/api';
import { useCountry } from '@/contexts/CountryProvider';
import CartProduct from '@/components/CartProducts';
import { Card } from '@/components/ui/card';

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

  if (!isSale || !cartPage) {
    redirect('/');
  }

  return (
    <div className="mx-auto md:w-[80%] lg:w-[70%]">
      <div className="mx-auto md:max-w-[80%] mt-4 py-5 md:py-10">
        <div className="w-full text-center font-bold text-3xl">
          Cart checkout
        </div>
        <div className="mt-6 flex flex-col-reverse md:flex-row w-full p-2">
          <div className="cart-products w-full md:w-[55%]">
            {cartData.productsData.map((product) => {
              return <CartProduct product={product} dispatch={dispatch} />;
            })}
          </div>
          <div className="md:ml-4 flex h-fit flex-col w-full md:w-[40%]  p-1">
            <Card className="h-fit py-4 px-2 md:p-6 bg-blue-100 flex flex-col">
              <span className="flex justify-between">
                <span>mrp</span>
                <span>{cartData.priceData.discount}</span>
              </span>
              <span className="flex justify-between">
                <span>discount</span>
                <span>{cartData.priceData.discount}</span>
              </span>
              <span className="flex justify-between">
                <span>shipping</span>
                <span>{cartData.priceData.discount}</span>
              </span>
              <span className="flex justify-between">
                <span>discount</span>
                <span>{cartData.priceData.discount}</span>
              </span>
              <div className="p-2 mt-2 bg-lime-300 font-mono rounded-xl">
                Congratulations, you have saved {cartData.priceData.discount} on
                this order
              </div>
            </Card>
            <Card className="h-fit mt-4 py-4 px-2 mb-6 md:p-6 bg-stone-200 flex justify-between text-xl font-semibold">
              <span>Total Cost</span> <span>{cartData.priceData.mrp}</span>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

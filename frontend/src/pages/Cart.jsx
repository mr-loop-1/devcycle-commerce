import { useCart } from '@/contexts/CartProvider';
import { useVariableValue } from '@devcycle/react-client-sdk';
import { redirect } from 'react-router-dom';
import { getCartValue } from '../../api/api';
import { useCountry } from '@/contexts/CountryProvider';
import CartProduct from '@/components/CartProducts';

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
    <div className="w-full p-2">
      <div className="">Cart checkout</div>
      <div className="flex flex-col-reverse md:flex-row w-full p-2">
        <div className="cart-products w-full md:w-[50%] bg-red-200">
          {cartData.productsData.map((product) => {
            return <CartProduct product={product} />;
          })}
        </div>
        <div className="flex h-fit flex-col w-full md:w-[50%] bg-green-200 p-2">
          <div className="h-fit bg-blue-100">{cartData.priceData.discount}</div>
          <div className="h-fit bg-pink-100">{cartData.priceData.mrp}</div>
        </div>
      </div>
    </div>
  );
}

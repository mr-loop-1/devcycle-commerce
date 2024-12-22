import { useVariableValue } from '@devcycle/react-client-sdk';
import { redirect } from 'react-router-dom';

export default function CartPage() {
  const isSale = useVariableValue('sale-active', false);
  const cartPage = useVariableValue('cart-page', false);
  const shippingWaiver = useVariableValue('shipping-waiver', 'normal');
  const chatbot = useVariableValue('chatbot-status', false);

  if (!isSale || !cartPage) {
    redirect('/');
  }

  return (
    <div className="w-full p-2">
      <div className="">Cart checkout</div>
      <div className="flex flex-col-reverse md:flex-row w-full p-2">
        <div className="cart-products w-full md:w-[50%] bg-red-200">
          jnda,sm
          <br />
          jkdqwans
          <br />
          hkdbq
          <br />
          hjabsd jnda,sm
          <br />
          jkdqwans
          <br />
          hkdbq
          <br />
          hjabsd jnda,sm
          <br />
          jkdqwans
          <br />
          hkdbq
          <br />
          hjabsd jnda,sm
          <br />
          jkdqwans
          <br />
          hkdbq
          <br />
          hjabsd
        </div>
        <div className="flex h-fit flex-col w-full md:w-[50%] bg-green-200 p-2">
          <div className="h-fit bg-blue-100">
            jnda,sm
            <br />
            jkdqwans
            <br />
            hkdbq
            <br />
            hjabsd
          </div>
          <div className="h-fit bg-pink-100">
            {' '}
            jnda,sm
            <br />
            jkdqwans
            <br />
            hkdbq
            <br />
            hjabsd
          </div>
        </div>
      </div>
    </div>
  );
}

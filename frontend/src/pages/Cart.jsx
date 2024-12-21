export default function CartPage() {
  const saleActiveFlag = useVariableValue('sale-active', false);
  const separateCartPageFlag = useVariableValue('separate-cart-page', false);
  const shippingPriceStrategy = useVariableValue(
    'shipping-price-strategy',
    null
  );
  const chatbot = useVariableValue('chatbot', false);

  if (!saleActiveFlag || !separateCartPageFlag) {
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

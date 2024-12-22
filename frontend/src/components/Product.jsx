import { useCart } from '@/contexts/CartProvider';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useVariableValue } from '@devcycle/react-client-sdk';

export default function Product({ product }) {
  const shippingPriceStrategy = useVariableValue('shipping-waiver', 'null');
  const { cart, dispatch } = useCart();

  return (
    <Card className="p-2 w-60 mb-2 h-fit flex-shrink-0 mr-3 md:mr-6">
      <img src={`/products/${product.slug}.png`} />
      <div className="flex w-full justify-between">
        <div className="">weqda</div>
        {cart.includes(product.id) ? (
          <Button
            className="bg-red-500 hover:bg-red-700"
            onClick={() =>
              dispatch({
                type: 'remove',
                id: product.id,
              })
            }
          >
            <img className="w-6 h-6" src="/remove.svg" />
          </Button>
        ) : (
          <Button
            className="bg-lime-300 hover:bg-lime-500"
            onClick={() =>
              dispatch({
                type: 'add',
                id: product.id,
              })
            }
          >
            <img className="w-6 h-6" src="/add.svg" />
          </Button>
        )}
      </div>
    </Card>
  );
}

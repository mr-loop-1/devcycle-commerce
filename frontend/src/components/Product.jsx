import { useCart } from '@/contexts/CartProvider';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useVariableValue } from '@devcycle/react-client-sdk';
import { country as countryConfig } from '../../api/db/config';

export default function Product({ isSale, product, country }) {
  const shippingWaiver = useVariableValue('shipping-waiver', 'none');
  const { cart, dispatch } = useCart();

  return (
    <Card className="p-2 w-60 mb-2 flex-shrink-0 mr-3 md:mr-6 flex flex-col">
      <img src={`/products/${product.slug}.webp`} />
      <div className="flex w-full flex-col justify-between grow">
        <div className="">
          <span className="font-mono">{product.title}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="mt-1">
              {isSale ? (
                <span>
                  <span className="text-blue-700 font-semibold text-lg">
                    {countryConfig[country].currency}
                    {product.specs.salePrice.toFixed(2)}
                  </span>
                  <span className="ml-2 line-through text font-semibold">
                    {countryConfig[country].currency}
                    {product.specs.price.toFixed(2)}
                  </span>
                </span>
              ) : (
                <span className="font-semibold">
                  {countryConfig[country].currency}
                  {product.specs.price.toFixed(2)}
                </span>
              )}
            </span>
            <span className="text-sm text-orange-800">
              {product.specs.shippingType == 1 ? (
                <span>Free Shipping</span>
              ) : product.specs.shippingType == 2 ? (
                isSale && ['all', 'primary'].includes(shippingWaiver) ? (
                  <span className="line-through">
                    {countryConfig[country].currency}
                    {product.specs.cost.toFixed(2)} shipping
                  </span>
                ) : (
                  <span>
                    {countryConfig[country].currency}
                    {product.specs.cost.toFixed(2)} shipping
                  </span>
                )
              ) : isSale && shippingWaiver == 'all' ? (
                <span className="line-through">
                  {countryConfig[country].currency}
                  {product.specs.cost.toFixed(2)} shipping
                </span>
              ) : (
                <span>
                  {countryConfig[country].currency}
                  {product.specs.cost.toFixed(2)} shipping
                </span>
              )}
            </span>
            {isSale &&
              product.specs.shippingType == 2 &&
              ['all', 'primary'].includes(shippingWaiver) && (
                <span className="text-sm text-orange-800">Shipping Waived</span>
              )}
            {isSale &&
              product.specs.shippingType == 3 &&
              shippingWaiver == 'all' && (
                <span className="text-sm text-orange-800">Shipping Waived</span>
              )}
          </div>
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
      </div>
    </Card>
  );
}

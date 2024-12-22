import { shippingType } from '../../api/db/config.js';
import Product from './Product.jsx';
import { Button } from './ui/button.jsx';
import { Card } from './ui/card.jsx';

export default function CartProduct({
  isSale,
  product,
  shippingWaiver,
  dispatch,
}) {
  if (shippingWaiver)
    return (
      <Card className="p-2 mb-2 flex flex-col">
        <div className="flex">
          <div className="h-28 md:h-36 aspect-square ">
            <img
              className="w-full h-full object-contain rounded-2xl "
              src={`/products/${product.slug}.png`}
            />
          </div>
          <div className="ml-2 flex flex-col">
            <span className="">{product.title}</span>
            <span className="mt-1">
              {isSale ? (
                <span>
                  <span className="text-blue-700 font-semibold text-lg">
                    {product.specs.salePrice.toFixed(2)}
                  </span>
                  <span className="ml-2 line-through text font-semibold">
                    {product.specs.price.toFixed(2)}
                  </span>
                </span>
              ) : (
                <span className="font-semibold">
                  {product.specs.price.toFixed(2)}
                </span>
              )}
            </span>
            <span className="text-sm text-orange-800">
              {product.specs.shippingType == 1 ? (
                <span>Free Shipping</span>
              ) : product.specs.shippingType == 2 ? (
                isSale && ['high', 'medium'].includes(shippingWaiver) ? (
                  <span className="line-through">
                    {product.specs.cost.toFixed(2)} shipping
                  </span>
                ) : (
                  <span>{product.specs.cost.toFixed(2)} shipping</span>
                )
              ) : isSale && shippingWaiver == 'high' ? (
                <span className="line-through">
                  {product.specs.cost.toFixed(2)} shipping
                </span>
              ) : (
                <span>{product.specs.cost.toFixed(2)} shipping</span>
              )}
            </span>
            {isSale &&
              shippingType == 2 &&
              ['high', 'medium'].includes(shippingWaiver) && (
                <span>Shipping Waived in Sale</span>
              )}
            {isSale && shippingType == 3 && shippingWaiver == 'high' && (
              <span>Shipping Waived in Sale</span>
            )}
          </div>
        </div>
        <div
          onClick={() =>
            dispatch({
              type: 'remove',
              id: product.id,
            })
          }
          className="text-red-700 cursor-pointer w-full mt-2 hover:underline text-center"
        >
          Remove
        </div>
      </Card>
    );
}

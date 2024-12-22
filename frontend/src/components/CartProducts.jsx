import Product from './Product.jsx';
import { Button } from './ui/button.jsx';
import { Card } from './ui/card.jsx';

export default function CartProduct({ product, shippingWaiver, dispatch }) {
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
          <span className="">
            123 <span className="ml-1 line-through">312</span>
          </span>
          <span className="">
            {product.specs.shippingType == 1 || shippingWaiver == 'high' ? (
              <span>Free Shipping</span>
            ) : (
              <span>+{product.specs.cost}</span>
            )}
          </span>
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

import Product from './Product.jsx';
import { Button } from './ui/button.jsx';
import { Card } from './ui/card.jsx';

export default function CartProduct({ product, dispatch }) {
  return (
    <Card className="p-2 w-60 h-fit flex-shrink-0">
      <img src={`/products/${product.slug}.png`} />
      <div className="flex w-full justify-between">
        <div className="">weqda</div>
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
      </div>
    </Card>
  );
}

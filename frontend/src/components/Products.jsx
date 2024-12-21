import { useCart } from '@/contexts/CartProvider';
import { Button } from './ui/button';
import { Card } from './ui/card';

export default function Products({ category }) {
  // const cart = [2];
  const { cart, dispatch } = useCart();
  return (
    <div>
      <div className="">{category.title}</div>
      <div className="w-full flex overflow-x-auto">
        {category.products.map((product) => {
          return (
            <Card className="p-2 w-60 h-fit flex-shrink-0">
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
        })}
        {category.products.map((product) => {
          return (
            <Card className="p-2 w-60 h-60  flex-shrink-0">
              <img src={`/products/${product.slug}.png`} />
            </Card>
          );
        })}
        {category.products.map((product) => {
          return (
            <Card className="p-2 w-60 h-60  flex-shrink-0">
              <img src={`/products/${product.slug}.png`} />
            </Card>
          );
        })}
        {category.products.map((product) => {
          return (
            <Card className="p-2 w-60 h-60">
              <img src={`/products/${product.slug}.png`} />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

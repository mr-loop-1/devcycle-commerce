import { Card } from './ui/card';

export default function Products({ category }) {
  return (
    <div>
      <div className="">{category.title}</div>
      <div className="w-full flex overflow-x-auto">
        {category.products.map((product) => {
          return (
            <Card className="p-2 w-60 h-60 flex-shrink-0">
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

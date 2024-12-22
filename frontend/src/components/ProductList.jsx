import Product from './Product.jsx';

export default function ProductList({ isSale, data }) {
  return (
    <div id="plist">
      {data.map((category) => {
        return (
          <div>
            <div className="">{category.title}</div>
            <div className="w-full flex overflow-x-auto">
              {category.products.map((product) => {
                return <Product product={product} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

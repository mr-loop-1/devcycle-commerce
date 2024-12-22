import Product from './Product.jsx';

export default function ProductList({ isSale, data }) {
  return (
    <div id="plist">
      {data.map((category) => {
        return (
          <div className="my-4">
            <div className="">{category.title}</div>
            <div
              className="w-full flex overflow-x-auto"
              style={{ scrollbarWidth: 'thin' }}
            >
              {category.products.map((product) => {
                return <Product isSale={isSale} product={product} />;
              })}
              {/* {category.products.map((product) => {
                return <Product product={product} />;
              })}
              {category.products.map((product) => {
                return <Product product={product} />;
              })} */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

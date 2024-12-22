import Product from './Product.jsx';

export default function ProductList({ isSale, data }) {
  return (
    <div id="plist" className="mt-10">
      {data.map((category) => {
        return (
          <div className="mt-6 md:mt-10" id={`category-${category.id}`}>
            <div className="text-xl font-semibold text-blue-800">
              {category.title}
            </div>
            <div
              className="w-full flex overflow-x-auto mt-4"
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

import Products from './Products';

export default function ProductList() {
  // const products = await productAPi
  const categories = [
    {
      categoryId: 1,
      title: 'shorts',
      products: [
        {
          id: 1,
          slug: 1,
          name: 'watch',
          price: 123,
        },
        {
          id: 2,
          slug: 2,
          name: 'shirt',
          price: 31,
        },
      ],
    },
    {
      categoryId: 2,
      title: 'jeans',
      products: [
        {
          id: 3,
          slug: 3,
          name: 'watchos',
          price: 12321,
        },
        {
          id: 4,
          slug: 4,
          name: 'shidasrt',
          price: 311,
        },
      ],
    },
  ];

  return (
    <div id="plist">
      {categories.map((category) => {
        return <Products category={category} />;
      })}
    </div>
  );
}

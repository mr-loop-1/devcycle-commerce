export default products = [
  {
    id: 1,
    categoryId: 1,
    title: "Men's Cotton Dark Blue Shirt",
    slug: 1,
    available: ['IN', 'CA'],
    specs: {
      // for India only, then use multiplicant
      price: 199.0,
      discount: 25.25,
      salePrice: 174.75,
      shippingType: 3,
      cost: 23,
    },
    stock: {
      // for each country
      IN: 123,
      CA: 132,
    },
  },
  {
    id: 2,
    categoryId: 1,
    title: 'Mens Plain Cotton Sky Blue Shirt',
    slug: 2,
    available: [],
    specs: {},
    stock: {},
  },
  {
    id: 3,
    categoryId: 1,
    title: 'Mens Designer Textured Short - White',
    slug: 3,
    available: [],
    specs: {},
    stock: {},
  },
  {
    id: 4,
    categoryId: 2,
    title: 'Dual Color Leather Shoes - Dark Blue, White',
    slug: 4,
    available: [],
    specs: {},
    stock: {},
  },
  {
    id: 5,
    categoryId: 2,
    title: 'Dual Tone Leather Shoes - High Sole - Orange',
    slug: 5,
    available: [],
    specs: {},
    stock: {},
  },
  {
    id: 6,
    categoryId: 2,
    title: 'Trendy Sneakers - Dual Blue Contrast',
    slug: 6,
    available: [],
    specs: {},
    stock: {},
  },
  {
    id: 7,
    categoryId: 3,
    title: 'Mens Standard Bracelet Silver Gold',
    slug: 7,
    available: [],
    specs: {},
    stock: {},
  },
  {
    id: 8,
    categoryId: 3,
    title: 'Leather Strap Premium Keyring - 987',
    slug: 8,
    available: [],
    specs: {},
    stock: {},
  },
  {
    id: 9,
    categoryId: 3,
    title: 'Light Double String Bracelet with Silver Joint',
    slug: 9,
    available: [],
    specs: {},
    stock: {},
  },
];

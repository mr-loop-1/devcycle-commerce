import products from '../db/products';
import categories from '../db/categories';
import { currencyMultiplicant, country } from '../db/config';

export const getAllProductsAndCategories = (req) => {
  const { country, isSale, sortAlgorithm, shippingCost } = req;
  /*
    1. filter products available in the country
    2. convert to correct currency
    3. choose the categories featured
    4. sort the categories list
    5. sort products list
  */
  const productsData = products.filter((product) =>
    product.available.includes(country)
  );

  for (const product of productsData) {
    const specs = {
      price: product.price * currencyMultiplicant[country],
      shippingType: product.shippingType,
      cost: product.cost * currencyMultiplicant[country],
    };
    if (isSale) {
      specs.discount = product.discount * currencyMultiplicant[country];
      specs.salePrice = product.salePrice * currencyMultiplicant[country];
    }
    product.specs = specs;
  }

  const categoriesData = categories;

  return categoriesData.map((category) => {
    return {
      ...category,
      products: products.filter(
        (product) => product.categoryId === category.id
      ),
    };
  });
};

export const getRecommendedProducts = (req) => {
  const { country, isSale, recommendAlgo } = req;
  /*
  1. filter products available in the country
  2. get the products to feature
  3. convert curreny to local
  */
  const productsData = products.slice(0, 3);

  for (const product of productsData) {
    const specs = {
      price: product.price * currencyMultiplicant[country],
      shippingType: product.shippingType,
      cost: product.cost * currencyMultiplicant[country],
    };
    if (isSale) {
      specs.discount = product.discount * currencyMultiplicant[country];
      specs.salePrice = product.salePrice * currencyMultiplicant[country];
    }
    product.specs = specs;
  }

  return productsData;
};

export const getCartSpecs = (req) => {
  /*
    1. check if is sale is true
    2. then check shippping streategy
    3. group the cost
  */
  const { country, isSale, shippingStrategy, products } = req;
  const price = {
    mrp: products.reduce((price, currentProduct) => {
      return price + currentProduct.specs.price;
    }, 0),
    ...(isSale && {
      discount: products.reduce((price, currentProduct) => {
        return price + currentProduct.specs.discount;
      }, 0),
    }),
    ...(isSale && {
      salePrice: products.reduce((price, currentProduct) => {
        return price + currentProduct.specs.salePrice;
      }, 0),
    }),
    // check sale and streategy here
    shippingCost: products.reduce((price, currentProduct) => {
      return price + currentProduct.specs.cost;
    }, 0),
  };

  return price;
};

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
  const specs = {
    price: productsData.price * currencyMultiplicant[country],
    shippingType: productsData.shippingType,
    cost: productsData.cost * currencyMultiplicant[country],
  };
  if (isSale) {
    specs.discount = productsData.discount * currencyMultiplicant[country];
    specs.salePrice = productsData.salePrice * currencyMultiplicant[country];
  }
  productsData.specs = specs;

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

export const recommendAlgo = () => {};

export const sortAlgo = () => {};

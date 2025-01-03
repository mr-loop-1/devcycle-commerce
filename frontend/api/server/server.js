import { products } from '../db/products';
import { categories } from '../db/categories';
import { currencyMultiplicant, country } from '../db/config';

export const getAllProductsAndCategories = (req) => {
  const { country, isSale, sortStrategy } = req;
  /*
    1. filter products available in the country
    2. convert to correct currency
    3. choose the categories featured
    4. sort the categories list
    5. sort products list
  */
  const productsData = structuredClone(products).filter((product) =>
    product.available.includes(country)
  );

  for (const product of productsData) {
    const specs = {
      price: product.specs.price * currencyMultiplicant[country],
      shippingType: product.specs.shippingType,
      cost: product.specs.cost * currencyMultiplicant[country],
    };
    if (isSale) {
      specs.salePrice = product.specs.salePrice * currencyMultiplicant[country];
      specs.saleProfit =
        product.specs.saleProfit * currencyMultiplicant[country];
    }
    product.specs = specs;
  }

  const categoriesData = structuredClone(categories).map((category) => {
    return {
      ...category,
      products: productsData.filter(
        (product) => product.categoryId === category.id
      ),
    };
  });

  if (!isSale) {
    return categoriesData;
  }

  for (const category of categoriesData) {
    category.profitPerItem = Math.floor(
      category.products.reduce(
        (accumulator, current) => accumulator + current.specs.saleProfit,
        0
      ) / category.products.length
    );
    category.stockPerItem = Math.floor(
      category.products.reduce(
        (accumulator, current) => accumulator + current.stock[country],
        0
      ) / category.products.length
    );
  }

  if (sortStrategy == 'profit') {
    categoriesData.sort((categoryA, categoryB) => {
      return categoryB.profitPerItem - categoryA.profitPerItem;
    });
    for (const category of categoriesData) {
      category.products.sort((productA, productB) => {
        return productB.specs.saleProfit - productA.specs.saleProfit;
      });
    }
  } else if (sortStrategy == 'stock') {
    categoriesData.sort((categoryA, categoryB) => {
      return categoryB.stockPerItem - categoryA.stockPerItem;
    });
    for (const category of categoriesData) {
      category.products.sort((productA, productB) => {
        return productB.stock[country] - productA.stock[country];
      });
    }
  }

  return categoriesData;
};

export const getRecommendedProducts = (req) => {
  const { country, cart, isSale, recommendStrategy } = req;
  /*
  1. filter products available in the country
  2. get the products to feature
  3. convert curreny to local
  */
  let productsData = structuredClone(products).filter(
    (prod) => !cart.includes(prod.id)
  );

  let arr = [];
  while (arr.length < 8) {
    var r = Math.floor(Math.random() * (productsData.length - 1)) + 1;
    if (arr.indexOf(r) === -1 && r) arr.push(r);
  }

  productsData = productsData.filter((prod, i) => arr.includes(i));

  for (const product of productsData) {
    const specs = {
      price: product.specs.price * currencyMultiplicant[country],
      shippingType: product.specs.shippingType,
      cost: product.specs.cost * currencyMultiplicant[country],
    };
    if (isSale) {
      specs.salePrice = product.specs.salePrice * currencyMultiplicant[country];
      specs.saleProfit =
        product.specs.saleProfit * currencyMultiplicant[country];
    }
    product.specs = specs;
  }

  if (!isSale) {
    return productsData;
  }

  if (recommendStrategy == 'profit') {
  } else if (recommendStrategy == 'stock') {
  }

  return productsData;
};

export const getCartSpecs = (req) => {
  /*
    1. check if is sale is true
    2. then check shippping streategy
    3. group the cost
  */
  const { country, isSale, shippingWaiver, cartProducts } = req;

  if (!cartProducts.length) return {};

  const productsData = structuredClone(products).filter((product) =>
    cartProducts.includes(product.id)
  );
  for (const product of productsData) {
    const specs = {
      price: product.specs.price * currencyMultiplicant[country],
      shippingType: product.specs.shippingType,
      cost: product.specs.cost * currencyMultiplicant[country],
    };
    if (isSale) {
      specs.salePrice = product.specs.salePrice * currencyMultiplicant[country];
      specs.saleProfit =
        product.specs.saleProfit * currencyMultiplicant[country];
    }
    product.specs = specs;
  }
  const priceData = {
    mrp: productsData.reduce((accumulator, currentProduct) => {
      return accumulator + currentProduct.specs.price;
    }, 0),
    ...(isSale && {
      salePrice: productsData.reduce((accumulator, currentProduct) => {
        return accumulator + currentProduct.specs.salePrice;
      }, 0),
    }),
    // check sale and streategy here
    shippingCost: productsData.reduce((accumulator, currentProduct) => {
      return accumulator + currentProduct.specs.cost;
    }, 0),
    ...(shippingWaiver == 'primary' && {
      discountedShipping: productsData.reduce((accumulator, currentProduct) => {
        return (
          accumulator +
          (currentProduct.specs.shippingType == 3
            ? currentProduct.specs.cost
            : 0)
        );
      }, 0),
    }),
  };

  return { priceData, productsData };
};

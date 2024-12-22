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

  const categoriesData = categories.map((category) => {
    return {
      ...category,
      products: products.filter(
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
        (price, current) => price + current.specs.saleProfit,
        0
      ) / category.products.length
    );

    category.stockPerItem = Math.floor(
      category.products.reduce(
        (stock, current) => stock + current.stock[country],
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
  const { country, isSale, recommendStrategy } = req;
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
  const { country, isSale, shippingWaiver, products } = req;
  const priceData = {
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
    ...(shippingWaiver == 'medium' && {
      discountedShipping: products.reduce((price, currentProduct) => {
        return (
          price +
          (currentProduct.specs.shippingType == 3
            ? currentProduct.specs.cost
            : 0)
        );
      }, 0),
    }),
  };

  return priceData;
};

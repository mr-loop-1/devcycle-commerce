export const shippingType = {
  1: 'Free',
  2: 'Primary',
  3: '3rd Party',
};

export const country = {
  IN: {
    name: 'India',
    currency: '₹',
    slug: 1,
  },
  CA: {
    name: 'Canada',
    currency: 'C$ ',
    slug: 2,
  },
  AE: {
    name: 'Dubai',
    currency: 'AED',
    slug: 3,
  },
  CN: {
    name: 'China',
    currency: '¥',
    slug: 4,
  },
  US: {
    name: 'USA',
    currency: '$',
    slug: 5,
  },
  JP: {
    name: 'Japan',
    currency: '¥',
    slug: 6,
  },
  GB: {
    name: 'Britain',
    currency: '£',
    slug: 7,
  },
};

export const countryArray = ['IN', 'CA', 'US', 'JP', 'AE', 'CN', 'GB'];

export const currencyMultiplicant = {
  IN: 1,
  CA: 0.017,
  AE: 1,
  CN: 1,
  US: 1,
  JP: 1,
  GB: 1,
};

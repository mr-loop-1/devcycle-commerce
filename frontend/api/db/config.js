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
    currency: '$',
    slug: 2,
  },
  AE: {
    name: 'UAE',
    currency: 'AED ',
    slug: 5,
  },
  CN: {
    name: 'China',
    currency: '¥',
    slug: 6,
  },
  US: {
    name: 'USA',
    currency: '$',
    slug: 3,
  },
  JP: {
    name: 'Japan',
    currency: '¥',
    slug: 4,
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
  AE: 0.043,
  CN: 0.086,
  US: 0.012,
  JP: 1.85,
  GB: 0.0093,
};

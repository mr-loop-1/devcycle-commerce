export const config = {
  countries: {
    in: 'India',
    us: 'USA',
    ca: 'Canada',
    ae: 'UAE',
    cn: 'China',
    jp: 'Japan',
    gb: 'Britain',
  },
  countriesArray: ['in', 'ca', 'ae', 'cn', 'us', 'jp', 'gb'],
  country: {
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
  },
  currencyMultiplicant: {
    IN: 1,
    CA: 0.017,
    AE: 1,
    CN: 1,
    US: 1,
    JP: 1,
    GB: 1,
  },
};

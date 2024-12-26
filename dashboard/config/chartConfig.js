export const chartConfig = {
  variableToChart: {
    'cart-page': 'cart-abandon',
    'chatbot-status': 'complaint',
    'recommend-page': 'cart-abandon',
    'sort-strategy': 'stock-cancel',
    'shipping-waiver': 'checkout-abandon',
  },
  chartToIdx: {
    // sales: 0,
    // profits: 1,
    complaint: 0,
    'cart-abandon': 2,
    'checkout-abandon': 1,
    'stock-cancel': 3,
  },
  multiplicant: {
    sales: 1000,
    profits: 10000,
  },
};

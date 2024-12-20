const { useReducer } = require('react');

function cartReducer(cart, action) {
  switch (action.type) {
    case 'add': {
      return [...cart, action.id];
    }
    case 'remove': {
      return cart.filter((c) => c !== action.id);
    }
    default: {
      console.error('unkown action');
    }
  }
}

export const [cart, dispatch] = useReducer(
  cartReducer,
  localStorage.getItem('cart') || []
);

export default function cartReducer(cart, action) {
  switch (action.type) {
    case 'add': {
      localStorage.setItem('cart', JSON.stringify([...cart, action.id]));
      return [...cart, action.id];
    }
    case 'remove': {
      const newCart = cart.filter((c) => c !== action.id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    }
    case 'clear': {
      localStorage.setItem('cart', '[]');
      return [];
    }
    default: {
      console.error('unkown action');
    }
  }
}

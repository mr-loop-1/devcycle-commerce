export default function cartReducer(cart, action) {
  switch (action.type) {
    case 'add': {
      localStorage.setItem('cart', [...cart, action.id]);
      return [...cart, action.id];
    }
    case 'remove': {
      const newCart = cart.filter((c) => c !== action.id);
      localStorage.setItem('cart', newCart);
      return newCart;
    }
    default: {
      console.error('unkown action');
    }
  }
}

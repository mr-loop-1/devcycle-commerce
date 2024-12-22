import { useVariableValue } from '@devcycle/react-client-sdk';
import react from 'react';
import CartDrawer from './Cart';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartProvider';
import { useCountry } from '@/contexts/CountryProvider';

export default function Header() {
  const isSale = useVariableValue('sale-active', false);
  const cartPage = useVariableValue('cart-page', false);
  const recommendPage = useVariableValue('recommend-page', true);
  const shippingWaiver = useVariableValue('shipping-waiver', true);

  const { cart, dispatch } = useCart();
  const { country } = useCountry();

  let navBannerPath = isSale ? '/sale/banner.jpg' : '/navBanner.jpg';

  return (
    <div>
      <div
        className="top-0 left-0 h-24 w-full flex"
        style={{ backgroundImage: `url(${navBannerPath})` }}
      >
        <div id="sitelogo"></div>
        <div id="country selector"></div>
        {cartPage ? (
          <Link to={recommendPage ? '/recommend' : '/cart'}>Cart</Link>
        ) : (
          <CartDrawer
            cart={cart}
            country={country}
            isSale={isSale}
            shippingWaiver={shippingWaiver}
          />
        )}
      </div>
    </div>
  );
}

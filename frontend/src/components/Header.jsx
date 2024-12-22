import { useVariableValue } from '@devcycle/react-client-sdk';
import react from 'react';
import CartDrawer from './Cart';
import { Link } from 'react-router-dom';

export default function Header() {
  const saleActiveFlag = useVariableValue('sale-active', false);
  const separateCartPageFlag = useVariableValue('cart-page', true);
  const recommendPageFlag = useVariableValue('recommend-page', true);
  const shippingWaiver = useVariableValue('shipping-waiver', true);

  let navBannerPath = saleActiveFlag ? '/sale/banner.jpg' : '/navBanner.jpg';

  return (
    <div>
      <div
        className="top-0 left-0 h-24 w-full flex"
        style={{ backgroundImage: `url(${navBannerPath})` }}
      >
        <div id="sitelogo"></div>
        <div id="country selector"></div>
        {separateCartPageFlag ? (
          <Link to={recommendPageFlag ? '/recommend' : '/cart'}>Cart</Link>
        ) : (
          <CartDrawer />
        )}
      </div>
    </div>
  );
}

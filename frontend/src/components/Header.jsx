import { useVariableValue } from '@devcycle/react-client-sdk';
import react from 'react';
import CartDrawer from './Cart';

export default function Header() {
  const saleActiveFlag = useVariableValue('sale-active', false);
  const separateCartPageFlag = useVariableValue('separate-cart-page', false);

  let navBannerPath = saleActiveFlag ? '/sale/banner.jpg' : '/navBanner.jpg';

  return (
    <div>
      <div
        className="top-0 left-0 h-24 w-full flex"
        style={{ backgroundImage: `url(${navBannerPath})` }}
      >
        <div id="sitelogo"></div>
        <div id="country selector"></div>
        {separateCartPageFlag ? <span>Cart</span> : <CartDrawer />}
      </div>
    </div>
  );
}

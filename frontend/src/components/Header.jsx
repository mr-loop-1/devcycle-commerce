import { useVariableValue } from '@devcycle/react-client-sdk';
import react from 'react';
import CartDrawer from './Cart';
import { Link, redirect, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartProvider';
import { useCountry } from '@/contexts/CountryProvider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { country as countryConfig, countryArray } from '../../api/db/config';
import { ShoppingBag } from 'lucide-react';

export default function Header() {
  const isSale = useVariableValue('sale-status', false);
  console.log('🚀 ~ Header ~ isSale:', isSale);
  const cartPage = useVariableValue('cart-page', false);
  const recommendPage = useVariableValue('recommend-page', false);
  const shippingWaiver = useVariableValue('shipping-waiver', 'medium');

  const { cart, dispatch } = useCart();
  const { country } = useCountry();

  const location = useLocation();
  let dynamicCartPath = '/recommend';

  if (location.pathname == '/recommend' || location.pathname == '/cart') {
    dynamicCartPath = '/cart';
  }

  let navBannerPath = isSale ? '/sale/banner.jpg' : '/navBanner.jpg';

  const setCountry = (val) => {
    localStorage.setItem('country', val);
    dispatch({
      type: 'clear',
    });
    window.location.reload();
  };

  return (
    <div className="top-0 sticky bg-white mx-4 md:mx-auto md:w-[80%] lg:w-[70%] shadow-2xl">
      <div
        className="mt-2 h-24 w-full flex justify-between items-center border-b-2"
        // style={{ backgroundImage: `url(${navBannerPath})` }}
      >
        <div id="sitelogo" className="ml-2 mt-2">
          <Link to="/">
            <img src={`/commerce.png`} className="inline h-14" />
            <span className="font-bold text-2xl ml-2">
              <span className="text-blue-700">DevCycle</span>{' '}
              <span className="text-red-600">
                {isSale ? <>live sale</> : <>commerce</>}
              </span>
            </span>
          </Link>
        </div>
        <div className="flex mt-2">
          <div id="country selector" className="ml-2 mr-3 shadow-lg">
            <Select onValueChange={setCountry}>
              <SelectTrigger className="">
                <SelectValue
                  placeholder=<>
                    <img
                      src={`/countries/${countryConfig[country].slug}.svg`}
                      className="inline h-5 w-5 mr-2"
                    />
                    {countryConfig[country].name}
                  </>
                />
              </SelectTrigger>
              <SelectContent>
                {countryArray
                  .filter((c) => c != country)
                  .map((c) => {
                    // slug here too
                    return (
                      <SelectItem value={c} className="cursor-pointer">
                        <img
                          src={`/countries/${countryConfig[c].slug}.svg`}
                          className="inline h-5 w-5 mr-2"
                        />
                        {countryConfig[c].name}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          </div>
          <span className="mr-3 mt-2">
            {cartPage ? (
              <Link
                className="relative"
                to={isSale && recommendPage ? dynamicCartPath : '/cart'}
              >
                <ShoppingBag className="h-7 w-7" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-black font-bold dark:bg-coffee-light text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            ) : (
              <CartDrawer
                cart={cart}
                country={country}
                isSale={isSale}
                shippingWaiver={shippingWaiver}
              />
            )}
          </span>
        </div>
      </div>
      {isSale && <div className="w-full h-3 bg-green-300"></div>}
      {isSale && shippingWaiver == 'medium' && (
        <div className="w-full h-3 bg-blue-300"></div>
      )}
      {isSale && shippingWaiver == 'high' && (
        <div className="w-full h-3 bg-red-300"></div>
      )}
      {isSale && <hr className="mt-4" />}
    </div>
  );
}

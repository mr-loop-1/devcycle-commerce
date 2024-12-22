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
  const isSale = useVariableValue('sale-active', false);
  const cartPage = useVariableValue('cart-page', false);
  const recommendPage = useVariableValue('recommend-page', true);
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
    <div className="mx-4 md:mx-auto md:w-[80%] lg:w-[70%]">
      <div
        className="h-24 w-full flex justify-between items-center border-b-2"
        // style={{ backgroundImage: `url(${navBannerPath})` }}
      >
        <div id="sitelogo">
          <Link to="/">
            <img src={`/commerce.png`} className="inline h-14" />
          </Link>
        </div>
        <div className="flex">
          <div id="country selector">
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
                      <SelectItem value={c}>
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

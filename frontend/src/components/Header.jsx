import { useVariableValue } from '@devcycle/react-client-sdk';
import react from 'react';
import CartDrawer from './Cart';
import { Link, redirect } from 'react-router-dom';
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

export default function Header() {
  const isSale = useVariableValue('sale-active', false);
  const cartPage = useVariableValue('cart-page', false);
  const recommendPage = useVariableValue('recommend-page', true);
  const shippingWaiver = useVariableValue('shipping-waiver', true);

  const { cart, dispatch } = useCart();
  const { country } = useCountry();

  let navBannerPath = isSale ? '/sale/banner.jpg' : '/navBanner.jpg';

  const setCountry = (val) => {
    // console.log('🚀 ~ setCountry ~ e:', e);
    localStorage.setItem('country', val);
    dispatch({
      type: 'clear',
    });
    window.location.reload();
  };

  return (
    <div className="mx-auto md:w-[80%] lg:w-[70%]">
      <div
        className="h-24 w-full flex justify-between items-center bg-red-100"
        // style={{ backgroundImage: `url(${navBannerPath})` }}
      >
        <div id="sitelogo">logo</div>
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
    </div>
  );
}

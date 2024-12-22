import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Card } from './ui/card';
import CartProduct from './CartProducts';
import { useCart } from '@/contexts/CartProvider';
import { getCartValue } from '../../api/api';
import { ShoppingBag } from 'lucide-react';
import { country as countryConfig } from '../../api/db/config';

export default function CartDrawer({ cart, country, isSale, shippingWaiver }) {
  const { dispatch } = useCart();

  const cartData = getCartValue({
    isSale,
    country,
    shippingWaiver,
    cartProducts: cart,
  });

  return (
    <Sheet className="w-96">
      <SheetTrigger aria-describedby="kjsdna" asChild>
        <button className="relative">
          <ShoppingBag className="h-7 w-7" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-2 font-bold bg-black dark:bg-coffee-light text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="min-w-[90%] md:min-w-[25%]">
        <SheetHeader>
          <SheetTitle>My Cart ({cart.length})</SheetTitle>
        </SheetHeader>

        {cart.length ? (
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col overflow-y-auto h-[80%] my-4 shadow-inner no-scrollbar">
              {cartData.productsData.map((product) => {
                return (
                  <CartProduct
                    isSale={isSale}
                    product={product}
                    shippingWaiver={shippingWaiver}
                    dispatch={dispatch}
                    country={country}
                  />
                );
              })}
            </div>
            {isSale && (
              <div className="p-2 bg-lime-300 font-mono rounded-xl">
                Congratulations, you have saved{' '}
                {(
                  cartData.priceData.mrp - cartData.priceData.salePrice
                ).toFixed(2)}{' '}
                on this order
              </div>
            )}
            {isSale &&
              shippingWaiver == 'medium' &&
              (cartData.priceData.shippingCost !=
              cartData.priceData.discountedShipping ? (
                <div className="bg-blue-300 h-3">congr</div>
              ) : (
                <div className="bg-blue-300 h-3">sory</div>
              ))}
            {isSale &&
              shippingWaiver == 'high' &&
              (cartData.priceData.shippingCost ? (
                <div className="bg-red-300 h-3">congrats</div>
              ) : (
                <div className="bg-red-300 h-3">sryy</div>
              ))}
            <Card className="mt-2 mb-6 md:mb-10">
              <div id="cart-drawer-cost" className="flex flex-col mx-2">
                <span className="flex justify-between">
                  <span>Cart Value</span>
                  <span>
                    {countryConfig[country].currency}
                    {cartData.priceData.mrp.toFixed(2)}
                  </span>
                </span>
                {isSale && (
                  <span className="flex justify-between">
                    <span className="">Sale Discount</span>
                    <span>
                      {countryConfig[country].currency}-
                      {(
                        cartData.priceData.mrp - cartData.priceData.salePrice
                      ).toFixed(2)}
                    </span>
                  </span>
                )}

                <span className="flex justify-between">
                  <span>Shipping Charges</span>
                  <span>
                    {countryConfig[country].currency}
                    {cartData.priceData.shippingCost.toFixed(2)}
                  </span>
                </span>
                {isSale &&
                  shippingWaiver == 'medium' &&
                  cartData.priceData.shippingCost !=
                    cartData.priceData.discountedShipping && (
                    <span className="flex justify-between">
                      <span>Shipping Discount</span>
                      <span>
                        {countryConfig[country].currency}-
                        {(
                          cartData.priceData.shippingCost -
                          cartData.priceData.discountedShipping
                        ).toFixed(2)}
                      </span>
                    </span>
                  )}
                {isSale &&
                  shippingWaiver == 'high' &&
                  cartData.priceData.shippingCost != 0 && (
                    <span className="flex justify-between">
                      <span>Shipping Discount</span>
                      <span>
                        {countryConfig[country].currency}-
                        {cartData.priceData.shippingCost.toFixed(2)}
                      </span>
                    </span>
                  )}
                <span className="flex justify-between text-2xl font-semibold">
                  <span className="">Total Cost:</span>
                  <span>
                    {countryConfig[country].currency}
                    {(isSale
                      ? shippingWaiver == 'normal'
                        ? cartData.priceData.salePrice +
                          cartData.priceData.shippingCost
                        : shippingWaiver == 'medium'
                        ? cartData.priceData.salePrice +
                          cartData.priceData.discountedShipping
                        : cartData.priceData.salePrice +
                          cartData.priceData.shippingCost
                      : cartData.priceData.mrp + cartData.priceData.shippingCost
                    ).toFixed(2)}
                  </span>
                </span>
              </div>
            </Card>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xl font-bold">Nothing in the Cart Yet</span>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

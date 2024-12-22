import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Card } from './ui/card';
import CartProduct from './CartProducts';
import { useCart } from '@/contexts/CartProvider';
import { getCartValue } from '../../api/api';

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
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent className="min-w-[90%] md:min-w-[25%]">
        <SheetHeader>
          <SheetTitle>My Cart ({cart.length})</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col overflow-y-auto h-[80%] my-4 py-4 shadow-inner no-scrollbar">
            {cartData.productsData.map((product) => {
              return (
                <CartProduct
                  product={product}
                  shippingWaiver={shippingWaiver}
                  dispatch={dispatch}
                />
              );
            })}
          </div>
          <div className="p-2 bg-lime-300 font-mono rounded-xl">
            Congratulations, you have saved {cartData.priceData.discount} on
            this order
          </div>
          <Card className="mt-2 mb-6 md:mb-10">
            <div
              id="cart-drawer-cost"
              className="flex flex-col font-mono  mx-2"
            >
              <span className="flex justify-between">
                <span>Total MRP:</span>
                <span>{cartData.priceData.mrp}</span>
              </span>
              <span className="flex justify-between">
                <span className="">Sale Discount:</span>
                <span>{cartData.priceData.mrp}</span>
              </span>
              <span className="flex justify-between">
                <span>Shipping Charges:</span>
                <span>{cartData.priceData.mrp}</span>
              </span>
              <span className="flex justify-between">
                <span>Shipping Discount: </span>
                <span>{cartData.priceData.mrp}</span>
              </span>
              <span className="flex justify-between text-2xl font-semibold">
                <span className="">Total Cost:</span>
                <span>{cartData.priceData.mrp}</span>
              </span>
            </div>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}

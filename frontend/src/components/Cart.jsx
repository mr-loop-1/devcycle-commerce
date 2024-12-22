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
import { useVariableValue } from '@devcycle/react-client-sdk';
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full justify-between">
          <div id="cart-items" className=""></div>
          <Card id="cart-price-and-coupons" className="mb-2">
            <div className="">
              {cartData.productsData.map((product) => {
                return <CartProduct product={product} dispatch={dispatch} />;
              })}
            </div>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}

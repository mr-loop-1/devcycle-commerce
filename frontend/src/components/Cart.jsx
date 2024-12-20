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

export default function CartDrawer({ triggerCart, country }) {
  const cart = [1, 2, 3];

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
              Price:
              <br />
              jndjqwkn
              <br />
              jkdmw
            </div>
          </Card>
        </div>

        {/* <SheetFooter className="">
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}

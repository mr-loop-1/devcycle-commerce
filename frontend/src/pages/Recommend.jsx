import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function RecommendPage() {
  return (
    <div>
      <div className="flex justify-around">
        <div className="">
          some recommendations that you may want to add to your cart"
        </div>
        <Link to="/cart">Continue to cart...</Link>
      </div>
      <div id="recommended-products"></div>
    </div>
  );
}

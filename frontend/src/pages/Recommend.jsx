import { Button } from '@/components/ui/button';
import { Link, redirect } from 'react-router-dom';

export default function RecommendPage() {
  const saleActiveFlag = useVariableValue('sale-active', false);
  const recommendPageFlag = useVariableValue('recommend-page', false);
  const recommendStrategy = useVariableValue('recommend-strategy', null);
  const chatbot = useVariableValue('chatbot', false);

  if (!saleActiveFlag || !recommendPageFlag) {
    redirect('/');
  }

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

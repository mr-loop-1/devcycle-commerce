import { chartConfig } from './../../config/chartConfig';

export default function checkQueryValidity(newCharts, queryJson, i) {
  if (
    queryJson.normalCause.chart == 'complaint' ||
    queryJson.normalCause.chart == 'cart-abandon' ||
    queryJson.normalCause.chart == 'checkout-abandon'
  ) {
    const chart = newCharts.find(
      (ch) => ch.chart == queryJson.normalCause.chart
    );
    if (chart.value > queryJson.normalCause.value) {
      return true;
    } else {
      return false;
    }
  }

  return false;
}

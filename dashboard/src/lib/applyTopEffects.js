import { chartConfig } from '../../config/chartConfig';
import variationJson from './../../data/variations.json';

export default function applyTopEffects(newCharts, featureStateIn) {
  // chart[0] - stock

  let acc = 0;

  for (const fs of Object.entries(featureStateIn)) {
    // for (const variable of variationJson[fs.served.key].variables) {
    // if (variables) {
    //   // check if it has an effect
    //   acc += multiplicant * effectOfVariable;
    // }
    // }
  }

  // newCharts[0].push(newCharts[0][newCharts[0].length - 1] + acc);

  // chart[1] - profit
  acc = 0;

  for (const fs of Object.entries(featureStateIn)) {
    // for (const variable of variationJson[fs.served.key].variables) {
    // if (variables) {
    //   // check if it has an effect
    //   acc += multiplicant * effectOfVariable;
    // }
    // }
  }

  // newCharts[1].push(newCharts[1][newCharts[1].length - 1] + acc);
  return [
    newCharts[0].value[newCharts[0].value.length - 1] + acc,
    newCharts[1].value[newCharts[1].value.length - 1] + acc,
  ];
}

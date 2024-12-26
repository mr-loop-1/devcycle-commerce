import { chartConfig } from '../../config/chartConfig';

export default function applyChartEffects(variable, newCharts, charts) {
  const chart = chartConfig.variableToChart[variable.key];
  if (!chart) {
    return;
  }

  if (chart == 'complaint') {
    // tolerate 500
    if (variable.value) {
      newCharts[0].value = Math.floor(Math.random() * (799 - 250 + 1)) + 250;
    } else {
      newCharts[0].value = Math.floor(Math.random() * (199 - 60 + 1)) + 60;
    }
  }
  if (chart == 'cart-abandon') {
    // 50 - 400, 550-800, 900-1200

    if (variable.value) {
      if (variable.value < 500) {
        newCharts[2].value = Math.floor(Math.random() * (800 - 550 + 1)) + 550;
      } else {
        newCharts[2].value = Math.floor(Math.random() * (1200 - 900 + 1)) + 900;
      }
    } else {
      if (variable.value < 500) {
        newCharts[2].value = Math.floor(Math.random() * (400 - 50 + 1)) + 50;
      } else {
        newCharts[2].value = Math.floor(Math.random() * (800 - 550 + 1)) + 550;
      }
    }
  }
  if (chart == 'checkout-abandon') {
    if (variable.value == 'none') {
      newCharts[1].value = Math.floor(Math.random() * (300 - 150 + 1)) + 150;
    } else if (variable.value == 'primary') {
      newCharts[1].value = Math.floor(Math.random() * (140 - 70 + 1)) + 70;
    } else {
      newCharts[1].value = Math.floor(Math.random() * (95 - 20 + 1)) + 20;
    }
  }
  if (chart == 'stock-cancel') {
    if (variable.value == 'profit') {
      newCharts[3].value = Math.floor(Math.random() * (200 - 70 + 1)) + 70;
    } else if (variable.value == 'popular') {
      newCharts[3].value = Math.floor(Math.random() * (330 - 150 + 1)) + 150;
    } else {
      newCharts[3].value = Math.floor(Math.random() * (49 - 6 + 1)) + 6;
    }
  }
}

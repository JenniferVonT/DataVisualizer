/**
 * A module that creates pie charts.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module src/chartModules/pieChart.js
 * @version 1.0.0
 */

import { Chart } from './chart.js'

export class PieChart extends Chart {
  constructor (globalOptions, dataPoints) {
    super(globalOptions, dataPoints) 
  }

  _buildChart() {}
}
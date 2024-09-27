/**
 * A module that creates column charts.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module src/chartModules/columnChart.js
 * @version 1.0.0
 */

import { Chart } from './chart.js'

export class ColumnChart extends Chart {
  _dataPointLimit

  constructor (globalOptions, dataPoints) {
    super(globalOptions, dataPoints) 

    this._dataPointLimit = 5
  }

  _buildChart() {}
}
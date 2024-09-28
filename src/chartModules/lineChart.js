/**
 * A module that creates line charts.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module src/chartModules/lineChart.js
 * @version 1.0.0
 */

import { Chart } from './chart.js'

export class LineChart extends Chart {
  _dataPointLimit

  constructor (globalOptions, dataPoints) {
    super(globalOptions, dataPoints) 

    this._dataPointLimit = 10
  }

  _drawChart () {}
}
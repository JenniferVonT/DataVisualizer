/**
 * A module that creates line-, column- and piecharts to visualize data.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module src/dataVisualizer.js
 * @version 1.0.0
 */

import { ErrorHandler } from './errorHandler.js'

export class DataVisualizer {
  #globalOptions

  constructor () {
    this.#globalOptions = {
      color: 'blue',
      width: '300',
      height: '200'
    }
  }

  /**
   * All the size options are in pixels.
   *
   * @param {Object} options - { color: 'blue/green/red/yellow', width: '', height: '' }
   */
  setGlobalOptions (options) {
    if (this.#isOptionsCorrect(options)) {
      this.#globalOptions = options
    }
  }

  #isOptionsCorrect (options) {
    const error = new Error()

    const { color, width, height } = options

    if (/blue|green|red|yellow/.test(color)) {
    } else {
    }

    if (/^[1-9]\d*$/.test(width)) {
    } else {
    }

    if (/^[1-9]\d*$/.test(height)) {
    } else {
    }

    return true
  }

  /**
   * @param {Object} dataPoints - { key: intValue } can contain multiple data points in the same object.
   */
  createLineChart (dataPoints) {}

  /**
   * @param {Object} dataPoints - { key: intValue } can contain multiple data points in the same object.
   */
  createColumnChart (dataPoints) {}

  /**
   * @param {Object} dataPoints - { key: intValue } can contain multiple data points in the same object.
   */
  createPieChart (dataPoints) {}

  #insertGlobalOptionsInChart () {}

}

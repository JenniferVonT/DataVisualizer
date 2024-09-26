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
  #errorHandler

  constructor () {
    // Set a standard to use if no options are set.
    this.#globalOptions = {
      color: 'blue',
      width: '300',
      height: '200'
    }

    this.#errorHandler = new ErrorHandler()
  }

  /**
   * Sets the global options used when creating charts.
   * Width and heigth are measured in pixels.
   *
   * @param {Object} options - { color: 'blue/green/red/yellow', width: '123', height: '123' }
   */
  setGlobalOptions (options) {
    try {
      if (this.#isOptionsCorrect(options)) {
        this.#globalOptions = options
      }
    } catch (error) {
      this.#errorHandler.consoleError(error)
    }
  }

  #isOptionsCorrect (options) {
    const { color, width, height } = options

    if (!/blue|green|red|yellow/.test(color)) {
      throw this.#errorHandler.createErrorObject('#isOptionsCorrect: That color theme does not exist, choose: blue, green, red or yellow', 400)
    }

    if (typeof width !== 'string' || !/^[1-9]\d*$/.test(width)) {
      throw this.#errorHandler.createErrorObject('#isOptionsCorrect: The width is not correctly formatted or missing, please provide a string with integers not starting with 0', 400)
    }

    if (typeof height !== 'string' || !/^[1-9]\d*$/.test(height)) {
      throw this.#errorHandler.createErrorObject('#isOptionsCorrect: The height is not correctly formatted or missing, please provide a string with integers not starting with 0', 400)
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

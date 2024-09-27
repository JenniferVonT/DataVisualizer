/**
 * A module that sets the parent class for the creation of charts.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module src/chartModules/chart.js
 * @version 1.0.0
 */

import { ErrorHandler } from '../errorHandler.js'

export class Chart {
  _errorHandler
  _dataPoints
  _globalOptions
  _dataPointLimit

  constructor (globalOptions, dataPoints) {

    this._errorHandler = new ErrorHandler()
    this._dataPoints = {}
    this._globalOptions = {}
    this._dataPointLimit = 6

    this.#saveDataPoints(dataPoints)
    this.#saveGlobalOptions(globalOptions)
  }

  #saveDataPoints (dataPoints) {
    try {
      if (this.#isDataPointsValid(dataPoints)) {
        this._dataPoints = dataPoints
      }
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  #isDataPointsValid (dataPoints) {
    if (typeof dataPoints !== 'object' || dataPoints === null) {
      return false
    }

    for (const [key, dataPoint] of Object.entries(dataPoints)) {
      if (typeof dataPoint !== 'number') {
        throw this._errorHandler.createErrorObject('One or more datapoint value(s) is not the correct type, it should be a number.', 400)
      }
    }

    return true
  }

  #saveGlobalOptions (options) {
    if(this.#isOptionsValid(options))  {
      this._globalOptions = options
    }
  }

  #isOptionsValid (options) {
    const validOptions = ['color', 'width', 'height']

    if (typeof options !== 'object' || options === null) {
      return false
    }

    for (const [option, value] of Object.entries(options)) {
      if (!validOptions.includes(option)) {
        return false
      }
    }

    return true
  }

  /**
   * @param {String} color
   */
  setColorTheme (color) {
    try {
      if (this.#isColorValidType(color)) {
        this._globalOptions.color = color
      }
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  #isColorValidType (color) {
    if (typeof color === 'string' && /blue|green|red|yellow/.test(color)) {
      return true
    } else {
      throw this._errorHandler.createErrorObject('setColorTheme: That color theme does not exist, choose: blue, green, red or yellow', 400)
    }
  }

  /**
   * @param {String} key 
   * @param {Number} value 
   */
  insertDataPoint (key, value) {}

  /**
   * @param {String} key 
   */
  removeDataPoint (key) {}

  /**
   * @param {Number} height - pixels.
   */
  changeHeightTo (height) {}

  /**
   * @param {Number} width - pixels.
   */
  changeWidthTo (width) {}

  clearEntireChart () {}

  /**
   * @returns {HTMLCanvasElement}
   */
  getCanvasElement () {}

  _getDataPoints () {}
  _buildChart () {}
}
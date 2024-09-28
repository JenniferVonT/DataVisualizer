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
  _canvasElement
  _colorThemes
  #maxHeightAndWidth
  #minHeightAndWidth

  constructor (globalOptions, dataPoints) {

    this._errorHandler = new ErrorHandler()
    this._dataPoints = {}
    this._globalOptions = {}
    this._dataPointLimit = 6
    this._canvasElement = document.createElement('canvas')
    this._colorThemes = {}

    this.#maxHeightAndWidth = 2000
    this.#minHeightAndWidth = 20

    this.#saveDataPoints(dataPoints)
    this.#saveGlobalOptions(globalOptions)
    this.#createColorThemes()
    this.#buildChart()
  }

  #buildChart() {
    try {
      this._insertWidthAndHeight()

      if (Object.keys(this._dataPoints).length !== 0) {
        this._drawChart()        
      }
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
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
    if (!dataPoints || typeof dataPoints !== 'object' || Object.keys(dataPoints).length === 0) {
      return false
    }

    for (const [key, dataPoint] of Object.entries(dataPoints)) {
      if (typeof dataPoint !== 'number') {
        throw this._errorHandler.createErrorObject('#isDataPointsValid: One or more datapoint value(s) is not the correct type, it should be a number.', 400)
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

        this.#updateChart()
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
  insertDataPoint (key, value) {
    try {
      if (!this.#isDataFull()) {
        if (this.#isDataPointsValid({ [key]: value }))
          this._dataPoints[key] = value

          this.#updateChart()
      }
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  /**
   * @param {String} key 
   * @param {Number} oldValue
   * @param {Number} newValue 
   */
  updateDataPoint (key, oldValue, newValue) {
    try {
      if (this.#isDataPointsValid({ [key]: newValue })) {
        if (this.#isDataPresent(key, oldValue)) {
          this._dataPoints[key] = newValue

          this.#updateChart()
        }
      }
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  #isDataFull () {
    if (Object.keys(this._dataPoints).length < this._dataPointLimit) {
      return false
    } else {
      return true
    }
  }

  #isDataPresent (key, value) {
    const dataPointKey = this._dataPoints[key]

    if (dataPointKey && dataPointKey === value) {
      return true
    }
    return false
  }

  /**
   * @param {String} key
   * @param {Number} value
   */
  deleteDataPoint (key, value) {
    try {
      if (this.#isDataPresent(key, value)) {
       delete this._dataPoints[key]

       this.#updateChart()
      }
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  /**
   * @param {Number} height - pixels.
   */
  setHeightTo (height) {
    if (this.#isHeightOrWidthValid(height)) {
      this._globalOptions.height = height

      this.#updateChart()
    }
  }

  /**
   * @param {Number} width - pixels.
   */
  setWidthTo (width) {
    if (this.#isHeightOrWidthValid(width)) {
      this._globalOptions.width = width

      this.#updateChart()
    }
  }

  #isHeightOrWidthValid (value) {
    if (typeof value === 'number' && value >= this.#minHeightAndWidth && value <= this.#maxHeightAndWidth) {
      return true
    }
    return false
  }

  clearChart () {
    this._dataPoints = {}

    this.#updateChart()
  }

  /**
   * @returns {HTMLCanvasElement}
   */
  getCanvasElement () {
    return this._canvasElement
  }

  /**
   * @returns {Object}
   */
  getDataPoints () {
    return this._dataPoints
  }

  _clearCanvasContext () {
    const canvasContext = this._canvasElement.getContext('2d')

    if (canvasContext) {
      canvasContext.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height)
    } else {
      throw this._errorHandler.createErrorObject('Unable to get the canvas element context ', 500)
    }
  }

  #updateChart() {
    try {
      this._clearCanvasContext()
      this.#buildChart()
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  _insertWidthAndHeight () {
    if (this._globalOptions.height) {
      this._canvasElement.height = this._globalOptions.height
    }

    if (this._globalOptions.width) {
      this._canvasElement.width = this._globalOptions.width
    }
  }

  #createColorThemes() {
    this._colorThemes = { 
      blue: {
        background: '#cddaff',
        lines: '#001a69',
        data: [ '#0035d8', '#0f4aff', '#3b6bff', '#537dff', '#6d91ff', '#8ca8ff' ]
      },
      green: {
        background: '#ddffdb',
        lines: '#033700',
        data: [ '#078500', '#0ab400', '#0ef400', '#37ff2b', '#6cff64', '#9dff97' ]
      },
      red: {
        background: '#ffeaed',
        lines: '#56000c',
        data: [ '#ad0019', '#e10020', '#ff0f31', '#ff4e68', '#ff7488', '#ffa5b2' ]
     },
      yellow: {
        background: '#fffff4',
        lines: '#464600',
        data: [ '#969600', '#cece00', '#ffff05', '#ffff34', '#ffff6f', '#ffffa3' ]
      }
    }
  }

  _getTheme () {
    return this._colorThemes[this._globalOptions.color]
  }

  _drawChart () { /* Overridden in sub classes */}
}
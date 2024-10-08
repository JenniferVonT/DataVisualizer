/**
 * Automatically tests all the chart classes.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module test/chart.test.js
 * @jest-environment jsdom
 * @version 1.0.0
 */

import { Chart } from '../src/chartModules/chart.js'
import { jest } from '@jest/globals'

const chart = new Chart()

const ERROR_MESSAGE_DATA_VALIDITY = 'One or more datapoint value(s) is not the correct type, it should be a number.'
const DATA_TEST_CASES = [
  { data: { cats: 235 }, expected: 'pass' },
  { data: { dogs: 150 }, expected: 'pass' },
  { data: { birds: 350 }, expected: 'pass' },
  { data: { 1234: '100' }, expected: ERROR_MESSAGE_DATA_VALIDITY },
  { data: { test: 'test' }, expected: ERROR_MESSAGE_DATA_VALIDITY }
]

const CORRECT_DATA_TEST_CASES = [
  { profit: 140 },
  { revenue: 234 },
  { taxes: 100 }
]

/*-----------Testing the setColorTheme method in the Chart class-----------*/
const setColorTheme = chart.setColorTheme.bind(chart)

const ERROR_MESSAGE_COLOR = 'That color is not valid, valid colors are: blue, green, red and yellow'
const SET_COLOR_TEST_CASES = [
  { color: 'blue', expected: 'pass' },
  { color: 'green', expected: 'pass' },
  { color: 'red', expected: 'pass' },
  { color: 'yellow', expected: 'pass' },
  { color: 'orange', expected: ERROR_MESSAGE_COLOR },
  { color: 'purple', expected: ERROR_MESSAGE_COLOR },
  { color: 1234, expected: ERROR_MESSAGE_COLOR }
]

describe('setColorTheme: ', () => {
  SET_COLOR_TEST_CASES.forEach(({ color, expected }, index) => {
    test(`Test case ${index + 1}: color = ${color}`, () => {
      const checkOnConsole = jest.spyOn(console, 'error').mockImplementation(() => {})

      setColorTheme(color)

      if (expected === 'pass') {
        expect(chart._globalOptions.color).toBe(color)
        expect(checkOnConsole).not.toHaveBeenCalled()
      } else {
        expect(chart._globalOptions.color).not.toBe(color)
        expect(checkOnConsole).toHaveBeenCalledWith(`MESSAGE: ${expected}, STATUS: 400`)
      }
    })
  })
})

/*-----------Testing the insertDataPoint method in the Chart class-----------*/
const insertDataPoint = chart.insertDataPoint.bind(chart)

describe('insertDataPoint: ', () => {
  DATA_TEST_CASES.forEach(({ data, expected }, index) => {
    test(`Test case ${index + 1}: data = ${Object.entries(data)[0]}`, () => {
      const checkOnConsole = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      const [key, value] = Object.entries(data)[0]

      insertDataPoint(key, value)
      const dataPoint = getDataPoints()

      if (expected === 'pass') {
        expect(dataPoint[key]).toBe(value)
        expect(checkOnConsole).not.toHaveBeenCalled()
      } else {
        expect(dataPoint[key]).not.toBe(value)
        expect(checkOnConsole).toHaveBeenCalledWith(`MESSAGE: ${expected}, STATUS: 400`)
      }
    })
  })
})

/*-----------Testing the updateDataPoint method in the Chart class-----------*/
const updateDataPoint = chart.updateDataPoint.bind(chart)

describe('updateDataPoint: ', () => {
  DATA_TEST_CASES.forEach(({ data, expected }, index) => {
    test(`Test case ${index + 1}: data = ${Object.entries(data)}`, () => {
      const checkOnConsole = jest.spyOn(console, 'error').mockImplementation(() => {})

      const [key, value] = Object.entries(data)[0]

      insertDataPoint(key, value)

      if (expected === 'pass') {
        updateDataPoint(key, value, 1)

        expect(chart.getDataPoints()[key]).toBe(1)
        expect(checkOnConsole).not.toHaveBeenCalled()
      } else {
        expect(chart.getDataPoints()[key]).not.toBe(value)
        expect(chart.getDataPoints()[key]).not.toBe(1)
        expect(checkOnConsole).toHaveBeenCalledWith(`MESSAGE: ${expected}, STATUS: 400`)
      }
    })
  })
})

/*-----------Testing the deleteDataPoint method in the Chart class-----------*/
const deleteDataPoint = chart.deleteDataPoint.bind(chart)

describe('deleteDataPoint: ', () => {
  DATA_TEST_CASES.forEach(({ data, expected }, index) => {
    test(`Test case ${index + 1}: data = ${data}`, () => {
       const checkOnConsole = jest.spyOn(console, 'error')

       const [key, value] = Object.entries(data)[0]

       insertDataPoint(key, value)
       deleteDataPoint(key, value)

       if (expected === 'pass') {
        expect(key in chart.getDataPoints()).toBe(false)
        expect(chart.getDataPoints()[key]).not.toBe(value)
        expect(checkOnConsole).not.toHaveBeenCalled()
      } else {
        expect(chart.getDataPoints()[key]).not.toBe(value)
        expect(checkOnConsole).toHaveBeenCalledWith(`MESSAGE: ${expected}, STATUS: 400`)
      }
    })
  })
})

/*-----------Testing the setHeightTo and setWidthTo methods in the Chart class-----------*/
const setHeightTo = chart.setHeightTo.bind(chart)
const setWidthTo = chart.setWidthTo.bind(chart)

const HEIGHT_WIDTH_TEST_CASES = [
  { input: 100, expected: 'pass' },
  { input: 350, expected: 'pass' },
  { input: 20, expected: 'pass' },
  { input: 2000, expected: 'pass' },
  { input: -234, expected: 'nothing' },
  { input: 2350, expected: 'nothing' }
]


describe('setHeightTo: ', () => { testHeightAndWidth('height') })
describe('setWidthTo: ', () => { testHeightAndWidth('width') })

function testHeightAndWidth (type) {
  HEIGHT_WIDTH_TEST_CASES.forEach(({ input, expected }, index) => {
    test(`Test case ${index + 1}: input = ${input}`, () => {

      if (type === 'height') {
        setHeightTo(input)

        if (expected === 'pass') {
          expect(chart._globalOptions.height).toBe(input)
        } else {
          expect(chart._globalOptions.height).not.toBe(input)
        }
      } else if (type === 'width') {
        setWidthTo(input)

        if (expected === 'pass') {
          expect(chart._globalOptions.width).toBe(input)
        } else {
          expect(chart._globalOptions.width).not.toBe(input)
        }
      }
    })
  })  
}

/*-----------Testing the clearChart method in the Chart class-----------*/
const clearChart = chart.clearChart.bind(chart)

describe('clearChart: ', () => {
  DATA_TEST_CASES.forEach(({ data, expected }, index) => {
    test(`Test case ${index + 1}: `, () => {

      if (expected === 'pass') {
        const [key, value] = Object.entries(data)[0]

        insertDataPoint(key, value)
      
        expect(chart.getDataPoints()).not.toEqual({})

        clearChart()

        expect(chart.getDataPoints()).toEqual({}) 
      } else {
        expect(chart.getDataPoints()).toEqual({})
      }
    })
  })
})

/*-----------Testing the getCanvasElement method in the Chart class-----------*/
const getCanvasElement = chart.getCanvasElement.bind(chart)

describe('getCanvasElement: ', () => {
  test(`Test case 1: `, () => {
    const canvasElement = getCanvasElement()

    expect(canvasElement).toBeInstanceOf(HTMLCanvasElement)
  })
})

/*-----------Testing the getDataPoints method in the Chart class-----------*/
const getDataPoints = chart.getDataPoints.bind(chart)

describe('getDataPoints: ', () => {
  CORRECT_DATA_TEST_CASES.forEach((data, index) => {
    test(`Test case ${index + 1}: `, () => {
      const [ key, value ] = Object.entries(data)[0]

        insertDataPoint(key, value)

        const dataPoints = getDataPoints()
        const expectedAmountOfDataPoints = index + 1

        expect(dataPoints).toBeInstanceOf(Object)
        expect(Object.keys(dataPoints).length).toBe(expectedAmountOfDataPoints)
    })
  })
})

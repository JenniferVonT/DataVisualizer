/**
 * Automatically tests all the chart classes.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module test/chart.test.js
 * @jest-environment jsdom
 * @version 1.0.0
 */

import { Chart } from '../src/chartModules/chart.js'
import { ColumnChart } from '../src/chartModules/columnChart.js'
import { LineChart } from '../src/chartModules/lineChart.js'
import { PieChart } from '../src/chartModules/pieChart.js'
import { jest } from '@jest/globals'

const chart = new Chart()

const ERROR_MESSAGE_DATA_VALIDITY = '#isDataPointsValid: One or more datapoint value(s) is not the correct type, it should be a number.'
const DATA_TEST_CASES = [
  { data: { cats: 235 }, expected: 'pass' },
  { data: { dogs: 150 }, expected: 'pass' },
  { data: { birds: 350 }, expected: 'pass' },
  { data: { 1234: '100' }, expected: ERROR_MESSAGE_DATA_VALIDITY },
  { data: { test: 'test' }, expected: ERROR_MESSAGE_DATA_VALIDITY }
]

/*-----------Testing the setColorTheme method in the Chart class-----------*/
const setColorTheme = chart.setColorTheme.bind(chart)

const ERROR_MESSAGE_COLOR = '#isColorValidType: That color theme does not exist, choose: blue, green, red or yellow'
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
    test(`Test case ${index + 1}: data = ${Object.entries(data)}`, () => {
      const checkOnConsole = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      const [key, value] = Object.entries(data)[0]

      insertDataPoint(key, value)

      if (expected === 'pass') {
        expect(chart._dataPoints[key]).toBe(value)
        expect(checkOnConsole).not.toHaveBeenCalled()
      } else {
        expect(chart._dataPoints[key]).not.toBe(value)
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

        expect(chart._dataPoints[key]).toBe(1)
        expect(checkOnConsole).not.toHaveBeenCalled()
      } else {
        expect(chart._dataPoints[key]).not.toBe(value)
        expect(chart._dataPoints[key]).not.toBe(1)
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
        expect(key in chart._dataPoints).toBe(false)
        expect(chart._dataPoints[key]).not.toBe(value)
        expect(checkOnConsole).not.toHaveBeenCalled()
      } else {
        expect(chart._dataPoints[key]).not.toBe(value)
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
    if (expected === 'pass') {
      const [key, value] = Object.entries(data)[0]

      insertDataPoint(key, value)
    }
  })

  expect(chart._dataPoints).not.toEqual({})

  clearChart()

  expect(chart._dataPoints).toEqual({})
})
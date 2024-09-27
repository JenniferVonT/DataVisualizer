/**
 * Automatically tests all the chart classes.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module test/chart.test.js
 * @version 1.0.0
 */

import { Chart } from '../src/chartModules/chart.js'
import { ColumnChart } from '../src/chartModules/columnChart.js'
import { LineChart } from '../src/chartModules/lineChart.js'
import { PieChart } from '../src/chartModules/pieChart.js'
import { jest } from '@jest/globals'

const chart = new Chart()

/*-----------Testing the setColorTheme method in the Chart class-----------*/
const setColorTheme = chart.setColorTheme.bind(chart)

const ERROR_MESSAGE_COLOR = 'setColorTheme: That color theme does not exist, choose: blue, green, red or yellow'
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

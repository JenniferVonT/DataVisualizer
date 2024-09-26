/**
 * Automatically tests the main dataVisualizer class/module.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module test/dataVisualizer.test.js
 * @version 1.0.0
 */

import { DataVisualizer } from '../src/dataVisualizer.js'
import { jest } from '@jest/globals'

const dataVisualizer = new DataVisualizer()

const createColumnChart = dataVisualizer.createColumnChart.bind(dataVisualizer)
const createLineChart = dataVisualizer.createLineChart.bind(dataVisualizer)
const createPieChart = dataVisualizer.createPieChart.bind(dataVisualizer)


/*------------------Testing the setGlobalOptions method------------------*/
const setGlobalOptions = dataVisualizer.setGlobalOptions.bind(dataVisualizer)

const ERROR_MESSAGE_COLOR = '#isOptionsCorrect: That color theme does not exist, choose: blue, green, red or yellow'
const ERROR_MESSAGE_WIDTH = '#isOptionsCorrect: The width is not correctly formatted or missing, please provide a string with integers not starting with 0'
const ERROR_MESSAGE_HEIGHT = '#isOptionsCorrect: The height is not correctly formatted or missing, please provide a string with integers not starting with 0'

const OPTION_TEST_CASES = [
  { color: 'red', width: '500', height: '200', expected: undefined },
  { color: 'green', width: '1500', height: '1200', expected: undefined },
  { color: 'yellow', width: '400', height: '600', expected: undefined },
  { color: 'green', width: '000', height: '1200', expected: ERROR_MESSAGE_WIDTH },
  { color: 'orange', width: '250', height: '1000', expected: ERROR_MESSAGE_COLOR },
  { color: 'yellow', width: 234, height: '222', expected: ERROR_MESSAGE_WIDTH },
  { color: 'green', width: '234', height: 222, expected: ERROR_MESSAGE_HEIGHT },
  { color: 'blue', width: 'test', height: 'test', expected: ERROR_MESSAGE_WIDTH },
  { color: 2345, width: '100', height: '100', expected: ERROR_MESSAGE_COLOR },
  { color: 'red', width: '500', height: 'test', expected: ERROR_MESSAGE_HEIGHT },
  { color: 'green', width: 'test', height: '500', expected: ERROR_MESSAGE_WIDTH },
  { color: 'red', width: '500', expected: ERROR_MESSAGE_HEIGHT },
  { color: 'red', width: 'test', expected: ERROR_MESSAGE_WIDTH },
  { color: 'red', width: 100, expected: ERROR_MESSAGE_WIDTH },
  { color: 'color', width: '500', expected: ERROR_MESSAGE_COLOR },
  { color: 'red', height: '500', expected: ERROR_MESSAGE_WIDTH },
  { color: 'red', height: 'test', expected: ERROR_MESSAGE_WIDTH },
  { color: 'red', height: 100, expected: ERROR_MESSAGE_WIDTH },
  { color: 'color', height: '500', expected: ERROR_MESSAGE_COLOR },
  { width: '100', height: '100', expected: ERROR_MESSAGE_COLOR },
  { width: 'test', height: '100', expected: ERROR_MESSAGE_COLOR },
  { width: '100', height: 'test', expected: ERROR_MESSAGE_COLOR },
  { height: 'test', expected: ERROR_MESSAGE_COLOR },
  { height: '150', expected: ERROR_MESSAGE_COLOR },
  { width: '100', expected: ERROR_MESSAGE_COLOR },
  { width: 'test', expected: ERROR_MESSAGE_COLOR },
  { test: 'red', test: '100', test: '100', expected: ERROR_MESSAGE_COLOR },
  { expected: ERROR_MESSAGE_COLOR }
]

describe('setGlobalOptions: ', () => {
  OPTION_TEST_CASES.forEach((option, index) => {
    test(`Test case ${index + 1}: 
      color = ${option.color}, 
      width = ${option.width}, 
      height = ${option.height}, 
      expected = ${option.expected}`, 
      () => {
        const checkOnConsole = jest.spyOn(console, 'error').mockImplementation(() => {})

        if (option.expected !== undefined) {
          setGlobalOptions(option)
          expect(checkOnConsole).toHaveBeenCalledWith(`MESSAGE: ${option.expected}, STATUS: 400`)
        } else {
          setGlobalOptions(option)
          expect(checkOnConsole).not.toHaveBeenCalled()
        }
    })
  })
})
/**
 * Automatically tests the errorHandler class.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module test/errorHandler.test.js
 * @version 1.0.0
 */

import { ErrorHandler } from '../src/errorHandler.js'
import { jest } from '@jest/globals'

const errorHandler = new ErrorHandler()

/*------------------Testing the createErrorObject method------------------*/
const ERROR_CREATION_TEST_CASES = [
  { message: 'test error message', errorCode: 403 },
  { message: 12345, errorCode: '433' },
  { message: 'test error message', errorCode: '123' },
  { message: 'test error message', errorCode: 0o23 },
  {}
]

const createError = errorHandler.createErrorObject.bind(errorHandler)

describe('createErrorObject: ', () => {
  ERROR_CREATION_TEST_CASES.forEach(({ message, errorCode }, index) => {
    test(`Test case ${index + 1}: message = ${message}, errorCode = ${errorCode}`, () => {
      const errorObject = createError(message, errorCode)

      expect(errorObject).toBeInstanceOf(Error)
  
      // Expectations
      if (typeof message === 'string' && typeof errorCode === 'number') {
        expect(errorObject.message).toBe(message)
        expect(errorObject.status).toBe(errorCode)
      } else if (typeof message === 'string') {
        expect(errorObject.message).toBe(message)
        expect(errorObject.status).toBeUndefined()
      } else if (typeof errorCode === 'number') {
        expect(errorObject.message).toBeUndefined()
        expect(errorObject.status).toBe(errorCode)
      } else {
        expect(errorObject.message).toBeUndefined()
        expect(errorObject.status).toBeUndefined()
      }
    })
  })
})


/*---------------------Testing the consoleError method---------------------*/
const CONSOLE_ERROR_TEST_CASES = []

ERROR_CREATION_TEST_CASES.forEach(({ message, errorCode }) => CONSOLE_ERROR_TEST_CASES.push(createError(message, errorCode)))

const consoleError = errorHandler.consoleError.bind(errorHandler)

describe('consoleError: ', () => {
  CONSOLE_ERROR_TEST_CASES.forEach((errorObject, index) => {
    test(`Test case ${index + 1}: message = ${errorObject.message}, errorCode = ${errorObject.status}`, () => {
      const checkTheConsole = jest.spyOn(console, 'error')

      consoleError(errorObject)

      if (errorObject.message && errorObject.status) {
        expect(checkTheConsole).toHaveBeenCalledWith(`MESSAGE: ${errorObject.message}, STATUS: ${errorObject.status}`)
      } else if (errorObject.message) {
        expect(checkTheConsole).toHaveBeenCalledWith(`MESSAGE: ${errorObject.message}`)
      } else if (errorObject.status) {
        expect(checkTheConsole).toHaveBeenCalledWith(`STATUS: ${errorObject.status}`)
      } else {
        expect(checkTheConsole).toHaveBeenCalledWith('There was an undefined error')
      }
    })
  })
})

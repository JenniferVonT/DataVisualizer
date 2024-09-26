/**
 * Automatically tests the errorHandler class.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module test/errorHandler.test.js
 * @version 1.0.0
 */

import { ErrorHandler } from '../src/errorHandler.js'

const errorHandler = new ErrorHandler()
const createError = errorHandler.createErrorObject.bind(errorHandler)

const ERROR_CREATION_TEST_CASES = [
  { message: 'test error message', errorCode: 403 },
  { message: 12345, errorCode: '433' },
  { message: 'test error message', errorCode: '123' },
  { message: 'test error message', errorCode: 0o23 },
  {}
]

function testErrorObjectCreation (func, message, errorCode) {
  const errorObject = func(message, errorCode)
  return errorObject
}

describe('createErrorObject: ', () => {
  ERROR_CREATION_TEST_CASES.forEach(({ message, errorCode }, index) => {
    test(`Test case ${index + 1}: message = ${message}, errorCode = ${errorCode}`, () => {
      const errorObject = createError(message, errorCode)
  
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

/**
 * A module that handles errors.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module src/errorHandler.js
 * @version 1.0.0
 */

export class ErrorHandler {
  constructor () {}

  createErrorObject (message, errorCode) {
    const error = new Error()

    if (message && typeof message === 'string') {
      error.message = message
    } else {
      error.message = undefined
    }
    
    if (errorCode && typeof errorCode === 'number') {
      error.status = errorCode
    }

    return error
  }
}
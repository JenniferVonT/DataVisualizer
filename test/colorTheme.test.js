/**
 * Automatically tests the color theme class.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module test/colorTheme.test.js
 * @jest-environment jsdom
 * @version 1.0.0
 */

import { ColorTheme } from '../src/colorTheme'

const colorTheme = new ColorTheme()

const COLOR_OPTIONS = [
  { color: 'blue', hex: '#cddaff', lines: '#002184', data: '#8ca8ff', expected: 'pass' },
  { color: 'green', hex: '#ddffdb', lines: '#033700', data: '#078500', expected: 'pass' },
  { color: 'red', hex: '#ffeaed', lines: '#56000c', data: '#ad0019', expected: 'pass' },
  { color: 'yellow', hex: '#fffff4', lines: '#464600', data: '#969600', expected: 'pass' },
  { color: 'purple', hex: '#7900ff', lines: 'test', data: 'test', expected: 'fail' },
  { color: 'orange', hex: '#ff8000', lines: 'test', data: 'test', expected: 'fail' }
]

/* Test the setColorTheme method */
const setColorTheme = colorTheme.setColorTheme.bind(colorTheme)

describe('setColorTheme', () => {
  COLOR_OPTIONS.forEach(({ color, expected }, index) => {
    test(`Test case ${index + 1}: color = ${color}`, () => {
      if (expected === 'pass') {
        expect(() => setColorTheme(color)).not.toThrow()
      } else {
        expect(() => setColorTheme(color)).toThrow(Error)
      }
    })
  })
})

/* Test the getColorTheme method */
const getColorTheme = colorTheme.getColorTheme.bind(colorTheme)

describe('getColorTheme', () => {
  COLOR_OPTIONS.forEach(({ color, hex, lines, data, expected }, index) => {
    test(`Test case ${index + 1}: color = ${color}`, () => {
      try {
        setColorTheme(color)

        if (expected === 'pass') {
          expect(getColorTheme().background).toEqual(hex)
          expect(getColorTheme().lines).toEqual(lines)
          expect(getColorTheme().data[0]).toEqual(data)
        } else {
          expect(getColorTheme().background).not.toEqual(hex)
        }
      } catch (error) {
        if (expected === 'fail') {
          expect(error).toBeInstanceOf(Error)
          expect(error.message).toBe('That color is not valid')
          expect(getColorTheme().background).not.toEqual(hex)
        } else {
          throw error
        }
      }
    })
  })
})

/* Test the getCurrentBackgroundColor */
const getCurrentBackgroundColor = colorTheme.getCurrentBackgroundColor.bind(colorTheme)

describe('getCurrentBackgroundColor', () => {
  COLOR_OPTIONS.forEach(({ color, hex, expected }, index) => {
    test(`Test case ${index + 1}: color = ${color}`, () => {
      try {
        setColorTheme(color)

        if (expected === 'pass') {
          expect(getCurrentBackgroundColor()).toEqual(hex)
        } else {
          expect(getCurrentBackgroundColor()).not.toEqual(hex)
        }
      } catch (error) {
        if (expected === 'fail') {
          expect(error).toBeInstanceOf(Error)
          expect(error.message).toBe('That color is not valid')
          expect(getCurrentBackgroundColor()).not.toEqual(hex)
        } else {
          throw error
        }
      }      
    })
  })
})

/* Test the getCurrentLineColor */
const getCurrentLineColor = colorTheme.getCurrentLineColor.bind(colorTheme)

describe('getCurrentLineColor', () => {
  COLOR_OPTIONS.forEach(({ color, lines, expected }, index) => {
    test(`Test case ${index + 1}: color = ${color}`, () => {
      try {
        setColorTheme(color)

        if (expected === 'pass') {
          expect(getCurrentLineColor()).toEqual(lines)
        } else {
          expect(getCurrentLineColor()).not.toEqual(lines)
        }
      } catch (error) {
        if (expected === 'fail') {
          expect(error).toBeInstanceOf(Error)
          expect(error.message).toBe('That color is not valid')
          expect(getCurrentLineColor()).not.toEqual(lines)
        } else {
          throw error
        }
      }       
    })
  })
})


/* Test the getCurrentDataColors */
const getCurrentDataColors = colorTheme.getCurrentDataColors.bind(colorTheme)

describe('getCurrentDataColors', () => {
  COLOR_OPTIONS.forEach(({ color, data, expected }, index) => {
    test(`Test case ${index + 1}: color = ${color}`, () => {
      try {
        setColorTheme(color)

        if (expected === 'pass') {
          expect(getCurrentDataColors()[0]).toEqual(data)
        } else {
          expect(getCurrentDataColors()[0]).not.toEqual(data)
        }
      } catch (error) {
        if (expected === 'fail') {
          expect(error).toBeInstanceOf(Error)
          expect(error.message).toBe('That color is not valid')
          expect(() => getCurrentDataColors()[0]).not.toEqual(data)
        } else {
          throw error
        }
      }        
    })
  })
})
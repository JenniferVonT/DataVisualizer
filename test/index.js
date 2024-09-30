/**
 * Tests the package on the client/browser in a local server using vite.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @version 1.0.0
 */

import { DataVisualizer } from '../src/dataVisualizer'

const DATA_POINT_TEST_CASES = [ // from 1-10 data points.
  { profit: 190 },
  { profit: 130, revenue: 180 },
  { cats: 40, dogs: 55, birds: 10 },
  { kids: 25, teens: 45, adults: 75, elderly: 15 },
  { 1: 10, 2: 15, 3: 20, 4: 25, 5: 30 },
  { one: 5, two: 10, three: 15, four: 20, five: 40, six: 22 },
  { one: 5, two: 10, three: 15, four: 20, five: 40, six: 22, seven: 14 },
  { one: 5, two: 10, three: 15, four: 20, five: 40, six: 22, seven: 14, eight: 40 },
  { one: 5, two: 10, three: 15, four: 20, five: 40, six: 22, seven: 14, eight: 40, nine: 34 },
  { one: 5, two: 10, three: 15, four: 20, five: 40, six: 22, seven: 14, eight: 42, nine: 34, ten: 25 }
]

const dataVisualizerTest = new DataVisualizer()
const documentBody = document.querySelector('body')

// Create column charts for each test case.
DATA_POINT_TEST_CASES.forEach((testCase) => {
  const chartObj = dataVisualizerTest.createColumnChart(testCase)
  chartObj.setColorTheme('green')

  const canvasElement = chartObj.getCanvasElement()

  documentBody.append(canvasElement)
})

// Create line charts for each test case.
DATA_POINT_TEST_CASES.forEach((testCase) => {
  const lineObj = dataVisualizerTest.createLineChart(testCase)
  
  const lineCanvasElement = lineObj.getCanvasElement()
  
  documentBody.append(lineCanvasElement)
})

// Create pie charts for each test case.
DATA_POINT_TEST_CASES.forEach((testCase) => {
  const pieObj = dataVisualizerTest.createPieChart(testCase)
  
  const pieCanvasElement = pieObj.getCanvasElement()
  
  pieObj.setColorTheme('yellow')

  documentBody.append(pieCanvasElement)
})

const dataVisualizer = new DataVisualizer()

const options = {
  'color': 'red',
  'width': 400,
  'height': 600
}

dataVisualizer.setGlobalOptions(options)

const lineChart = dataVisualizer.createLineChart(DATA_POINT_TEST_CASES[5])
const columnChart = dataVisualizer.createColumnChart(DATA_POINT_TEST_CASES[5])
const pieChart = dataVisualizer.createPieChart(DATA_POINT_TEST_CASES[5])

lineChart.setColorTheme('green')
lineChart.insertDataPoint('seven', 25)
lineChart.updateDataPoint('one', 5, 20)
lineChart.deleteDataPoint('three', 15)
pieChart.setHeightTo(300)
columnChart.setHeightTo(500)
lineChart.setWidthTo(600)

columnChart.clearChart()

const dataPoints = lineChart.getDataPoints()

console.log(dataPoints)
console.log(columnChart.getCanvasElement())

documentBody.append(lineChart.getCanvasElement())
documentBody.append(columnChart.getCanvasElement())
documentBody.append(pieChart.getCanvasElement())
